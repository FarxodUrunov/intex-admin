import axios from "axios";
import jwt_decode from "jwt-decode";
import dayjs from "dayjs";

// const baseURL = "http://figmasupport.pythonanywhere.com";
const baseURL = "https://mamirovs.pythonanywhere.com";

let authTokens = localStorage.getItem("AuthToken") ? JSON.parse(localStorage.getItem("AuthToken")) : null;

const axiosInstance = axios.create({
   baseURL,
   headers: { Authorization: `Bearer ${authTokens?.access}` },
});

axiosInstance.interceptors.request.use(async (req) => {
   if (!authTokens) {
      authTokens = localStorage.getItem("AuthToken") ? JSON.parse(localStorage.getItem("AuthToken")) : null;
      req.headers.Authorization = `Bearer ${authTokens?.access}`;
   }

   const user = jwt_decode(authTokens.access);
   const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;
   if (!isExpired) return req;

   const response = await axios
      .post(
         ` ${baseURL}/token/refresh/`,
         JSON.stringify({
            refresh: authTokens.refresh,
         }),
         {
            headers: {
               "Content-Type": "application/json",
            },
         }
      )
      .catch((err) => {
         console.log(err);
         localStorage.removeItem("AuthToken");
         window.location.reload();
      });
   authTokens.access = response.data.access;
   localStorage.setItem("AuthToken", JSON.stringify(authTokens)); // *** //
   req.headers.Authorization = `Bearer ${response.data.access}`;

   return req;
});

export default axiosInstance;
