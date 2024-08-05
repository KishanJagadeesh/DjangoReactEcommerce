import {
 CART_ADD_ITEM,
CART_REMOVE_ITEM,
CART_SAVE_SHIPPING_ADDRESS,
CART_SAVE_PAYMENT_METHOD,
CART_RESET
} from '../constants/cartConstants'


export const cartReducer =(state={cartItems:[],shippingAddress:{}, paymentMethod:{}}, action) =>{
    switch(action.type) {
        case CART_ADD_ITEM:
            const item=action.payload
            const existItem=state.cartItems.find(
                x=> x.product === item.product
            )

            if (existItem){
                return{
                    ...state,
                    cartItems: state.cartItems.map(x =>
                        x.product === existItem.product? item:x

                    )
                }
            } 
            else{
                return{
                    ...state,
                    cartItems:[...state.cartItems,item]
                }
            }

        case CART_REMOVE_ITEM:
            return {
                ...state,
                // here just checking whether x.product which is product id 
                // is not equal to payload that we will send
                // filter will keep every product that isnt sent to remove
                // and keeps remaining one in cartitems list
                cartItems:state.cartItems.filter(x=> x.product!==action.payload)

            }

        case CART_SAVE_SHIPPING_ADDRESS:
            return {
                ...state,
                shippingAddress: action.payload
            }

        case CART_SAVE_PAYMENT_METHOD:
            return {
                ...state,
                paymentMethod: action.payload
            }
        case CART_RESET:
            return {
                ...state,
                cartItems:[]
            }
        
            default:
                return state;
        
    }
}