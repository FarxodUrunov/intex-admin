export const add_category = (data) => {
   return {
      type: "ADD_CATEGORY",
      data,
   };
};

export const add_category_one = (data) => {
   return {
      type: "ADD_CATEGORY_ONE",
      data,
   };
};

export const delete_category = (id) => {
   return {
      type: "DELETE_CATEGORY",
      payload: id,
   };
};

export const edit_category = (data) => {
   return {
      type: "EDIT_CATEGORY",
      data,
   };
};
export const web_data = (info) => {
   return {
      type: "WEB_DATA",
      info,
   };
};

export const edit_web_data = (newInfo) => {
   return {
      type: "EDIT_WEB_DATA",
      newInfo,
   };
};
export const product_data = (product) => {
   return {
      type: "PRODUCT_DATA",
      product,
   };
};
export const product_data_post = (product) => {
   return {
      type: "PRODUCT_DATA_POST",
      product,
   };
};
export const product_data_delete = (id) => {
   return {
      type: "PRODUCT_DATA_DELETE",
      payload: id,
   };
};
export const product_data_put = (newProduct) => {
   return {
      type: "PRODUCT_DATA_PUT",
      newProduct,
   };
};
export const zakaz_data_get = (zakaz) => {
   return {
      type: "ZAKAZ_DATA_GET",
      zakaz,
   };
};
export const zakaz_data_delet = (id) => {
   return {
      type: "ZAKAZ_DATA_DELETE",
      payload: id,
   };
};
export const zakaz_data_patch = (isActiv) => {
   return {
      type: "ZAKAZ_DATA_PATCH",
      isActiv,
   };
};
export const konsul_data_get = (konsul) => {
	return {
	   type: "KONSUL_DATA_GET",
	   konsul,
	};
 };
 export const konsul_data_delet = (id) => {
	return {
	   type: "KONSUL_DATA_DELETE",
	   payload: id,
	};
 };
 export const konsul_data_patch = (isActiv) => {
	return {
	   type: "KONSUL_DATA_PATCH",
	   isActiv,
	};
 };
// console.log(add_category())
