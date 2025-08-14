// import { USER_DATA } from "../Action/UserData";

import { USER_DATA } from "../Action/UserData";

// import { USER_DATA } from "../Action/YourPropertyThunk/UserData";

 
 
 

const initialState ={
    userData: []
}

const UserDataReducer = (state = initialState, action) => {
    switch(action.type) {
        case USER_DATA:
            
            return {
                ...state,
                userData: action.payload
            }; 
           
           
        default:
            return state;
    }
}

export default UserDataReducer;