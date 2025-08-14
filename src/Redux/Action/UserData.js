
// import axiosInstance from "../../../Api/axiosInstance";
// import PublicRoute from "../../Routes/PublicRoute";

import axiosInstance from "../../Api/axiosInstance";

   
export const USER_DATA = "USER_DATA"; 
  
 
  const fetchUserDataSuccess = (data) => ({
    type: USER_DATA,
    payload: data,
 });
 
 

 
 
// Api  
export const fetchUserData = (navigate) => {
    return async (dispatch) => {
        try {
            const response = await axiosInstance.get('/vendor/Webuser');
            dispatch(fetchUserDataSuccess(response.data));
          } catch (error) {
            // await localStorage.removeItem("zxcvbnm@#"); 
          }
    };
};
 