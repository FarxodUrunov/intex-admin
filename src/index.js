import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./LoginPage/Interceptors/axios";
import { AuthProvider } from "./context/AuthProvider";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./Store/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
   <Provider store={store}>
      <React.StrictMode>
         <BrowserRouter>
            <AuthProvider>
               <Routes>
                  <Route path="/*" element={<App />} />
               </Routes>
            </AuthProvider>
         </BrowserRouter>
      </React.StrictMode>
   </Provider>
);
