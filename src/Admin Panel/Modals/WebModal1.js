import React from "react";
import Modal from "react-modal";

const WebModal1 = ({openModal,textInfo,setOpenModal,linkName,onHandler,newInfo,onEditWeb,id,dataText}) => {
   return (
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
            <h2 className="Modal_h1">{textInfo}</h2>
            <i className="fa-solid fa-close btn-closeIcon fa-3x " onClick={() => setOpenModal(false)}></i>
         </div>
         <div className="Modal_Content">
            <form>
               <p className="ModalP">{linkName}</p>
               <input onChange={onHandler} className="ModalInput" value={newInfo} />
               <button className="ModalBtn" onClick={() => onEditWeb(id, newInfo, dataText["1"])}>
                  изменить
               </button>
            </form>
         </div>
      </Modal>
   );
};

export default WebModal1;
