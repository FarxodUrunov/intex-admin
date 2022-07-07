import React from "react";
import Modal from "react-modal";

const ModalCate = ({ isOpen, setEditModal, onHandlerN, categoryName, onHandlerU, categoryUz, onHandlerR, categoryRu, onEditCategory }) => {
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
               top: "25%",
               left: "20%",
               right: "20%",
               bottom: "25%",
               border: "1px solid #ccc",
               background: "#fff",
               overflow: "hidden",
               WebkitOverflowScrolling: "touch",
               borderRadius: "25px",
               outline: "none",
               padding: "50px",
               boxShadow: "-1px 6px 8px 0px rgba(34, 60, 80, 0.2)",
               display: "flex",
               justifyContent: "center",
               //  alignItems: "center",
            },
         }}
      >
         <div className="Modal_navbar">
            <h2>Изменить категории</h2>
            <i className="fa-solid fa-close btn-closeIcon fa-3x " onClick={() => setEditModal(false)}></i>
            <form className="ModalForm">
               <input onChange={onHandlerN} value={categoryName} type="text" placeholder="Category Name" />
               <br />
               <input onChange={onHandlerU} value={categoryUz} type="text" placeholder="Category uz" />
               <input onChange={onHandlerR} value={categoryRu} type="text" placeholder="Category ru" />
               <button onClick={onEditCategory} className="CategoryBtn">
                  Изменить
               </button>
            </form>
         </div>
      </Modal>
   );
};

export default ModalCate;
