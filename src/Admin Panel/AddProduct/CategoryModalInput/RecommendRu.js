import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function RecommendRu({ className, name, onBlur, onChange, value }) {
	const { isDirty, isEmpty, kotegoryError, onChangeIn, onBlurIn } = className;
   return (
      <div>
         <FormControl variant="standard" sx={{ minWidth: 200, marginLeft: 5 }}>
            <InputLabel style={{ color: `${isDirty && (isEmpty || kotegoryError) ? "red" : ""}` }} id="select-label">
               РекомендоумРу{" "}
            </InputLabel>
            <Select
               labelId="select-label"
               id="select-label"
               style={{ borderBottom: `${isDirty && (isEmpty || kotegoryError) ? "1px solid red" : ""}` }}
               name={name}
               onBlur={(e) => {
                  onBlur();
                  onBlurIn(e);
               }}
               onChange={(e) => {
                  onChange(e);
                  onChangeIn(e);
               }}
               value={value}
            >
               <MenuItem value=""></MenuItem>
               <MenuItem value={"Рекомендеюм"}>Рекомендеюм </MenuItem>
               <MenuItem value={"Скидка"}>Скидка </MenuItem>
               <MenuItem value={"Нет в наличии "}>Нет в наличии </MenuItem>
               <MenuItem value={"Нет"}>Нет</MenuItem>
            </Select>
            {isDirty && (isEmpty || kotegoryError) ? (
               <p style={{ color: "red", fontSize: "12px", textAlign: "left", margin: "5px 0 0 15px" }}>Input is selected</p>
            ) : (
               ""
            )}
         </FormControl>
      </div>
   );
}
