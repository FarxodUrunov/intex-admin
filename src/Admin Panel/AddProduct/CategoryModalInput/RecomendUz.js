import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function RecommendUz({ className, name, onBlur, onChange, value }) {
   const { isDirty, isEmpty, kotegoryError, onChangeIn, onBlurIn } = className;

   return (
      <div>
         <FormControl variant="standard" sx={{ minWidth: 200, marginLeft: 5 }}>
            <InputLabel style={{ color: `${isDirty && (isEmpty || kotegoryError) ? "red" : ""}` }} id="select-label">
               РекомендоумУз{" "}
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
               <MenuItem value={"Tavsiya qilamiz"}>Tavsiya qilamiz </MenuItem>
               <MenuItem value={"Chegirma"}>Chegirma </MenuItem>
               <MenuItem value={"Sotuvda emas"}>Sotuvda emas </MenuItem>
               <MenuItem value={"Yo'q"}>Yo'q</MenuItem>
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
