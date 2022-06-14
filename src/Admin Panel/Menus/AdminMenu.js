import React, { memo } from "react";
import { Link, useLocation } from "react-router-dom";

// styling
import "./AdminMenu.css";

const menu = [
   {
      href: "/",
      name: "Продукты",
   },
   {
      href: "/order",
      name: "Заказы",
   },
   {
      href: "/category",
      name: "Категории",
   },
   {
      href: "/web",
      name: "Сайт",
   },
];

const AdminMenu = () => {
   const location = useLocation();
   return (
      <div className="a-menu">
         <ul>
            {menu.map((menuItem, key) => (
               <Link to={menuItem.href} key={key} className="MenuLink">
                  <li>
                     <button className={`btn ${menuItem.href === location.pathname ? "actived" : ""}`} id="1">
                        {menuItem.name}
                     </button>
                  </li>
               </Link>
            ))}
         </ul>
      </div>
   );
};

export default memo(AdminMenu);
