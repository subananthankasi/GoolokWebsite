// src/redux/store.js
import { createStore, combineReducers, applyMiddleware } from 'redux';
import GridViewFilterReducer from '../Reducer/GridViewFilterReducer';
import { thunk } from 'redux-thunk';
import LoginReducer from '../Reducer/LoginReducer';
import PropertyTypeReducer from '../Reducer/PropertyTypeReducer';
import SubPropertyReducer from '../Reducer/SubPropertyReducer';
import UserDataReducer from '../Reducer/UserDataReducer';
import NotificationReducer from '../Reducer/NotificationReducer';
import { agreeSliceReducer } from '../Reducer/LandOwnerAgreementSlice';
import { yourPropertyReducer } from '../Reducer/YourProperTyReducer/YourPropertyReducer';
import { cardListReducer, cartReducer } from '../Reducer/CardReducer';
import { wishlistReducer, wishlistVerifyReducer } from '../Reducer/WishlistReducer';
// import { cardDeleteReducer, cardListReducer, cardPostReducer, cardReducer } from '../Reducer/CardReducer';


const rootReducer = combineReducers({
    PropertyType: PropertyTypeReducer,
    SubPropertyType: SubPropertyReducer,
    userData: UserDataReducer,
    notificationData: NotificationReducer,
    location: GridViewFilterReducer,
    auth: LoginReducer,
    agreeSigned: agreeSliceReducer,
    yourPropertydata: yourPropertyReducer,
    // shoppingCardGetData:cardReducer,
    // shoppingCardDeleteData:cardDeleteReducer,
    // shoppingCardPostData:cardPostReducer,
    shoppingCardListData:cardListReducer,
    cart: cartReducer,
    wishlist:wishlistReducer,
    wishlistVerify:wishlistVerifyReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
