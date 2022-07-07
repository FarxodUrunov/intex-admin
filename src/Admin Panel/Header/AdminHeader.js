import { Backdrop } from "@mui/material";
import React, { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

// Function
import { ApiGet } from "../../api/ApiData";

// Store
import { add_category, konsul_data_get, product_data, web_data, zakaz_data_get } from "../../Store/action";

// styling
import "./AdminHeader.css";


const AdminHeader = () => {

   const CATEGORY_URL = "/category/";
   const PRODUCT_URL = "/product/";
   const ZAKAZ_URL = "/zakaz/";
   const KONSUL_URL = "/konsultatsia/";
   const WEB_URL = "/site/";

   const state = useSelector((state) => state);
   const [open, setOpen] = useState(true);
   const dispatch = useDispatch();

   useEffect(() => {
      const tokenGet = JSON.parse(window.localStorage.getItem("AuthToken")).access;
      ApiGet(PRODUCT_URL, tokenGet, dispatch, product_data);
      ApiGet(CATEGORY_URL, tokenGet, dispatch, add_category);
      ApiGet(ZAKAZ_URL, tokenGet, dispatch, zakaz_data_get);
      ApiGet(KONSUL_URL, tokenGet, dispatch, konsul_data_get);
      ApiGet(WEB_URL, tokenGet, dispatch, web_data);
      if (state.product.length > 0) {
         console.log("state");
         setOpen(false);
      }
   }, [state.product.length]);

   return (
      <>
         <header>
            <div className="a-header">
               <div className="logo">
                  <h1>
                     <Link to="/" className="linkName">
                        INTEX-MARKET.UZ
                     </Link>
                  </h1>
               </div>
               <div className="user">
                  <a href="http://u130730.test-handyhost.ru/" target="_blank" className="linktoWeb">
                     Просмотр веб-сайта
                  </a>
                  <span></span>
                  <i className="fa-solid fa-user"></i>
                  <p>admin</p>
               </div>
            </div>
         </header>
         <Backdrop
            sx={{
               color: "black",
               zIndex: (theme) => theme.zIndex.drawer + 1,
               backgroundImage: "url(Gif.gif)",
               backgroundRepeat: "no-repeat",
               backgroundPosition: "center",
               backgroundSize: "100%",
            }}
            open={open}
         >
            {/* <CircularProgress color="inherit" />*/}
         </Backdrop>
      </>
   );
};

export default memo(AdminHeader);
