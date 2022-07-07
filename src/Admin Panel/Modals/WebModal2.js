import React from "react";
import Modal from "react-modal";

const WebModal2 = ({openDualModal,textInfo,setOpenDualModal,linkName2,onHandlerRu,newInfo2,linkName,onHandlerUz,newInfo,onEditWeb,id,dataText}) => {
   return (
      <Modal
         className="ModalWeb2"
         isOpen={openDualModal}
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
            <h2 className="Modal_h1_2">{textInfo}</h2>

            <i className="fa-solid fa-close btn-closeIcon fa-3x " onClick={() => setOpenDualModal(false)}></i>
            <form className="Modal_2_form">
               <label className="ModalLabel2">
                  <p className="ModalP1">{linkName2}</p>
                  <input className="Modal_2Input" onChange={onHandlerRu} value={newInfo2} />
               </label>
               <label className="ModalLabel2">
                  <p className="ModalP2">{linkName}</p>
                  <input className="Modal_2Input" onChange={onHandlerUz} value={newInfo} />
               </label>
            </form>
            <button className="ModalBtn-2" onClick={() => onEditWeb(id, newInfo, dataText["0"], newInfo2, dataText["1"])}>
               изменить
            </button>
         </div>
      </Modal>
   );
};

export default WebModal2;
