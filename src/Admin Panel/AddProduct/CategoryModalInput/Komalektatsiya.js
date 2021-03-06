import * as React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import "../../AddProduct/ProductAdd.css";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
   PaperProps: {
      style: {
         maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
         width: 250,
      },
   },
};

const names = ["Лестиниция ", "Тент ", "Подсытылка ", "Фильтр"];

const Komalektatsiya = (props) => {
   return (
      <div>
         <FormControl sx={{ m: 1, width: 800, marginTop: 7 }}>
            <InputLabel id="demo-multiple-checkbox-label">Комалекация на Ру </InputLabel>
            <Select
               labelId="demo-multiple-checkbox-label"
               id="demo-multiple-checkbox"
               input={<OutlinedInput label="Tag" />}
               renderValue={(selected) => {
                  return (
                     <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                        {selected.map((value) => (
                           <Chip key={value} label={value} />
                        ))}
                     </Box>
                  );
               }}
               MenuProps={MenuProps}
               {...props}
               multiple
            >
               {names.map((name) => (
                  <MenuItem key={name} value={name}>
                     <Checkbox checked={props.value.indexOf(name) > -1} />
                     <ListItemText primary={name} />
                  </MenuItem>
               ))}
            </Select>
         </FormControl>
      </div>
   );
};
export default Komalektatsiya;
