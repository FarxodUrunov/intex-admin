import React, { useEffect, useState } from "react";
import AdminSearch from "../Search/AdminSearch";
import Header from "../Header/AdminHeader";
import Menus from "../Menus/AdminMenu";
import moment from "moment";
import Modal from "react-modal";
import axiosInstance from "../../api/axiosInstance";
// styling
import "./Order.css";
import axios from "../../api/axios";
import { konsul_data_delet, konsul_data_get, konsul_data_patch, zakaz_data_delet, zakaz_data_get, zakaz_data_patch } from "../../Store/action";
import { useDispatch, useSelector } from "react-redux";

const ZAKAZ_URL = "/zakaz/";
const KONSUL_URL = "/konsultatsia/";

const Order = () => {
   const dispatch = useDispatch();
   const state = useSelector((state) => state);
   // order
   const [deleteOrder, setDeleteOrder] = useState(false);
   const [checked, setChecked] = useState(false);
   // konsul
   const [deleteKonsul, setDeleteKonsul] = useState(false);
   const [checkedKonsul, setCheckedKonsul] = useState(false);

   const [orederId, setOrederId] = useState(0);
   const [konsulId, setKonsulId] = useState(0);

   const [isCheked, setIsCheked] = useState("");
   const [isChekedKonsul, setIsChekedKonsul] = useState("");

   const getData = (url, act) => {
      const tokenGet = JSON.parse(window.localStorage.getItem("AuthToken")).access;
      axiosInstance
         .get(url, {
            headers: {
               Authorization: `Bearer ${tokenGet}`,
            },
         })
         .then((res) => {
            dispatch(act(res.data));
         })
         .catch((error) => {
            console.error(error);
         });
   };
   const deleteData = (url, id, act) => {
      const tokenGet = JSON.parse(window.localStorage.getItem("AuthToken")).access;
      axios
         .delete(`${url}${id}`, {
            headers: {
               Authorization: `Bearer ${tokenGet}`,
            },
         })
         .then((res) => {
            // console.log(res);
            dispatch(act(orederId));
         })
         .catch((error) => {
            console.error(error);
         });
   };
   const patchData = (url, id, act, is) => {
      const token = JSON.parse(window.localStorage.getItem("AuthToken")).access;

      var axios = require("axios");
      var FormData = require("form-data");
      var data = new FormData();
      data.append("active", !is);

      let config = {
         method: "patch",
         url: `https://mamirovs.pythonanywhere.com${url}${id}/`,
         headers: {
            Authorization: `Bearer ${token}`,
         },
         data: data,
      };

      axios(config)
         .then(function (response) {
            // console.log(response);
            dispatch(act(response.data));
         })
         .catch(function (error) {
            console.log(error);
         });
   };

   useEffect(() => {
      getData(ZAKAZ_URL, zakaz_data_get);
      getData(KONSUL_URL, konsul_data_get);
   }, []);

   // order
   const onModalOpen = (id) => {
      setDeleteOrder(true);
      setOrederId(id);
   };
   const onChekedOpen = (ac, id) => {
      setChecked(true);
      setOrederId(id);
      setIsCheked(ac);
   };

   // konsul

   const onModalOpenKonsul = (id) => {
      setDeleteKonsul(true);
      setOrederId(id);
   };
   const onChekedOpenKonsul = (ac, id) => {
      setCheckedKonsul(true);
      setKonsulId(id);
      setIsChekedKonsul(ac);
   };

   const onDeletOrder = () => {
      setDeleteOrder(false);
      deleteData(ZAKAZ_URL, orederId, zakaz_data_delet);
   };
   const onDeletKonsul = () => {
      setDeleteKonsul(false);
      deleteData(KONSUL_URL, orederId, konsul_data_delet);
   };

   const onChekedPatch = () => {
      setChecked(false);
      patchData(ZAKAZ_URL, orederId, zakaz_data_patch, isCheked);
   };
   const onChekedKonsul = () => {
      setCheckedKonsul(false);
      patchData(KONSUL_URL, konsulId, konsul_data_patch, isChekedKonsul);
   };

   const [btn, setBtn] = useState(1);
   const arrBtn = [
      { name: "Заказы", id: 1 },
      { name: "Консультации", id: 2 },
   ];

   const [activNumZ, setActivNumZ] = useState(0);
   const [noActivNumZ, setNoActivNumZ] = useState(0);
   const [activNumK, setActivNumK] = useState(0);
   const [noActivNumK, setNoActivNumK] = useState(0);

   useEffect(() => {
      let sumAcZ = 0;
      let sumNoZ = 0;
      let sumAcK = 0;
      let sumNoK = 0;
      state.konsul?.forEach((element) => {
         if (element.active) {
            sumAcK++;
         } else {
            sumNoK++;
         }
      });
      state.zakaz?.forEach((element) => {
         if (element.active) {
            sumAcZ++;
         } else {
            sumNoZ++;
         }
      });
      setActivNumZ(sumAcZ);
      setNoActivNumZ(sumNoZ);
      setActivNumK(sumAcK);
      setNoActivNumK(sumNoK);
   }, [state]);

   const [isNum, setIsNum] = useState(true);
   const onZakKon = (id) => {
      setBtn(id);

      if (id === 2) {
         setIsNum(false);
      } else {
         setIsNum(true);
      }
   };
   return (
      <div className="wrapperOrder">
         <Header />
         <div className="OrderContent">
            <div className="Ordermenus">
               <Menus />
            </div>
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
                     {btn === 1 ? (
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
                              return (
                                 <ul key={item.id} className="ul-body">
                                    <li>{item.name}</li>
                                    <li>{item.phone}</li>
                                    <li>
                                       <img src={item.image || "image/basseyn.png"} width="70px" height="50px" alt="img" />
                                    </li>
                                    <li>{item.pool_frame || "3,5/76"}</li>
                                    <li>{item.money || "1 520 000"}</li>
                                    <li>{item.address}</li>
                                    <li>{moment(item.date).format("LLL")}</li>
                                    <li className="action-icons">
                                       <button onClick={() => onChekedOpen(item.active, item.id)} id={item.active ? "activChek" : "check-btn"}>
                                          <i className="fa-solid fa-check"></i>
                                       </button>
                                       <button onClick={() => onModalOpen(item.id)} id="delete-btn">
                                          <i className="fa-regular fa-trash-can"></i>
                                       </button>
                                    </li>
                                 </ul>
                              );
                           })}
                           <Modal
                              className="Category_Modal"
                              isOpen={deleteOrder}
                              appElement={document.getElementById("root") || undefined}
                              style={{
                                 overlay: {
                                    position: "fixed",
                                    left: "0",
                                    top: "0",
                                    bottom: "0",
                                    right: "0",
                                    width: "100%",
                                    height: "100%",
                                    backgroundColor: " rgb(0,0,0,0.5)",
                                 },
                                 content: {
                                    position: "absolute",
                                    top: "40%",
                                    left: "30%",
                                    right: "30%",
                                    bottom: "40%",
                                    border: "1px solid #ccc",
                                    background: "#fff",
                                    overflow: "hidden",
                                    WebkitOverflowScrolling: "touch",
                                    borderRadius: "25px",
                                    outline: "none",
                                    padding: "20px",
                                    boxShadow: "-1px 6px 8px 0px rgba(34, 60, 80, 0.2)",
                                    display: "flex",
                                    justifyContent: "center",
                                    //  alignItems: "center",
                                 },
                              }}
                           >
                              <div className="Modal_navbar">
                                 <h2>Are you sure delete item</h2>
                                 <button id="yes_btn" onClick={() => onDeletOrder()}>
                                    Yes
                                 </button>
                                 <button id="no_btn" onClick={() => setDeleteOrder(false)}>
                                    No
                                 </button>
                              </div>
                           </Modal>
                           <Modal
                              className="Category_Modal"
                              isOpen={checked}
                              appElement={document.getElementById("root") || undefined}
                              style={{
                                 overlay: {
                                    position: "fixed",
                                    left: "0",
                                    top: "0",
                                    bottom: "0",
                                    right: "0",
                                    width: "100%",
                                    height: "100%",
                                    backgroundColor: " rgb(0,0,0,0.5)",
                                 },
                                 content: {
                                    position: "absolute",
                                    top: "40%",
                                    left: "30%",
                                    right: "30%",
                                    bottom: "40%",
                                    border: "1px solid #ccc",
                                    background: "#fff",
                                    overflow: "hidden",
                                    WebkitOverflowScrolling: "touch",
                                    borderRadius: "25px",
                                    outline: "none",
                                    padding: "20px",
                                    boxShadow: "-1px 6px 8px 0px rgba(34, 60, 80, 0.2)",
                                    display: "flex",
                                    justifyContent: "center",
                                    //  alignItems: "center",
                                 },
                              }}
                           >
                              <div className="Modal_navbar">
                                 <h2 className="h2">Вы уверены, что хотите отключить активацию ?</h2>
                                 <button id="yes_btn" onClick={() => onChekedPatch()}>
                                    Yes
                                 </button>
                                 <button id="no_btn" onClick={() => setChecked(false)}>
                                    No
                                 </button>
                              </div>
                           </Modal>
                        </div>
                     ) : (
                        <div className="main-content-konsul">
                           <ul className="ul-head">
                              <li>Имя клиента</li>
                              <li>Телефон клиента</li>
                              <li>Время</li>
                              <li>Действия</li>
                           </ul>
                           {state.konsul?.map((item) => {
                              return (
                                 <ul key={item.id} className="ul-body">
                                    <li>{item.name}</li>
                                    <li>{item.phone}</li>
                                    <li>{moment(item.date).format("LLL")}</li>
                                    <li className="action-icons">
                                       <button onClick={() => onChekedOpenKonsul(item.active, item.id)} id={item.active ? "activChek" : "check-btn"}>
                                          <i className="fa-solid fa-check"></i>
                                       </button>
                                       <button onClick={() => onModalOpenKonsul(item.id)} id="delete-btn">
                                          <i className="fa-regular fa-trash-can"></i>
                                       </button>
                                    </li>
                                 </ul>
                              );
                           })}
                           <Modal
                              className="Category_Modal"
                              isOpen={deleteKonsul}
                              appElement={document.getElementById("root") || undefined}
                              style={{
                                 overlay: {
                                    position: "fixed",
                                    left: "0",
                                    top: "0",
                                    bottom: "0",
                                    right: "0",
                                    width: "100%",
                                    height: "100%",
                                    backgroundColor: " rgb(0,0,0,0.5)",
                                 },
                                 content: {
                                    position: "absolute",
                                    top: "40%",
                                    left: "30%",
                                    right: "30%",
                                    bottom: "40%",
                                    border: "1px solid #ccc",
                                    background: "#fff",
                                    overflow: "hidden",
                                    WebkitOverflowScrolling: "touch",
                                    borderRadius: "25px",
                                    outline: "none",
                                    padding: "20px",
                                    boxShadow: "-1px 6px 8px 0px rgba(34, 60, 80, 0.2)",
                                    display: "flex",
                                    justifyContent: "center",
                                    //  alignItems: "center",
                                 },
                              }}
                           >
                              <div className="Modal_navbar">
                                 <h2>Are you sure delete item</h2>
                                 <button id="yes_btn" onClick={() => onDeletKonsul()}>
                                    Yes
                                 </button>
                                 <button id="no_btn" onClick={() => setDeleteKonsul(false)}>
                                    No
                                 </button>
                              </div>
                           </Modal>
                           <Modal
                              className="Category_Modal"
                              isOpen={checkedKonsul}
                              appElement={document.getElementById("root") || undefined}
                              style={{
                                 overlay: {
                                    position: "fixed",
                                    left: "0",
                                    top: "0",
                                    bottom: "0",
                                    right: "0",
                                    width: "100%",
                                    height: "100%",
                                    backgroundColor: " rgb(0,0,0,0.5)",
                                 },
                                 content: {
                                    position: "absolute",
                                    top: "40%",
                                    left: "30%",
                                    right: "30%",
                                    bottom: "40%",
                                    border: "1px solid #ccc",
                                    background: "#fff",
                                    overflow: "hidden",
                                    WebkitOverflowScrolling: "touch",
                                    borderRadius: "25px",
                                    outline: "none",
                                    padding: "20px",
                                    boxShadow: "-1px 6px 8px 0px rgba(34, 60, 80, 0.2)",
                                    display: "flex",
                                    justifyContent: "center",
                                    //  alignItems: "center",
                                 },
                              }}
                           >
                              <div className="Modal_navbar">
                                 <h2 className="h2">Вы уверены, что хотите отключить активацию ?</h2>
                                 <button id="yes_btn" onClick={() => onChekedKonsul()}>
                                    Yes
                                 </button>
                                 <button id="no_btn" onClick={() => setCheckedKonsul(false)}>
                                    No
                                 </button>
                              </div>
                           </Modal>
                        </div>
                     )}
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Order;
