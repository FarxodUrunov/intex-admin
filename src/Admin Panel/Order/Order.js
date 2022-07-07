import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { memo } from "react";

// Componets
import AdminSearch from "../Search/AdminSearch";
import Zakaz from "./Zakaz";
import Konsultat from "./Konsultat";

// Store
import { search_data } from "../../Store/action";

// styling
import "./Order.css";

const arrBtn = [
   { name: "Заказы", id: 1 },
   { name: "Консультации", id: 2 },
];

const Order = () => {
   const dispatch = useDispatch();
   const state = useSelector((state) => state);

   const [btn, setBtn] = useState(1);

   const [activNumZ, setActivNumZ] = useState(0);
   const [noActivNumZ, setNoActivNumZ] = useState(0);
   const [activNumK, setActivNumK] = useState(0);
   const [noActivNumK, setNoActivNumK] = useState(0);

   useEffect(() => {
      let sumAcZ = 0,
         sumNoZ = 0,
         sumAcK = 0,
         sumNoK = 0;

      state.konsul?.forEach((element) => (element.active ? sumAcK++ : sumNoK++));
      state.zakaz?.forEach((element) => (element.active ? sumAcZ++ : sumNoZ++));

      setActivNumZ(sumAcZ);
      setNoActivNumZ(sumNoZ);
      setActivNumK(sumAcK);
      setNoActivNumK(sumNoK);
   }, [state]);

   const [isNum, setIsNum] = useState(true);
   const onZakKon = (id) => {
      dispatch(search_data(""));
      setBtn(id);

      id === 2 ? setIsNum(false) : setIsNum(true);
   };

   return (
      <div className="OrderContent">
         <div className="OrderMainContent">
            <div className="containerOrder">
               <div className="search__btn">
                  <div className="search-bar">
                     <AdminSearch />
                  </div>
                  <div className="btn__active">
                     <button className="btn__1">
                        Делает
                        <span className="spn__1">{isNum ? activNumZ : activNumK}</span>
                     </button>

                     <button className="btn__2">
                        Делать
                        <span className="spn__2">{isNum ? noActivNumZ : noActivNumK}</span>
                     </button>
                  </div>
               </div>
               <div className="main-content">
                  <div className="head-title">
                     {arrBtn.map((item) => {
                        return (
                           <span key={item.id}>
                              <button onClick={() => onZakKon(item.id)} className={item.id === btn ? "activet" : ""}>
                                 {item.name}
                              </button>
                           </span>
                        );
                     })}
                  </div>
                  {btn === 1 ? <Zakaz /> : <Konsultat />}
               </div>
            </div>
         </div>
      </div>
   );
};

export default memo(Order);
