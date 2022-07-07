import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "../api/axios";

import "./LoginStyle/Login.css";

import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LOGIN_URL = "/token/";

export default function Login({ setToken }) {
   // ******** //
   const [open, setOpen] = useState(false);
   const handleClose = () => {
      setOpen(false);
   };
   const handleToggle = () => {
      setOpen(!open);
   };

   const notifyError = () =>
      toast.error("User not defined", {
         position: "bottom-center",
         autoClose: 5000,
         hideProgressBar: false,
         closeOnClick: true,
         pauseOnHover: false,
         draggable: true,
         progress: undefined,
      });
   const notifySuccess = () =>
      toast.success("Logined", {
         position: "bottom-center",
         autoClose: 5000,
         hideProgressBar: false,
         closeOnClick: true,
         pauseOnHover: false,
         draggable: true,
         progress: undefined,
      });
   // ******** //

   const [username, setUserName] = useState();
   const [password, setPassword] = useState();

   const handleSubmit = async (e) => {
      e.preventDefault();
      try {
         const response = await axios.post(LOGIN_URL, JSON.stringify({ username, password }), {
            headers: { "Content-Type": "application/json" },
         });
         setToken(response.data);
         notifySuccess();
         setUserName("");
         setPassword("");

         handleClose();
      } catch (err) {
         handleClose();
         notifyError();
         return err;
      }
   };

   return (
      <section className="Container">
         <div className="background">
            <h1>INTEX-MARKET.UZ</h1>
            <p>Введите имя и пароль, если у вас есть доступ к панели администратора</p>
            <form onSubmit={handleSubmit}>
               <input
                  type="text"
                  autoComplete="off"
                  onChange={(e) => setUserName(e.target.value)}
                  // value = {username}
                  required
                  placeholder="имя пользователя"
                  className="inputName"
               />
               <input type="password" onChange={(e) => setPassword(e.target.value)} className="inputPassword" placeholder="пароль" />
               <button className="btn_voyti" onClick={handleToggle}>
                  Sign In
               </button>
               <ToastContainer
                  position="bottom-center"
                  autoClose={5000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover={false}
               />
               <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={open}>
                  <CircularProgress color="inherit" />
               </Backdrop>
            </form>
         </div>
      </section>
   );
}

Login.propTypes = {
   setToken: PropTypes.func.isRequired,
};
