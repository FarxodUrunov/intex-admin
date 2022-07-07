import axios from "./axios";
import axiosInstance from "./axiosInstance";

export const ApiGet = (url, token, disp, action) => {
   return axiosInstance
      .get(url, {
         headers: {
            Authorization: `Bearer ${token}`,
         },
      })
      .then((res) => {
         // console.log(res.data);
         disp(action(res.data));
      })
      .catch((error) => {
         console.error(error);
      });
};

export const ApiPatch = (url, id, token, dis, act, app1, nameData1, app2, nameData2) => {
   let axios = require("axios");
   let FormData = require("form-data");
   let data = new FormData();
   data.append(`${nameData1}`, app1);
   data.append(`${nameData2}`, app2);

   let config = {
      method: "patch",
      url: `https://mamirovs.pythonanywhere.com${url}${id}/`,
      headers: {
         Authorization: `Bearer ${token}`,
      },
      data: data,
   };

   axios(config)
      .then(function (response) {
         // console.log(response);
         dis(act(response.data));
      })
      .catch(function (error) {
         console.log(error);
      });
};

export const ApiDelet = (url, id, token, dis, act) => {
   axiosInstance
      .delete(`${url}${id}`, {
         headers: {
            Authorization: `Bearer ${token}`,
         },
      })
      .then((res) => {
         // console.log(res);
         dis(act(id));
      })
      .catch((error) => {
         console.error(error);
      });
};

export const ApiPut = (url, id, token, dis, act, data = {}) => {
   console.log(data);
   let config = {
      method: "put",
      url: `https://mamirovs.pythonanywhere.com${url}${id}/`,
      headers: {
         Authorization: `Bearer ${token}`,
         "Content-Type": "application/json",
      },
      data: JSON.stringify(data),
   };

   axios(config)
      .then(function (response) {
         dis(act(response.data));
      })
      .catch(function (error) {
         console.log(error);
      });
};
