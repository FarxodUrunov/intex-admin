import * as React from "react";
import { styled } from "@mui/material/styles";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import InputBase from "@mui/material/InputBase";

const BootstrapInput = styled(InputBase)(({ theme }) => ({
   "label + &": {
      marginTop: theme.spacing(0),
   },
   "& .MuiInputBase-input": {
      position: "relative",
      backgroundColor: theme.palette.background.paper,
      borderBottom: "1px solid #ced4da",
      fontSize: 16,
      padding: "10px 26px 10px 12px",
      transition: theme.transitions.create(["border-color", "box-shadow"]),
      // Use the system font instead of the default Roboto font.
      fontFamily: [
         "-apple-system",
         "BlinkMacSystemFont",
         '"Segoe UI"',
         "Roboto",
         '"Helvetica Neue"',
         "Arial",
         "sans-serif",
         '"Apple Color Emoji"',
         '"Segoe UI Emoji"',
         '"Segoe UI Symbol"',
      ].join(","),
      "&:focus": {
         borderBottom: "2px solid rgba(0,123,255,.25)",
      },
      "&:hover": {
         //  borderBottom: "2px solid black",
      },
   },
}));

export default function RamkaNaUz({ className, name, onBlur, onChange, value }) {
   const { isDirty, isEmpty, textError, onChangeIn, onBlurIn } = className;
   return (
      <div>
         <FormControl sx={{ m: 1 }} variant="outlined">
            <InputLabel style={{ color: `${isDirty && (isEmpty || textError) ? "red" : ""}` }} htmlFor="demo-customized-textbox">
               Рамка на Уз{" "}
            </InputLabel>
            <BootstrapInput
               style={{ borderBottom: `${isDirty && (isEmpty || textError) ? "1px solid red" : ""}` }}
               id="demo-customized-textbox"
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
            />
            {isDirty && (isEmpty || textError) ? (
               <p style={{ color: "red", fontSize: "12px", textAlign: "left", margin: "5px 0 0 15px" }}>Field must only contain letters</p>
            ) : (
               ""
            )}
         </FormControl>
      </div>
   );
}
