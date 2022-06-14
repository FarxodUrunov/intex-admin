// import React from "react";
// import { useState, useEffect } from "react";
// import useAuth from "../hooks/useAuth";
// import { useNavigate, useLocation } from "react-router-dom";

// //  *************************************************
// import Backdrop from "@mui/material/Backdrop";
// import CircularProgress from "@mui/material/CircularProgress";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// //  *************************************************

// import "./LoginStyle/Login.css";
// import axios from "../api/axios";
// import { useDispatch } from "react-redux";
// import { add_category } from "../Store/action";
// import { GetCats } from "./query";
// const LOGIN_URL = "/token/";
// // const LOGIN_URL = "/auth-token/";

// const CATEGORY_URL = "/category/";
// const Login = () => {
//    const { setAuth } = useAuth();
//    const dispatch = useDispatch();

//    const navigate = useNavigate();
//    const location = useLocation();
//    const from = location.state?.from?.pathname || "/";

//    //  *************************************************
//    const [open, setOpen] = useState(false);
//    const handleClose = () => {
//       setOpen(false);
//    };
//    const handleToggle = () => {
//       setOpen(!open);
//    };

//    const notifyError = () =>
//       toast.error("User not defined", {
//          position: "bottom-center",
//          autoClose: 5000,
//          hideProgressBar: false,
//          closeOnClick: true,
//          pauseOnHover: false,
//          draggable: true,
//          progress: undefined,
//       });
//    const notifySuccess = () =>
//       toast.success("Logined", {
//          position: "bottom-center",
//          autoClose: 5000,
//          hideProgressBar: false,
//          closeOnClick: true,
//          pauseOnHover: false,
//          draggable: true,
//          progress: undefined,
//       });

//    //  *************************************************

//    const [user, setUser] = useState("");
//    const [pwd, setPwd] = useState("");

//    //    useEffect(()=>{
//    //        userRef.current.focus();
//    //    },[]);

//    //    useEffect(()=>{
//    //        setErrMsg('')
//    //    }, [user, pwd]);

//    const handleSubmit = async (e) => {
//       e.preventDefault();
//       try {
//          const response = await axios.post(LOGIN_URL, JSON.stringify({ username: user, password: pwd }), {
//             headers: { "Content-Type": "application/json" },
//             //    withCredentials: true
//          });
//          //  console.log(response);
//          //  console.log(JSON.stringify(response?.data));
//          //  console.log(JSON.stringify(response));
//          const accessToken = response?.data?.access;
//          localStorage.setItem("AuthToken", JSON.stringify(response.data));

//          const tokenGet = JSON.parse(window.localStorage.getItem("AuthToken")).access;

//          //  GetCats(tokenGet);

//          axios
//             .get(CATEGORY_URL, {
//                headers: {
//                   Authorization: `Bearer ${tokenGet}`,
//                },
//             })
//             .then((res) => {
//                dispatch(add_category(res.data));
//                //    console.log("resdata", res.data);
//             })
//             .catch((error) => {
//                //  console.error(error);
//             });

//          setAuth({ user, pwd, accessToken });
//          notifySuccess();
//          setUser("");
//          setPwd("");
//          handleClose();
//          navigate(from, { replace: true });
//          //  alert('You have succesfully logged in')
//       } catch (err) {
//          if (err.response?.status === 401) {
//             handleClose();
//             //    alert('Login or password is incorrect')
//             notifyError();
//             setUser("");
//             setPwd("");
//          }
//          return err;
//       }
//    };

//    return (
//       <section className="Container">
//          <div className="background">
//             <h1>INTEX-MARKET.UZ</h1>
//             <p>Введите имя и пароль, если у вас есть доступ к панели администратора</p>
//             <form onSubmit={handleSubmit}>
//                <input
//                   type="text"
//                   autoComplete="off"
//                   onChange={(e) => setUser(e.target.value)}
//                   value={user}
//                   required
//                   placeholder="имя пользователя"
//                   className="inputName"
//                />
//                <input type="password" onChange={(e) => setPwd(e.target.value)} value={pwd} className="inputPassword" placeholder="пароль" />
//                <button className="btn_voyti" onClick={handleToggle}>
//                   Sign In
//                </button>
//                {/* <button onClick={notifyError}>Notify!</button>                      */}
//                <ToastContainer
//                   position="bottom-center"
//                   autoClose={5000}
//                   hideProgressBar={false}
//                   newestOnTop={false}
//                   closeOnClick
//                   rtl={false}
//                   pauseOnFocusLoss
//                   draggable
//                   pauseOnHover={false}
//                />
//                <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={open}>
//                   <CircularProgress color="inherit" />
//                </Backdrop>
//             </form>
//          </div>
//       </section>
//    );
// };

// export default Login;

import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "../api/axios";

import "./LoginStyle/Login.css";

import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useDispatch } from "react-redux";

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
