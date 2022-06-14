import React, { useEffect, useState } from "react";
import Modal from "react-modal";
//  import {Box, TextField, MenuItem} from '@mui/material'
import SelectVariants from "./CategoryModalInput/MUIcategory";
import RamkaNaRu from "./CategoryModalInput/RamakNaRu";
import Razmer from "./CategoryModalInput/Razmer";
import RecommendRu from "./CategoryModalInput/RecommendRu";
import Kolichstva from "./CategoryModalInput/Kolichstva";
import StartayaTsena from "./CategoryModalInput/StartayaTsena";
import TsenaSkidkoy from "./CategoryModalInput/TsenaSkidkoy";
import RamkaNaUz from "./CategoryModalInput/RamkaNaUz";
import Glubina from "./CategoryModalInput/Glubina";
import RecommendUz from "./CategoryModalInput/RecomendUz";
import Komalektatsiya from "./CategoryModalInput/Komalektatsiya";
import KomalektatsiyaUz from "./CategoryModalInput/KomalekatsiyaUz";
import { BiCategory } from "react-icons/bi";
import { AiOutlineDollarCircle } from "react-icons/ai";
import { FaExpandArrowsAlt } from "react-icons/fa";
import { GiResize } from "react-icons/gi";
import { ImListNumbered } from "react-icons/im";
import { useForm, Controller } from "react-hook-form";
import axiosInstance from "../../api/axiosInstance";

import { useInput } from "../../hooks/useInput";

//styling
import "./ProductAdd.css";
import { useDispatch, useSelector } from "react-redux";
import { product_data, product_data_post } from "../../Store/action";
const ProductAdd = () => {
   const [product, setProduct] = useState(false);

   const {
      //   register,
      handleSubmit,
      watch,
      control,
      reset,
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
         //  name: "Jasur",
      },
   });

   const [baseImage, setBaseImage] = useState("");
   const [fileImg, setFileImg] = useState("");

   const [isImg, setIsImg] = useState(false);

   const uploadImage = async (e) => {
      const file = e.target.files[0];
      setFileImg(file);
      const base64 = await convertBase64(file);
      setBaseImage(base64);
      //   console.log(file);
      setIsImg(true);
   };
   //    console.log(fileImg);
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

   const PRODUCT_URL = "/product/";

   const ModalClose = async (e) => {
      console.log("e", e);
      setProduct(false);

      const token = JSON.parse(window.localStorage.getItem("AuthToken")).access;

      let axios = require("axios");
      let FormData = require("form-data");
      let data = new FormData();

      data.append("category", e.selectVariants);
      data.append("name", e.name);
      data.append("dis_price", e.TsenaSkidkoy);
      data.append("old_price", e.StartayaTsena);
      data.append("quantity", e.Kolichstva);
      data.append("ramka_ru", e.RamkaNaRu);
      data.append("ramka_uz", e.RamkaNaUz);
      data.append("razmer_m", e.Razmer);
      data.append("razmer_sm", e.glubina);
      data.append("recommendation_ru", e.RecommendRu);
      data.append("recommendation_uz", e.RecommendUz);
      data.append("complekt_uz", e.KomalektatsiyaUz.toString());
      data.append("complekt_ru", e.Komalektatsiya.toString());
      data.append("image", fileImg);

      let config = {
         method: "post",
         url: `https://mamirovs.pythonanywhere.com${PRODUCT_URL}`,
         headers: {
            Authorization: `Bearer ${token}`,
            // ...data.getHeaders(),
         },
         data: data,
      };

      axios(config)
         .then(function (response) {
            console.log(response.data);
            dispatch(product_data_post(response.data));
         })
         .catch(function (error) {
            console.log(error);
         });

      reset();
      setBaseImage("");
      setIsImg(false);
   };

   const onExit = () => {
      setProduct(false);
      setBaseImage("");
      reset();
      setIsImg(false);
   };

   //  men yozganim
   const dispatch = useDispatch();
   const tokenGet = JSON.parse(window.localStorage.getItem("AuthToken")).access;
   const state = useSelector((state) => state);

   useEffect(() => {
      axiosInstance
         .get(`${PRODUCT_URL}`, {
            headers: {
               Authorization: `Bearer ${tokenGet}`,
            },
         })
         .then((res) => {
            dispatch(product_data(res.data));
            // console.log("resdata", res.data);
         })
         .catch((error) => {
            //  console.error(error);
         });
   }, []);

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
      <div className="p-add">
         <button onClick={() => setProduct(true)}>+ Добавить продукт</button>
         <Modal
            className="ProductAdd"
            isOpen={product}
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
               <i className="fa-solid fa-close btn-closeIcon fa-3x " onClick={onExit}></i>
               <form onSubmit={handleSubmit(ModalClose)}>
                  <section className="ProductAddSection" style={isImg ? { border: "none", boxShadow: "none" } : { border: "0.869182px dashed #3a3a3a" }}>
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
                           <img src={baseImage} className="Product_Img" />
                        </div>
                     </label>
                  </section>

                  <div className="inputWrapper">
                     <div className="boxInput">
                        <BiCategory size="35" className="iconInput" />

                        <Controller
                           name="selectVariants"
                           control={control}
                           rules={{ required: true }}
                           render={({ field }) => <SelectVariants className={kategory} {...field} />}
                        />
                     </div>

                     <div className="boxInput">
                        <ImListNumbered size="32" className="iconInput" />
                        <Controller name="Kolichstva" control={control} render={({ field }) => <Kolichstva className={kolichestva} {...field} />} />
                     </div>

                     <div className="boxInput">
                        <AiOutlineDollarCircle size="32" className="iconInput" />
                        <Controller name="StartayaTsena" control={control} render={({ field }) => <StartayaTsena className={starayaSena} {...field} />} />
                     </div>

                     <div className="boxInput">
                        <AiOutlineDollarCircle size="32" className="iconInput" />
                        <Controller name="TsenaSkidkoy" control={control} render={({ field }) => <TsenaSkidkoy className={senaSkidkoy} {...field} />} />
                     </div>

                     <div className="boxInput">
                        <FaExpandArrowsAlt size="30" className="iconInput" />
                        <Controller name="RamkaNaUz" control={control} render={({ field }) => <RamkaNaUz className={ramkaNaUz} {...field} />} />
                     </div>

                     <div className="boxInput">
                        <FaExpandArrowsAlt size="30" className="iconInput" />
                        <Controller name="RamkaNaRu" control={control} render={({ field }) => <RamkaNaRu className={ramkaNaRu} {...field} />} />
                     </div>

                     <div className="boxInput">
                        <GiResize size="30" className="iconInput" />
                        <Controller name="Razmer" control={control} render={({ field }) => <Razmer className={razmer} {...field} />} />
                     </div>
                     <div className="boxInput">
                        <GiResize size="30" className="iconInput" />

                        <Controller name="glubina" control={control} render={({ field }) => <Glubina className={glubina} {...field} />} />
                     </div>

                     <div className="boxInput">
                        <Controller
                           name="RecommendRu"
                           control={control}
                           rules={{ required: true }}
                           render={({ field }) => <RecommendRu className={recommendRu} {...field} />}
                        />
                     </div>
                     <div className="boxInput">
                        <Controller
                           name="RecommendUz"
                           control={control}
                           rules={{ required: true }}
                           render={({ field }) => <RecommendUz className={recommendUz} {...field} />}
                        />
                     </div>

                     <Controller
                        name="Komalektatsiya"
                        control={control}
                        // rules={{ required: true }}
                        render={({ field }) => <Komalektatsiya {...field} />}
                     />
                     <Controller
                        className="komlektat__siya"
                        name="KomalektatsiyaUz"
                        control={control}
                        // rules={{ required: true }}
                        render={({ field }) => <KomalektatsiyaUz {...field} />}
                     />
                  </div>

                  <button type="submit" className="ProductAddBtn" onClick={() => ModalClose}>
                     Добавить
                  </button>
               </form>
               <div className="div_footer"></div>
            </div>
         </Modal>
      </div>
   );
};

export default ProductAdd;
