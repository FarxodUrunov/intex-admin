import { useSelector, useDispatch } from "react-redux";
import { memo, useState } from "react";
import Modal from "react-modal";
import { BiCategory } from "react-icons/bi";
import { Controller, useForm } from "react-hook-form";
import { ImListNumbered } from "react-icons/im";
import { AiOutlineDollarCircle } from "react-icons/ai";
import { FaExpandArrowsAlt } from "react-icons/fa";
import { GiResize } from "react-icons/gi";

// Component
import AdminSearch from "../Search/AdminSearch";
import ProductAdd from "../AddProduct/ProductAdd";
import Kolichstva from "../AddProduct/CategoryModalInput/Kolichstva";
import StartayaTsena from "../AddProduct/CategoryModalInput/StartayaTsena";
import RamkaNaRu from "../AddProduct/CategoryModalInput/RamakNaRu";
import Glubina from "../AddProduct/CategoryModalInput/Glubina";
import RecommendRu from "../AddProduct/CategoryModalInput/RecommendRu";
import RecommendUz from "../AddProduct/CategoryModalInput/RecomendUz";
import Komalektatsiya from "../AddProduct/CategoryModalInput/Komalektatsiya";
import KomalektatsiyaUz from "../AddProduct/CategoryModalInput/KomalekatsiyaUz";
import Razmer from "../AddProduct/CategoryModalInput/Razmer";
import SelectVariants from "../AddProduct/CategoryModalInput/MUIcategory";
import RamkaNaUz from "../AddProduct/CategoryModalInput/RamkaNaUz";
import TsenaSkidkoy from "../AddProduct/CategoryModalInput/TsenaSkidkoy";
import ModalYesNo from "../Modals/ModalYesNo";
import ProductSearch from "./ProductSearch";

// Store
import { product_data_delete, product_data_put } from "../../Store/action";

// Hooks
import { useInput } from "../../hooks/useInput";

// Function
import { ApiDelet } from "../../api/ApiData";

//styling
import "./Product.css";


const Product = () => {
   const PRODUCT_URL = "/product/";

   const state = useSelector((state) => state);

   const dispatch = useDispatch();
   const [deleteModal, setDeleteModal] = useState(false);
   const [idItem, setIdItem] = useState(0);

   const [idCategory, setIdCategory] = useState(6);

   const [productEdit, setProductEdit] = useState(false);
   const [eidtModalStateImg, setEditModalStateImg] = useState({});

   const onSubmit = (id) => {
      setDeleteModal(true);
      setIdItem(id);
   };

   const onDeletItem = () => {
      setDeleteModal(false);
      setIdItem(0);

      const tokenGet = JSON.parse(window.localStorage.getItem("AuthToken")).access;
      ApiDelet(PRODUCT_URL, idItem, tokenGet, dispatch, product_data_delete);
   };

   const onOpenModal = (data) => {
      setIdItem(data.id);
      let infoValue = state.product.filter((item) => item.id === data.id)[0];
      setProductEdit(true);
      setEditModalStateImg(infoValue.image);
      setValue("infoValue", {
         selectVariants: infoValue.category,
         Kolichstva: infoValue.quantity,
         RecommendRu: infoValue.recommendation_ru,
         RecommendUz: infoValue.recommendation_uz,
         glubina: infoValue.razmer_sm,
         StartayaTsena: infoValue.old_price,
         TsenaSkidkoy: infoValue.dis_price,
         RamkaNaUz: infoValue.ramka_uz,
         RamkaNaRu: infoValue.ramka_ru,
         Razmer: infoValue.razmer_m,
         Komalektatsiya: [infoValue.complekt_ru],
         KomalektatsiyaUz: [infoValue.complekt_uz],
      });
   };

   const {
      register,
      handleSubmit,
      setValue,
      control,
      formState: { errors },
   } = useForm({
      defaultValues: {
         selectVariants: "",
         RecommendUz: "",
         RecommendRu: "",
         glubina: "",
         Kolichstva: "",
         StartayaTsena: "",
         TsenaSkidkoy: "",
         RamkaNaUz: "",
         RamkaNaRu: "",
         Razmer: "",
         Komalektatsiya: [],
         KomalektatsiyaUz: [],
         images: null,
      },
   });

   const [fileImg, setFileImg] = useState("");
   const [baseImage, setBaseImage] = useState("");
   const [isImg, setIsImg] = useState(false);

   const uploadImage = async (e) => {
      setIsImg(true);
      const file = e.target.files[0];
      setFileImg(file);
      const base64 = await convertBase64(file);
      setBaseImage(base64);
   };
   const convertBase64 = (file) => {
      return new Promise((resolve, reject) => {
         const fileReader = new FileReader();
         fileReader.readAsDataURL(file);

         fileReader.onload = () => {
            resolve(fileReader.result);
         };

         fileReader.onerror = (error) => {
            reject(error);
         };
      });
   };

   const onModalExit = () => {
      setProductEdit(false);
      setIsImg(false);
   };

   const ModalClose = async (e) => {
      //   console.log("e", e);
      setProductEdit(false);
      setIsImg(false);

      const token = JSON.parse(window.localStorage.getItem("AuthToken")).access;

      let axios = require("axios");
      let FormData = require("form-data");
      let data = new FormData();

      data.append("category", e.infoValue.selectVariants);
      data.append("name", e.infoValue.name);
      data.append("dis_price", e.infoValue.TsenaSkidkoy);
      data.append("old_price", e.infoValue.StartayaTsena);
      data.append("quantity", e.infoValue.Kolichstva);
      data.append("ramka_ru", e.infoValue.RamkaNaRu);
      data.append("ramka_uz", e.infoValue.RamkaNaUz);
      data.append("razmer_m", e.infoValue.Razmer);
      data.append("razmer_sm", e.infoValue.glubina);
      data.append("recommendation_ru", e.infoValue.RecommendRu);
      data.append("recommendation_uz", e.infoValue.RecommendUz);
      data.append("complekt_uz", e.infoValue.KomalektatsiyaUz.toString());
      data.append("complekt_ru", e.infoValue.Komalektatsiya.toString());
      if (isImg) data.append("image", fileImg);

      let config = {
         method: "patch",
         url: `https://mamirovs.pythonanywhere.com${PRODUCT_URL}${idItem}/`,
         headers: {
            Authorization: `Bearer ${token}`,
         },
         data: data,
      };

      axios(config)
         .then(function (response) {
            // console.log(response.data);
            dispatch(product_data_put(response.data));
         })
         .catch(function (error) {
            console.log(error);
         });
   };

   const kolichestva = useInput("", { isEmpty: true, isNumber: true });
   const starayaSena = useInput("", { isEmpty: true, isNumber: true });
   const senaSkidkoy = useInput("", { isEmpty: true, isNumber: true });
   const razmer = useInput("", { isEmpty: true, isNumber: true });
   const glubina = useInput("", { isEmpty: true, isNumber: true });
   const ramkaNaUz = useInput("", { isEmpty: true, isText: true });
   const ramkaNaRu = useInput("", { isEmpty: true, isText: true });
   const kategory = useInput("", { isEmpty: true, isKotegory: true });
   const recommendRu = useInput("", { isEmpty: true, isKotegory: true });
   const recommendUz = useInput("", { isEmpty: true, isKotegory: true });

   return (
      <div className="ProductContent">
         <div className="ProductMainContent">
            <div className="containerProduct">
               <div className="search-and-btn">
                  <AdminSearch />
                  <ProductAdd />
               </div>
               <div className="main-content">
                  <div className="head-title">
                     {state.data.map((item, i) => {
                        return (
                           <span key={item.id}>
                              <button onClick={() => setIdCategory(item.id)} className={`click ${item.id === idCategory ? "active" : ""}`} id={item.id}>
                                 {item.categoryname}
                              </button>
                           </span>
                        );
                     })}
                  </div>
                  <div className="main-content-product">
                     <ul className="ul-head">
                        <li>Изображение</li>
                        <li>Цена(сум)</li>
                        <li>Количество</li>
                        <li>Рамка</li>
                        <li>Размер(м)</li>
                        <li>Глубина(см)</li>
                        <li>Действия</li>
                     </ul>

                     {state.product.map((item) => {
                        if (item.category === idCategory) {
                           if (state.value) {
                              if (
                                 state.value === item.razmer_m ||
                                 state.value === item.razmer_sm ||
                                 state.value === item.ramka_ru.toLowerCase() ||
                                 state.value === item.quantity
                              ) {
                                 return (
                                    <ul key={item.id} className="ul-body">
										 <ProductSearch
											 item={item}
											 onOpenModal={onOpenModal}
											 onSubmit={onSubmit}
									   />
                                    </ul>
                                 );
                              }
                           } else {
                              return (
                                 <ul key={item.id} className="ul-body">
                                    <ProductSearch
											 item={item}
											 onOpenModal={onOpenModal}
											 onSubmit={onSubmit}
									   />
                                 </ul>
                              );
                           }
						}
						 return null;
                     })}
                     <ModalYesNo isOpen={deleteModal} onClickYes={onDeletItem} onClickNo={setDeleteModal} text={"Are you sure delete item"} />
                     <Modal
                        className="ProductAdd"
                        isOpen={productEdit}
                        appElement={document.getElementById("root") || undefined}
                        style={{
                           overlay: {
                              //   position: 'fixed',
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
                              top: "5%",
                              left: "20%",
                              right: "20%",
                              bottom: "5%",
                              border: "1px solid #ccc",
                              background: "#fff",
                              overflow: "auto",
                              WebkitOverflowScrolling: "touch",
                              borderRadius: "20px",
                              outline: "none",
                              padding: "20px",
                              boxShadow: "-1px 6px 8px 0px rgba(34, 60, 80, 0.2)",
                           },
                        }}
                     >
                        <div className="Modal_navbar">
                           <h2 className="ModalProduct">Добавить Категория </h2>
                           <i className="fa-solid fa-close btn-closeIcon fa-3x " onClick={onModalExit}></i>
                           <form onSubmit={handleSubmit(ModalClose)}>
                              <section className="ProductAddSection">
                                 <label className="Label_Product">
                                    <p className="Pruduct_Add_P">+Add image</p>
                                    <br />
                                    <input
                                       type="file"
                                       //    name="images"
                                       onChange={uploadImage}
                                       accept="image/png, image/jpeg. image/webp"
                                       className="ProductAddInput"
                                    />
                                    <div className="images">
                                       <img src={isImg ? baseImage : eidtModalStateImg} alt='img' width="200px" className="Product_Img" />
                                    </div>
                                 </label>
                              </section>

                              <div className="inputWrapper">
                                 <div className="boxInput">
                                    <BiCategory size="35" className="iconInput" />
                                    <Controller
                                       name="selectVariants"
                                       control={control}
                                       {...register("infoValue.selectVariants", { required: true })}
                                       rules={{ required: true }}
                                       render={({ field }) => <SelectVariants className={kategory} {...field} />}
                                    />
                                 </div>

                                 <div className="boxInput">
                                    <ImListNumbered size="32" className="iconInput" />
                                    <Controller
                                       name="Kolichstva"
                                       {...register("infoValue.Kolichstva", { required: true })}
                                       control={control}
                                       render={({ field }) => <Kolichstva className={kolichestva} {...field} />}
                                    />
                                 </div>

                                 <div className="boxInput">
                                    <AiOutlineDollarCircle size="32" className="iconInput" />
                                    <Controller
                                       name="StartayaTsena"
                                       {...register("infoValue.StartayaTsena", { required: true })}
                                       control={control}
                                       render={({ field }) => <StartayaTsena className={starayaSena} {...field} />}
                                    />
                                 </div>

                                 <div className="boxInput">
                                    <AiOutlineDollarCircle size="32" className="iconInput" />
                                    <Controller
                                       name="TsenaSkidkoy"
                                       {...register("infoValue.TsenaSkidkoy", { required: true })}
                                       control={control}
                                       render={({ field }) => <TsenaSkidkoy className={senaSkidkoy} {...field} />}
                                    />
                                 </div>

                                 <div className="boxInput">
                                    <FaExpandArrowsAlt size="30" className="iconInput" />
                                    <Controller
                                       name="RamkaNaUz"
                                       {...register("infoValue.RamkaNaUz", { required: true })}
                                       control={control}
                                       render={({ field }) => <RamkaNaUz className={ramkaNaUz} {...field} />}
                                    />
                                 </div>

                                 <div className="boxInput">
                                    <FaExpandArrowsAlt size="30" className="iconInput" />
                                    <Controller
                                       name="RamkaNaRu"
                                       {...register("infoValue.RamkaNaRu", { required: true })}
                                       control={control}
                                       render={({ field }) => <RamkaNaRu className={ramkaNaRu} {...field} />}
                                    />
                                 </div>

                                 <div className="boxInput">
                                    <GiResize size="30" className="iconInput" />
                                    <Controller
                                       name="Razmer"
                                       {...register("infoValue.Razmer", { required: true })}
                                       control={control}
                                       render={({ field }) => <Razmer className={razmer} {...field} />}
                                    />
                                 </div>
                                 <div className="boxInput">
                                    <GiResize size="30" className="iconInput" />

                                    <Controller
                                       name="glubina"
                                       {...register("infoValue.glubina", { required: true })}
                                       control={control}
                                       render={({ field }) => <Glubina className={glubina} {...field} />}
                                    />
                                 </div>

                                 <div className="boxInput">
                                    <Controller
                                       name="RecommendRu"
                                       {...register("infoValue.RecommendRu", { required: true })}
                                       control={control}
                                       rules={{ required: true }}
                                       render={({ field }) => <RecommendRu className={recommendRu} {...field} />}
                                    />
                                 </div>
                                 <div className="boxInput">
                                    <Controller
                                       name="RecommendUz"
                                       {...register("infoValue.RecommendUz", { required: true })}
                                       control={control}
                                       rules={{ required: true }}
                                       render={({ field }) => <RecommendUz className={recommendUz} {...field} />}
                                    />
                                 </div>

                                 <Controller
                                    name="Komalektatsiya"
                                    //  {...register("infoValue.Komalektatsiya", { required: true })}
                                    control={control}
                                    //   rules={{ required: true }}
                                    render={({ field }) => <Komalektatsiya {...field} />}
                                 />
                                 <Controller
                                    name="KomalektatsiyaUz"
                                    //  {...register("infoValue.KomalektatsiyaUz", { required: true })}
                                    control={control}
                                    //   rules={{ required: true }}
                                    render={({ field }) => <KomalektatsiyaUz {...field} />}
                                 />
                              </div>

                              <button type="submit" className="ProductAddBtn" onClick={() => ModalClose}>
                                 изменить
                              </button>
                           </form>
                           <div className="div_footer"></div>
                        </div>
                     </Modal>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default memo(Product);
