import React from "react";
import Modal from "react-modal";

const ModalYesNo = ({ isOpen, onClickYes, onClickNo, text }) => {
   return (
      <Modal
         className="Category_Modal"
         isOpen={isOpen}
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
            <h2 className="h2">{text}</h2>
            <button id="yes_btn" onClick={() => onClickYes()}>
               Yes
            </button>
            <button id="no_btn" onClick={() => onClickNo(false)}>
               No
            </button>
         </div>
      </Modal>
   );
};

export default ModalYesNo;
