// import {configureStore} from '@reduxjs/toolkit';
import { createStore } from "redux";
import { AddCategory } from "./reducer";
import { throttle } from "lodash";
import { add_category } from "./action";
import { useDispatch } from "react-redux";

export const store = createStore(AddCategory);

store.subscribe(
   throttle(() => {
      store.getState();
      console.log("storegetstate", store.getState());
   }),
   1000
);


