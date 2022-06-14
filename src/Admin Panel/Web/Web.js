import React, { useEffect, useState } from "react";
import Header from "../Header/AdminHeader";
import Menus from "../Menus/AdminMenu";
import Modal from "react-modal";
import axiosInstance from "../../api/axiosInstance";
//styling
import "./Web.css";
import "./WebModal.css";

import { useDispatch, useSelector } from "react-redux";
import { edit_web_data, web_data } from "../../Store/action";

const WEB_URL = "/site/";
const Web = () => {
   const [openModal, setOpenModal] = useState(false);
   const [setModal, setShowModal] = useState(false);
   const [newTime, setNewTime] = useState(false);
   const [telEgram, setTelEgram] = useState(false);
   const [insTagram, setInsTagram] = useState(false);

   const dispatch = useDispatch();
   const state = useSelector((state) => state);
   let { address_ru, address_uz, instagram, tel, telegram, time_ru, time_uz, id } = state.info;

   useEffect(() => {
      const tokenGet = JSON.parse(window.localStorage.getItem("AuthToken")).access;
      axiosInstance
         .get(WEB_URL, {
            headers: {
               Authorization: `Bearer ${tokenGet}`,
            },
         })
         .then((res) => {
            dispatch(web_data(res.data[0]));
         })
         .catch((error) => {
            console.error(error);
         });
   }, []);

   const [newTel, setNewTel] = useState(tel);
   const [newAdresRu, setNewAdresRu] = useState(address_ru);
   const [newAdresUz, setNewAdresUz] = useState("");
   const [newTimeRu, setNewTimeRu] = useState("");
   const [newTimeUz, setNewTimeUz] = useState("");
   const [newTelegram, setNewTelegram] = useState("");
   const [newInstagram, setNewInstagram] = useState("");

   const onSubmitTel = () => {
      setOpenModal(true);
      setNewTel(tel);
   };
   const onHandlerTel = (e) => {
      setNewTel(e.target.value);
   };
   const onSubmitAdres = () => {
      setShowModal(true);
      setNewAdresRu(address_ru);
      setNewAdresUz(address_uz);
   };
   const onHandlerAdresRu = (e) => {
      setNewAdresRu(e.target.value);
   };
   const onHandlerAdresUz = (e) => {
      setNewAdresUz(e.target.value);
   };
   const onSubmitTime = () => {
      setNewTime(true);
      setNewTimeRu(time_ru);
      setNewTimeUz(time_uz);
   };
   const onHamdlerTimeRu = (e) => {
      setNewTimeRu(e.target.value);
   };
   const onHamdlerTimeUz = (e) => {
      setNewTimeUz(e.target.value);
   };
   const onSubmitTelegram = () => {
      setTelEgram(true);
      setNewTelegram(telegram);
   };
   const onHandlerTelegram = (e) => {
      setNewTelegram(e.target.value);
   };
   const onSubmitInstagram = () => {
      setInsTagram(true);
      setNewInstagram(instagram);
   };
   const onHandlerInstagram = (e) => {
      setNewInstagram(e.target.value);
   };

   const onEditWeb = (id, tel, address_ru, address_uz, time_ru, time_uz, telegram, instagram) => {
      setOpenModal(false);
      setShowModal(false);
      setNewTime(false);
      setTelEgram(false);
      setInsTagram(false);
      const tokenGet = JSON.parse(window.localStorage.getItem("AuthToken")).access;

      let axios = require("axios");
      let data = JSON.stringify({ id, tel, address_ru, address_uz, time_ru, time_uz, telegram, instagram });

      let config = {
         method: "patch",
         url: "https://mamirovs.pythonanywhere.com/site/3/",
         headers: {
            Authorization: `Bearer ${tokenGet}`,
            "Content-Type": "application/json",
         },
         data: data,
      };

      axios(config)
         .then(function (response) {
            let { address_ru, address_uz, id, instagram, tel, telegram, time_ru, time_uz } = response.data;
            dispatch(edit_web_data({ address_ru, address_uz, id, instagram, tel, telegram, time_ru, time_uz }));
         })
         .catch(function (error) {
            console.log(error);
         });
   };

   return (
      <div className="wrapperWeb">
         <Header />
         <div className="WebContent">
            <div className="Webmenus">
               <Menus />
            </div>
            <div className="WebMainContent">
               <div className="containerWeb">
                  <div className="main-content-web">
                     <ul className="ul-body">
                        <li>Телефонный номер</li>
                        <li>{tel}</li>
                        <li className="edit-icons">
                           <button id="edit-btn" onClick={onSubmitTel}>
                              <i className="fa-solid fa-pencil"></i>
                           </button>
                        </li>
                     </ul>
                     <ul className="ul-body">
                        <li>Адрес</li>
                        <li>{address_uz}</li>
                        <li className="edit-icons">
                           <button id="edit-btn" onClick={onSubmitAdres}>
                              <i className="fa-solid fa-pencil"></i>
                           </button>
                        </li>
                     </ul>
                     <ul className="ul-body">
                        <li>Рабочее время</li>
                        <li>{time_uz}</li>
                        <li className="edit-icons">
                           <button id="edit-btn" onClick={onSubmitTime}>
                              <i className="fa-solid fa-pencil"></i>
                           </button>
                        </li>
                     </ul>
                     <ul className="ul-body">
                        <li>Телеграм</li>
                        <li>{telegram}</li>
                        <li className="edit-icons">
                           <button id="edit-btn" onClick={onSubmitTelegram}>
                              <i className="fa-solid fa-pencil"></i>
                           </button>
                        </li>
                     </ul>
                     <ul className="ul-body">
                        <li>Инстаграм</li>
                        <li>{instagram}</li>
                        <li className="edit-icons">
                           <button id="edit-btn" onClick={onSubmitInstagram}>
                              <i className="fa-solid fa-pencil"></i>
                           </button>
                        </li>
                     </ul>
                     <Modal
                        className="ModalWeb"
                        isOpen={openModal}
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
                              top: "28%",
                              left: "25%",
                              right: "25%",
                              bottom: "28%",
                              border: "1px solid #ccc",
                              background: "#fff",
                              overflow: "auto",
                              WebkitOverflowScrolling: "touch",
                              borderRadius: "25px",
                              outline: "none",
                              padding: "20px",
                              boxShadow: "-1px 6px 8px 0px rgba(34, 60, 80, 0.2)",
                           },
                        }}
                     >
                        <div className="Modal_navbar">
                           <h2 className="Modal_h1">Телефонный номер</h2>
                           <i className="fa-solid fa-close btn-closeIcon fa-3x " onClick={() => setOpenModal(false)}></i>
                        </div>
                        <div className="Modal_Content">
                           <form>
                              <p className="ModalP">Номер</p>
                              <input onChange={onHandlerTel} className="ModalInput" value={newTel} />
                              <button className="ModalBtn" onClick={() => onEditWeb(id, newTel, address_ru, address_uz, time_ru, time_uz, telegram, instagram)}>
                                 изменить
                              </button>
                           </form>
                        </div>
                     </Modal>
                     <Modal
                        className="ModalWeb2"
                        isOpen={setModal}
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
                              top: "30%",
                              left: "28%",
                              right: "28%",
                              bottom: "30%",
                              border: "1px solid #ccc",
                              background: "#fff",
                              overflow: "auto",
                              WebkitOverflowScrolling: "touch",
                              borderRadius: "25px",
                              outline: "none",
                              padding: "40px",
                              boxShadow: "-1px 6px 8px 0px rgba(34, 60, 80, 0.2)",
                           },
                        }}
                     >
                        <div className="Modal_navbar">
                           <h2 className="Modal_h1_2">Адрес</h2>

                           <i className="fa-solid fa-close btn-closeIcon fa-3x " onClick={() => setShowModal(false)}></i>
                           <form className="Modal_2_form">
                              <label className="ModalLabel2">
                                 <p className="ModalP1">rus</p>
                                 <input className="Modal_2Input" onChange={onHandlerAdresRu} value={newAdresRu} />
                              </label>
                              <label className="ModalLabel2">
                                 <p className="ModalP2">uzb</p>
                                 <input className="Modal_2Input" onChange={onHandlerAdresUz} value={newAdresUz} />
                              </label>
                           </form>
                           <button className="ModalBtn-2" onClick={() => onEditWeb(id, tel, newAdresRu, newAdresUz, time_ru, time_uz, telegram, instagram)}>
                              изменить
                           </button>
                        </div>
                     </Modal>
                     <Modal
                        className="ModalWeb3"
                        isOpen={newTime}
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
                              top: "25%",
                              left: "25%",
                              right: "25%",
                              bottom: "30%",
                              border: "1px solid #ccc",
                              background: "#fff",
                              overflow: "auto",
                              WebkitOverflowScrolling: "touch",
                              borderRadius: "25px",
                              outline: "none",
                              padding: "30px",
                              boxShadow: "-1px 6px 8px 0px rgba(34, 60, 80, 0.2)",
                           },
                        }}
                     >
                        <div className="Modal_navbar">
                           <h2 className="Modal_h1_3">Рабочее время</h2>

                           <i className="fa-solid fa-close btn-closeIcon fa-3x " onClick={() => setNewTime(false)}></i>
                           <form className="Modal_2_form">
                              <label className="ModalLabel2">
                                 <p className="ModalP1">uzb</p>
                                 <input className="Modal_2Input" onChange={onHamdlerTimeUz} value={newTimeUz} />
                              </label>
                              <label className="ModalLabel2">
                                 <p className="ModalP2">rus</p>
                                 <input className="Modal_2Input" onChange={onHamdlerTimeRu} value={newTimeRu} />
                              </label>
                           </form>

                           <button className="ModalBtn-2" onClick={() => onEditWeb(id, tel, address_ru, address_uz, newTimeRu, newTimeUz, telegram, instagram)}>
                              изменить
                           </button>
                        </div>
                     </Modal>
                     <Modal
                        className="ModalWeb3"
                        isOpen={telEgram}
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
                              top: "30%",
                              left: "25%",
                              right: "25%",
                              bottom: "30%",
                              border: "1px solid #ccc",
                              background: "#fff",
                              overflow: "auto",
                              WebkitOverflowScrolling: "touch",
                              borderRadius: "25px",
                              outline: "none",
                              padding: "30px",
                              boxShadow: "-1px 6px 8px 0px rgba(34, 60, 80, 0.2)",
                           },
                        }}
                     >
                        <div className="Modal_navbar">
                           <h2 className="Modal_h1_5">Телеграм</h2>
                           <i className="fa-solid fa-close btn-closeIcon fa-3x " onClick={() => setTelEgram(false)}></i>
                        </div>
                        <div className="Modal_Content">
                           <form>
                              <p className="ModalP">Номер</p>
                              <i className="fa-thin fa-code-simple"></i>
                              <input className="ModalInput" onChange={onHandlerTelegram} value={newTelegram} />
                           </form>
                           <button className="ModalBtn" onClick={() => onEditWeb(id, tel, address_ru, address_uz, time_ru, time_uz, newTelegram, instagram)}>
                              изменить
                           </button>
                        </div>
                     </Modal>
                     <Modal
                        className="ModalWeb3"
                        isOpen={insTagram}
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
                              top: "30%",
                              left: "25%",
                              right: "25%",
                              bottom: "30%",
                              border: "1px solid #ccc",
                              background: "#fff",
                              overflow: "auto",
                              WebkitOverflowScrolling: "touch",
                              borderRadius: "25px",
                              outline: "none",
                              padding: "20px",
                              boxShadow: "-1px 6px 8px 0px rgba(34, 60, 80, 0.2)",
                           },
                        }}
                     >
                        <div className="Modal_navbar">
                           <h2 className="Modal_h1_5">Инстаграм</h2>

                           <i className="fa-solid fa-close btn-closeIcon fa-3x " onClick={() => setInsTagram(false)}></i>
                        </div>
                        <div className="Modal_Content">
                           <form>
                              <p className="ModalP">Номер</p>
                              <i className="fa-thin fa-code-simple"></i>
                              <input className="ModalInput" onChange={onHandlerInstagram} value={newInstagram} />
                           </form>
                           <button className="ModalBtn" onClick={() => onEditWeb(id, tel, address_ru, address_uz, time_ru, time_uz, telegram, newInstagram)}>
                              изменить
                           </button>
                        </div>
                     </Modal>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Web;
