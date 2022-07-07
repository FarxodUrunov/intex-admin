import React, { useEffect, useState } from "react";

const useValidation = (value, validations) => {
   const [isEmpty, setEmpty] = useState(true);
   const [kotegoryError, setKotegoryError] = useState(false);
   const [textError, setTextError] = useState(false);
   const [numberError, setNumberError] = useState(false);
   const [inputValid, setInputValid] = useState(false);
   //    const re = /^[0-9]$/i;
   // re.test('ff')
   //    console.log(re.test(5));
   useEffect(() => {
      for (let validation in validations) {
         switch (validation) {
            case "isKotegory":
               value.length < validations[validation] ? setKotegoryError(true) : setKotegoryError(false);
               break;
            case "isEmpty":
               value ? setEmpty(false) : setEmpty(true);
               break;
            case "isNumber":
               const re = /^[0-9]+$/i;
               re.test(+value) ? setNumberError(false) : setNumberError(true);
               break;
            case "isText":
               const reText = /^[а-яА-Яa-zA-Z]/i;
               reText.test(String(value).toLowerCase()) ? setTextError(false) : setTextError(true);
               break;
         }
      }
   }, [value]);

   useEffect(() => {
      if (isEmpty || textError || kotegoryError || numberError) {
         setInputValid(false);
      } else {
         setInputValid(true);
      }
   }, [isEmpty, textError, kotegoryError, numberError]);

   return {
      isEmpty,
      kotegoryError,
      numberError,
      textError,
      inputValid,
   };
};

export const useInput = (initialValue, validations) => {
   const [value, setValue] = useState(initialValue);
   const [isDirty, setDirty] = useState(false);

   const valid = useValidation(value, validations);

   const onChangeIn = (e) => {
      setValue(e.target.value);
   };

   const onBlurIn = (e) => {
      setDirty(true);
   };

   return {
      value,
      onChangeIn,
      onBlurIn,
      isDirty,
      ...valid,
   };
};
