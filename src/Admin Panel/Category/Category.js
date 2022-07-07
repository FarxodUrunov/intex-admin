import React, { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

// Component
import CategoryBtn from "../AddCategory/CategoryAdd";
import ModalYesNo from "../Modals/ModalYesNo";

// Store
import { delete_category, edit_category } from "../../Store/action";

// Function
import { ApiDelet, ApiPut } from "../../api/ApiData";

// styling
import "./Category.css";
import ModalCate from "../Modals/ModalCate";

const CategoryPanel = () => {
   const CATEGORY_URL_DELETE = "/category/";

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
      setIdItem(0);

      const tokenGet = JSON.parse(window.localStorage.getItem("AuthToken")).access;
      ApiDelet(CATEGORY_URL_DELETE, idItem, tokenGet, dispatch, delete_category);
   };

   const onEditCategory = async () => {
      setEditModal(false);
      setIdItem(0);

      const tokenGet = JSON.parse(window.localStorage.getItem("AuthToken")).access;
      ApiPut(CATEGORY_URL_DELETE, idItem, tokenGet, dispatch, edit_category, { categoryname: categoryName, category_uz: categoryUz, category_ru: categoryRu });
   };

   return (
      <>
         <div className="CategoryContent">
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
                        <ModalYesNo isOpen={deleteModal} onClickYes={onDeletItem} onClickNo={setDeleteModal} text={"Are you sure delete item"} />
                        <ModalCate
                           isOpen={editModal}
                           setEditModal={setEditModal}
                           onHandlerN={onHandlerN}
                           categoryName={categoryName}
                           onHandlerU={onHandlerU}
                           categoryUz={categoryUz}
                           onHandlerR={onHandlerR}
                           categoryRu={categoryRu}
                           onEditCategory={onEditCategory}
                        />
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
};

export default memo(CategoryPanel);
