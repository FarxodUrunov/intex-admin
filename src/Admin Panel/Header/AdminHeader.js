import React from "react";
import { Link } from "react-router-dom";

// styling
import "./AdminHeader.css";

const AdminHeader = () => {
   return (
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
               <Link to="/intex" className="linktoWeb">
                  Просмотр веб-сайта
               </Link>
               <span></span>
               <i className="fa-solid fa-user"></i>
               <p>admin</p>
            </div>
         </div>
      </header>
   );
};

export default AdminHeader;
