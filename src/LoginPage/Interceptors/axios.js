// import axios from "axios";


// axios.interceptors.response.use(async (resp) => {
//     return resp;
// }, async error=>{
//         if(error.response.status === 401){
//             const AuthToken= JSON.parse(window.localStorage.getItem("AuthToken")).refresh.toString();
//             if (AuthToken) {
//             const response = await axios.post('https://figmauz.herokuapp.com/token/refresh/', {}, {AuthToken}) 
            
//             if(response.status === 200){
//             axios.defaults.headers.common['Authorization'] = await `Bearer ${response.data['access']}`

//                 return axios(error.config)
//             }
//         }
//         }
//         return error;
    
// })

