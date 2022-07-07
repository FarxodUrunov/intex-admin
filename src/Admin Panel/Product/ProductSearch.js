import React from "react";

const ProductSearch = ({item,onOpenModal,onSubmit}) => {
   return (
      <>
         <li>
            <img src={item.image ? item.image : "image/basseyn.png"} width="150px" height="70px" alt="img" />
         </li>
         <li>
            <p>
               <del>{item.old_price} </del> сум
            </p>
            <h4>{item.dis_price} сум</h4>
         </li>
         <li>{item.quantity}</li>
         <li>{item.ramka_ru}</li>

         <li>{item.razmer_m}</li>
         <li>{item.razmer_sm}</li>
         <li className="edit-icons">
            <button onClick={() => onOpenModal(item)} id="edit-btn">
               <i className="fa-solid fa-pencil"></i>
            </button>
            <button onClick={() => onSubmit(item.id)} id="delete-btn">
               <i className="fa-regular fa-trash-can"></i>
            </button>
         </li>
      </>
   );
};

export default ProductSearch;
