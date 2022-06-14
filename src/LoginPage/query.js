import { useDispatch } from "react-redux";
import axios from "../api/axios";
import { add_category } from "../Store/action";
const CATEGORY_URL = "/category/";

export const GetCats = (tokenGet) => {
   const dispatch = useDispatch();
   axios
      .get(CATEGORY_URL, {
         headers: {
            Authorization: `Bearer ${tokenGet}`,
         },
      })
      .then((res) => {
         dispatch(add_category(res.data));
         console.log("resdata", res.data);
      })
      .catch((error) => {
         //   console.error(error);
      });
};
