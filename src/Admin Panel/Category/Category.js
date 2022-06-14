import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import CategoryBtn from "../AddCategory/CategoryAdd";
import Header from "../Header/AdminHeader";
import Menus from "../Menus/AdminMenu";
import Modal from "react-modal";
import axiosInstance from "../../api/axiosInstance";
// styling
import "./Category.css";
import axios from "../../api/axios";
import { add_category, delete_category, edit_category } from "../../Store/action";

const CATEGORY_URL_DELETE = "/category/";
const CATEGORY_URL = "/category/";

const CategoryPanel = (props) => {
   // ******* ////

   useEffect(() => {
      const tokenGet = JSON.parse(window.localStorage.getItem("AuthToken")).access;
      axiosInstance
         .get(CATEGORY_URL, {
            headers: {
               Authorization: `Bearer ${tokenGet}`,
            },
         })
         .then((res) => {
            dispatch(add_category(res.data));
         })
         .catch((error) => {
             console.error(error);
         });
   }, []);

   // ********* ////

   const [deleteModal, setDeleteModal] = useState(false);
   const [editModal, setEditModal] = useState(false);
   const [idItem, setIdItem] = useState(0);
   const [categoryName, setCategoryName] = useState("");
   const [categoryUz, setCategoryUz] = useState("");
   const [categoryRu, setCategoryRu] = useState("");


   const dispatch = useDispatch();

   const state = useSelector((state) => state);


   const onSubmit = (id) => {
      setDeleteModal(true);
      setIdItem(id);
   };
   const onSubmitEdit = (id, uz, ru, name) => {
      setEditModal(true);
      setIdItem(id);
      setCategoryName(name);
      setCategoryUz(uz);
      setCategoryRu(ru);
   };
   const onHandlerN = (e) => {
      setCategoryName(e.target.value);
   };
   const onHandlerU = (e) => {
      setCategoryUz(e.target.value);
   };
   const onHandlerR = (e) => {
      setCategoryRu(e.target.value);
   };

   const onDeletItem = () => {
      setDeleteModal(false);
      const tokenGet = JSON.parse(window.localStorage.getItem("AuthToken")).access;
      axiosInstance
         .delete(`${CATEGORY_URL_DELETE}${idItem}`, {
            headers: {
               Authorization: `Bearer ${tokenGet}`,
            },
         })
         .then((res) => {
            dispatch(delete_category(idItem));
         })
         .catch((error) => {
            console.error(error);
         });
      setIdItem(0);
   };
   const onEditCategory = async () => {
      setEditModal(false);
      const tokenGet = JSON.parse(window.localStorage.getItem("AuthToken")).access;

      let config = {
         method: "put",
         url: `${CATEGORY_URL_DELETE}${idItem}/`,
         headers: {
            Authorization: `Bearer ${tokenGet}`,
            "Content-Type": "application/json",
         },
         data: JSON.stringify(
            { categoryname: categoryName, category_uz: categoryUz, category_ru: categoryRu }
         ),
      };

      axios(config)
         .then(function (response) {
            let { id, categoryname, category_uz, category_ru } = response.data;
            dispatch(
               edit_category(
                  { id, categoryname, category_uz, category_ru }
               )
            );
         })
         .catch(function (error) {
            console.log(error);
         });
      setIdItem(0);
   };

   return (
      <div className="wrapperCategory">
         <Header />
         <div className="CategoryContent">
            <div className="Categorymenus">
               <Menus />
            </div>
            <div className="CategoryMainContent">
               <div className="containerCategory">
                  <div className="btn-bar">
                     <CategoryBtn />
                  </div>
                  <div className="main-content">
                     <div className="main-content-category">
                        <ul className="ul-head">
                           <li>Название</li>
                           <li>На узбекском</li>
                           <li>Действия</li>
                        </ul>
                        {state.data.map((item, i) => {
                           return (
                              <ul key={item.id} className="ul-body">
                                 <li>{item.category_uz}</li>
                                 <li>{item.category_ru}</li>
                                 {/* <li>{item.name_uz}</li>
                                 <li>{item.name_ru}</li> */}
                                 <li className="edit-icons">
                                    <button onClick={() => onSubmitEdit(item.id, item.category_uz, item.category_ru, item.categoryname)} id="edit-btn">
                                       <i className="fa-solid fa-pencil"></i>
                                    </button>
                                    <button onClick={() => onSubmit(item.id)} id="delete-btn">
                                       <i className="fa-regular fa-trash-can"></i>
                                    </button>
                                 </li>
                              </ul>
                           );
                        })}
                        <Modal
                           className="Category_Modal"
                           isOpen={deleteModal}
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
                                 left: "30%",
                                 right: "30%",
                                 bottom: "50%",
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
                              <button id="yes_btn" onClick={() => onDeletItem()}>
                                 Yes
                              </button>
                              <button id="no_btn" onClick={() => setDeleteModal(false)}>
                                 No
                              </button>
                           </div>
                        </Modal>

                        <Modal
                           className="Category_Modal"
                           isOpen={editModal}
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
                                 {/* <input onChange={onHandlerN} value={c_name} type="text" placeholder="Category Name" /> */}
                                 <br />
                                 <input onChange={onHandlerU} value={categoryUz} type="text" placeholder="Category uz" />
                                 <input onChange={onHandlerR} value={categoryRu} type="text" placeholder="Category ru" />
                                 {/* <input onChange={onHandlerU} value={name_uz} type="text" placeholder="Category uz" />
                                 <input onChange={onHandlerR} value={name_uz} type="text" placeholder="Category ru" /> */}

                                 <button onClick={onEditCategory} className="CategoryBtn">
                                    Изменить
                                 </button>
                              </form>
                           </div>
                        </Modal>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default CategoryPanel;
