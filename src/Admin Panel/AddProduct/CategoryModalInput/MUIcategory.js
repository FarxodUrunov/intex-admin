import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import "../ProductAdd.css";
import { useSelector } from "react-redux";

export default function SelectVariants({ className, name, onBlur, onChange, value }) {
   const state = useSelector((state) => state);
   const { isDirty, isEmpty, kotegoryError, onChangeIn, onBlurIn } = className;

   return (
      <div>
         <FormControl variant="standard" sx={{ minWidth: 250 }}>
            <InputLabel style={{ color: `${isDirty && (isEmpty || kotegoryError) ? "red" : ""}` }} id="select-label">
               категория
            </InputLabel>
            <Select
               labelId="select-label"
               id="selectId"
               className="SelectMUI"
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
               {state.data.map((item) => {
                  return (
                     <MenuItem key={item.id} value={item.id}>
                        {item.categoryname}
                     </MenuItem>
                  );
               })}
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
