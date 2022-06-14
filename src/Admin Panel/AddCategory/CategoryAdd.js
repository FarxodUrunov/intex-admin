import React, { useState } from "react";
import Modal from "react-modal";
import axios from "../../api/axios";
import { useDispatch } from "react-redux";
import { add_category_one } from "../../Store/action";
import { Navigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
// styling
import "./CategoryAdd.css";

const CATEGORY_URL = "/category/";

const CategoryAdd = () => {
   const dispatch = useDispatch();

   const [category, setCategory] = useState(false);

   const [name, setName] = useState("");
   const [nameUz, setNameUz] = useState("");
   const [nameRu, setNameRu] = useState("");

   const handleSubmit = async (e) => {
      e.preventDefault();
    //   console.log(e);
      const token = JSON.parse(window.localStorage.getItem("AuthToken")).access;
      const config = {
         headers: { Authorization: `Bearer ${token}` },
      };
      const tokenGet = JSON.parse(window.localStorage.getItem("AuthToken")).access;
      axiosInstance
		  .post(CATEGORY_URL,
			//   { c_name: name, name_uz: nameUz, name_ru: nameRu },
			  { categoryname: name, category_uz: nameUz, category_ru: nameRu },
			  config)
         .then(function (response) {
            // console.log(response);
			 dispatch(add_category_one(
				//  { id: response.data.id, c_name: name, name_uz: nameUz, name_ru: nameRu }
				 { id: response.data.id, categoryname: name, category_uz: nameUz, category_ru: nameRu }
			 
			 ));
            // <Navigate to="/category" />;
         })
         .catch(function (error) {
            // console.log(error);
         });

      setCategory(false);
   };
	
   return (
      <div className="c-add">
         <button onClick={() => setCategory(true)}>+ Добавить категории</button>
         <Modal
            className="Category_Modal"
            isOpen={category}
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
                  top: "20%",
                  left: "30%",
                  right: "29%",
                  bottom: "30%",
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
                //   alignItems: "center",
               },
            }}
         >
            <div className="Modal_navbar">
               <h2>Добавить категории</h2>
               <i className="fa-solid fa-close btn-closeIcon fa-3x " onClick={() => setCategory(false)}></i>
               <form onSubmit={handleSubmit} className="ModalForm">
                  <input type="text" placeholder="Category Name" onChange={(e) => setName(e.target.value)} />
                  <br />
                  <input type="text" placeholder="Category uz" onChange={(e) => setNameUz(e.target.value)} />
                  <input type="text" placeholder="Category ru" onChange={(e) => setNameRu(e.target.value)} />
                  <button className="CategoryBtn">Добавить</button>
               </form>
            </div>
         </Modal>
      </div>
   );
};

export default CategoryAdd;
