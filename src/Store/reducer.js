export const AddCategory = (state = { data: [], info: [], product: [] }, action) => {
   if (action.type === "ADD_CATEGORY") {
      return {
         ...state,
         ...action,
      };
   } else if (action.type === "ADD_CATEGORY_ONE") {
      return {
         ...state,
         data: [...state.data, action.data],
      };
   } else if (action.type === "DELETE_CATEGORY") {
      return {
         ...state,
         data: state.data.filter((item) => item.id !== action.payload),
      };
   } else if (action.type === "EDIT_CATEGORY") {
      return {
         ...state,
         data: state.data.map((item, i) => {
            if (item.id === action.data.id) {
               return action.data;
            }
            return item;
         }),
      };
   } else if (action.type === "WEB_DATA") {
      return {
         ...state,
         info: action.info[0],
      };
   } else if (action.type === "EDIT_WEB_DATA") {
      return {
         ...state,
         info: action.newInfo,
      };
   } else if (action.type === "PRODUCT_DATA") {
      return {
         ...state,
         product: action.product,
      };
   } else if (action.type === "PRODUCT_DATA_POST") {
      return {
         ...state,
         product: [...state.product, action.product],
      };
   } else if (action.type === "PRODUCT_DATA_DELETE") {
      return {
         ...state,
         product: state.product.filter((item) => item.id !== action.payload),
      };
   } else if (action.type === "PRODUCT_DATA_PUT") {
      return {
         ...state,
         product: state.product.map((item, i) => {
            if (item.id === action.newProduct.id) {
               return action.newProduct;
            }
            return item;
         }),
      };
   } else if (action.type === "ZAKAZ_DATA_GET") {
      return {
         ...state,
         zakaz: action.zakaz,
      };
   } else if (action.type === "ZAKAZ_DATA_DELETE") {
      return {
         ...state,
         zakaz: state.zakaz.filter((item) => item.id !== action.payload),
      };
   } else if (action.type === "ZAKAZ_DATA_PATCH") {
      return {
         ...state,
         zakaz: state.zakaz.map((item, i) => {
            if (item.id === action.isActiv.id) {
               return action.isActiv;
            }
            return item;
         }),
      };
   } else if (action.type === "KONSUL_DATA_GET") {
      return {
         ...state,
         konsul: action.konsul,
      };
   } else if (action.type === "KONSUL_DATA_DELETE") {
      return {
         ...state,
         konsul: state.konsul.filter((item) => item.id !== action.payload),
      };
   } else if (action.type === "KONSUL_DATA_PATCH") {
      return {
         ...state,
         konsul: state.konsul.map((item, i) => {
            if (item.id === action.isActiv.id) {
               return action.isActiv;
            }
            return item;
         }),
      };
   } else if (action.type === "SEARCH_DATA") {
      return {
         ...state,
         value: action.value,
      };
   }

   return state;
};
