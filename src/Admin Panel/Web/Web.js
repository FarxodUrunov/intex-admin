import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { memo } from "react";

// Store
import { edit_web_data } from "../../Store/action";

// Component
import { ApiPatch } from "../../api/ApiData";

//styling
import "./Web.css";
import "./WebModal.css";
import WebModal1 from "../Modals/WebModal1";
import WebModal2 from "../Modals/WebModal2";

const Web = () => {
   const dispatch = useDispatch();
   const state = useSelector((state) => state);

   let { address_ru, address_uz, instagram, tel, telegram, time_ru, time_uz, id } = state.info;

   let infoText = [
      {
         text: "Телефонный номер",
         info: tel,
         link1: "Номер",
         tel,
      },
      {
         text: "Адрес",
         info: address_uz,
         info2: address_ru,
         link1: "uzb",
         link2: "ru",
         address_uz,
         address_ru,
      },
      {
         text: "Рабочее время",
         info: time_uz,
         info2: time_ru,
         link1: "uzb",
         link2: "ru",
         time_uz,
         time_ru,
      },
      {
         text: "Телеграм",
         info: telegram,
         link1: "Link",
         telegram,
      },
      {
         text: "Инстаграм",
         info: instagram,
         link1: "Link",
         instagram,
      },
   ];
   const [openModal, setOpenModal] = useState(false);
   const [openDualModal, setOpenDualModal] = useState(false);
   const [newInfo, setNewInfo] = useState("");
   const [newInfo2, setNewInfo2] = useState("");
   const [textInfo, setTextInfo] = useState("");
   const [linkName, setLinkName] = useState("");
   const [linkName2, setLinkName2] = useState("");

   const [dataText, setDataText] = useState("");

   const onSubmit = (info, info2, text, link1, link2, item) => {
      link2 ? setOpenDualModal(true) : setOpenModal(true);

      setNewInfo(info);
      setNewInfo2(info2);
      setTextInfo(text);
      setLinkName(link1);
      setLinkName2(link2);
      setDataText({ ...Object.keys(item).slice(-2) });
   };
   const onHandler = (e) => {
      setNewInfo(e.target.value);
   };

   const onHandlerRu = (e) => {
      setNewInfo2(e.target.value);
   };
   const onHandlerUz = (e) => {
      setNewInfo(e.target.value);
   };

   const onEditWeb = (id, newInfo, data1, newInfo2, data2) => {
      const WEB_URL = "/site/";
      const tokenGet = JSON.parse(window.localStorage.getItem("AuthToken")).access;
      setOpenModal(false);
      setOpenDualModal(false);

      ApiPatch(WEB_URL, id, tokenGet, dispatch, edit_web_data, newInfo, data1, newInfo2, data2);
   };

   return (
      <div className="WebContent">
         <div className="WebMainContent">
            <div className="containerWeb">
               <div className="main-content-web">
                  {infoText.map((item) => {
                     return (
                        <ul key={item.info} className="ul-body">
                           <li>{item.text}</li>
                           <li>{item.info}</li>
                           <li className="edit-icons">
                              <button id="edit-btn" onClick={() => onSubmit(item.info, item.info2, item.text, item.link1, item.link2, item)}>
                                 <i className="fa-solid fa-pencil"></i>
                              </button>
                           </li>
                        </ul>
                     );
                  })}
                  <WebModal1
                     openModal={openModal}
                     textInfo={textInfo}
                     setOpenModal={setOpenModal}
                     linkName={linkName}
                     onHandler={onHandler}
                     newInfo={newInfo}
                     onEditWeb={onEditWeb}
                     id={id}
                     dataText={dataText}
                  />
                  <WebModal2
                     openDualModal={openDualModal}
                     textInfo={textInfo}
                     setOpenDualModal={setOpenDualModal}
                     linkName2={linkName2}
                     onHandlerRu={onHandlerRu}
                     newInfo2={newInfo2}
                     linkName={linkName}
                     onHandlerUz={onHandlerUz}
                     newInfo={newInfo}
                     onEditWeb={onEditWeb}
                     id={id}
                     dataText={dataText}
                  />
               </div>
            </div>
         </div>
      </div>
   );
};

export default memo(Web);
