import { createStore } from "redux";
import { AddCategory } from "./reducer";
import { throttle } from "lodash";
export const store = createStore(AddCategory);

store.subscribe(
   throttle(() => {
      store.getState();
        // console.log("storegetstate", store.getState());
   }),
   1000
);
