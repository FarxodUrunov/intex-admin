import moment from "moment";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// Function
import { ApiDelet, ApiPatch } from "../../api/ApiData";

// Store
import { zakaz_data_delet, zakaz_data_patch } from "../../Store/action";

// Component
import ModalYesNo from "../Modals/ModalYesNo";

import "./Order.css";

const Zakaz = () => {
   const ZAKAZ_URL = "/zakaz/";
   const token = JSON.parse(window.localStorage.getItem("AuthToken")).access;

   const state = useSelector((state) => state);
   const dispatch = useDispatch();

   const [deleteOrder, setDeleteOrder] = useState(false);
   const [checked, setChecked] = useState(false);
   const [orederId, setOrederId] = useState(0);
   const [isCheked, setIsCheked] = useState("");

   const modalOpen = (id) => {
      setDeleteOrder(true);
      setOrederId(id);
   };
   const chekedOpen = (ac, id) => {
      setChecked(true);
      setOrederId(id);
      setIsCheked(ac);
   };

   const onDelet = () => {
      setDeleteOrder(false);
      ApiDelet(ZAKAZ_URL, orederId, token, dispatch, zakaz_data_delet);
   };
   const onCheked = () => {
      setChecked(false);
      ApiPatch(ZAKAZ_URL, orederId, token, dispatch, zakaz_data_patch, !isCheked, "active");
   };

   return (
      <div className="main-content-order">
         <ul className="ul-head">
            <li>Имя клиента</li>
            <li>Телефон</li>
            <li>Изображение</li>
            <li>
               Размер(м)/ <br /> Глубина(см)
            </li>
            <li>Цена(сум)</li>
            <li>Адрес</li>
            <li>Время</li>
            <li>Действия</li>
         </ul>
         {state.zakaz?.map((item) => {
            if (state.value) {
               if (state.value === item.name.toLowerCase()) {
                  return (
                     <ul key={item.id} className="ul-body">
                        <li>{item.name}</li>
                        <li>{item.phone}</li>
                        <li>
                           <img src={item.image || "img.png"} width="70px" height="50px" alt="img" />
                        </li>
                        <li>{item.pool_frame || "3,5/76"}</li>
                        <li>{item.money || "1 520 000"}</li>
                        <li>{item.address}</li>
                        <li>{moment(item.date).format("LLL")}</li>
                        <li className="action-icons">
                           <button onClick={() => chekedOpen(item.active, item.id)} id={item.active ? "activChek" : "check-btn"}>
                              <i className="fa-solid fa-check"></i>
                           </button>
                           <button onClick={() => modalOpen(item.id)} id="delete-btn">
                              <i className="fa-regular fa-trash-can"></i>
                           </button>
                        </li>
                     </ul>
                  );
               }
            } else {
               return (
                  <ul key={item.id} className="ul-body">
                     <li>{item.name}</li>
                     <li>{item.phone}</li>
                     <li>
                        <img src={item.image || "img.png"} width="70px" height="50px" alt="img" />
                     </li>
                     <li>{item.pool_frame || "3,5/76"}</li>
                     <li>{item.money || "1 520 000"}</li>
                     <li>{item.address}</li>
                     <li>{moment(item.date).format("LLL")}</li>
                     <li className="action-icons">
                        <button onClick={() => chekedOpen(item.active, item.id)} id={item.active ? "activChek" : "check-btn"}>
                           <i className="fa-solid fa-check"></i>
                        </button>
                        <button onClick={() => modalOpen(item.id)} id="delete-btn">
                           <i className="fa-regular fa-trash-can"></i>
                        </button>
                     </li>
                  </ul>
               );
            }
            return null;
         })}
         <ModalYesNo isOpen={deleteOrder} onClickYes={onDelet} onClickNo={setDeleteOrder} text={"Are you sure delete item"} />
         <ModalYesNo isOpen={checked} onClickYes={onCheked} onClickNo={setChecked} text={"Вы уверены, что хотите отключить активацию ?"} />
      </div>
   );
};

export default Zakaz;
