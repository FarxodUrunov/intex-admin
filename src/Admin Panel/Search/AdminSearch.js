import React from "react";
import { useDispatch, useSelector } from "react-redux";

// Store
import { search_data } from "../../Store/action";

//styling
import "./AdminSearch.css";

const AdminSearch = () => {
   const dispatch = useDispatch();
   const state = useSelector((state) => state);

   const onValue = (e) => {
      dispatch(search_data(e.target.value));
   };

   return (
      <div className="a-search">
         <div className="wrap-search">
            <input onChange={(e) => onValue(e)} value={state.value} id="search-input" type="search" placeholder="Найти" />
            <span></span>
            <i id="search-icon" className="fa-solid fa-magnifying-glass"></i>
         </div>
      </div>
   );
};

export default AdminSearch;
