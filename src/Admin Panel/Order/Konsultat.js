import moment from "moment";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// Function
import { ApiDelet, ApiPatch } from "../../api/ApiData";

// Store
import { konsul_data_delet, konsul_data_patch } from "../../Store/action";

// Component
import ModalYesNo from "../Modals/ModalYesNo";

// Style
import "./Order.css";

const Konsultat = () => {
   const KONSUL_URL = "/konsultatsia/";
   const token = JSON.parse(window.localStorage.getItem("AuthToken")).access;

   const state = useSelector((state) => state);
   const dispatch = useDispatch();

   const [isChekedKonsul, setIsChekedKonsul] = useState("");
   const [deleteKonsul, setDeleteKonsul] = useState(false);
   const [checkedKonsul, setCheckedKonsul] = useState(false);
   const [orederId, setOrederId] = useState(0);
   const [konsulId, setKonsulId] = useState(0);

   const modalOpen = (id) => {
      setDeleteKonsul(true);
      setOrederId(id);
   };
   const chekedOpen = (ac, id) => {
      setCheckedKonsul(true);
      setKonsulId(id);
      setIsChekedKonsul(ac);
   };

   const onDelet = () => {
      setDeleteKonsul(false);
      ApiDelet(KONSUL_URL, orederId, token, dispatch, konsul_data_delet);
   };

   const onCheked = () => {
      setCheckedKonsul(false);
      ApiPatch(KONSUL_URL, konsulId, token, dispatch, konsul_data_patch, (!isChekedKonsul), "active");
   };

   return (
      <div className="main-content-konsul">
         <ul className="ul-head">
            <li>Имя клиента</li>
            <li>Телефон клиента</li>
            <li>Время</li>
            <li>Действия</li>
         </ul>
         {state.konsul?.map((item) => {
            if (state.value) {
               if (state.value === item.name.toLowerCase()) {
                  return (
                     <ul key={item.id} className="ul-body">
                        <li>{item.name}</li>
                        <li>{item.phone}</li>
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
         <ModalYesNo isOpen={deleteKonsul} onClickYes={onDelet} onClickNo={setDeleteKonsul} text={"Are you sure delete item"} />
         <ModalYesNo isOpen={checkedKonsul} onClickYes={onCheked} onClickNo={setCheckedKonsul} text={"Вы уверены, что хотите отключить активацию ?"} />
      </div>
   );
};

export default Konsultat;
