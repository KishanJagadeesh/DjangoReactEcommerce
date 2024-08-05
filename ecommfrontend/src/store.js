import {createStore,applyMiddleware,combineReducers} from 'redux';
import {thunk} from 'redux-thunk';
import { composeWithDevTools } from '@redux-devtools/extension';
import {
    productListReducers,
    productDetailsReducer,
    productDeleteReducer,
    productCreateReducer,
    productUpdateReducer,
    productReviewCreateReducer
} from './reducers/productReducers'
import { cartReducer } from './reducers/cartReducers';
import { json } from 'react-router-dom';
import {userLoginReducers, userRegisterReducers, userDetailsReducers,userUpdateProfileReducers,
    userListReducers,userDeleteReducers,userUpdateReducers} from './reducers/userReducers';
import {
    orderCreateReducers,
    orderDetailsReducers,
    orderPayReducers,
    orderListMyReducers,
    orderListReducers,
    orderDeliverReducers
} from './reducers/orderReducers'

const reducer=combineReducers({
    orderCreate: orderCreateReducers,
    orderDetails: orderDetailsReducers,
    orderList:orderListReducers,
    orderDeliver:orderDeliverReducers,

    productList:productListReducers,
    productDetails:productDetailsReducer,
    productDelete:productDeleteReducer,
    productCreate:productCreateReducer,
    productUpdate:productUpdateReducer,
    productReviewCreate:productCreateReducer,

    cart:cartReducer,
    userLogin:userLoginReducers,
    userRegister:userRegisterReducers,
    userDetails: userDetailsReducers,
    userList:userListReducers,
    userUpdateProfile: userUpdateProfileReducers,
    userDelete:userDeleteReducers,
    userUpdate:userUpdateReducers,
    orderPay:orderPayReducers,
    orderListMy:orderListMyReducers,
})

const cartItemsFromStorage=localStorage.getItem('carItems')?
    JSON.parse(localStorage.getItem('cartItems')): []

const userInfoFromStorage=localStorage.getItem('userInfo')?
JSON.parse(localStorage.getItem('userInfo')): null

const shippingAddressFromStorage=localStorage.getItem('shippingAddress')?
JSON.parse(localStorage.getItem('shippingAddress')): {}


const paymentMethodFromStorage=localStorage.getItem('paymentMethod')?
JSON.parse(localStorage.getItem('paymentMethod')): ''


const initialState={
    cart:{
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
    paymentMethod: paymentMethodFromStorage,
    },
    userLogin:{userInfo: userInfoFromStorage}
}

const middleware=[thunk]
const store = createStore(
    reducer, 
    initialState,
    composeWithDevTools(applyMiddleware(...middleware)));

export default store

