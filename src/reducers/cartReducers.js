import { CART_ADD_ITEM,
   CART_REMOVE_ITEM, 
   CART_SAVE_SHIPPING, 
   CART_ADD_ITEM_FAIL,
   CART_EMPTY,
   CART_SAVE_PAYMENT,
   CART_SAVE_SHIPPING_ADDRESS,
   CART_SAVE_PAYMENT_METHOD } from "../constants/cartConstants";

function cartReducer(state = { cartItems: [], shipping: {}, payment: {} }, action) {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;
      const product = state.cartItems.find(x => x.product === item.product);
      if (product) {
        return {
          cartItems:
            state.cartItems.map(x => x.product === product.product ? item : x)
        };
      }
      return { cartItems: [...state.cartItems, item] };
    case CART_REMOVE_ITEM:
      return { cartItems: state.cartItems.filter(x => x.product !== action.payload) };
    case CART_SAVE_SHIPPING:
      return { ...state, shipping: action.payload };
      case CART_ADD_ITEM_FAIL:
      return { ...state, error: action.payload };
      case CART_EMPTY:
      return { ...state, error: '', cartItems: [] };
    case CART_SAVE_PAYMENT:
      return { ...state, payment: action.payload };
    case CART_SAVE_PAYMENT_METHOD:
      return { ...state, paymentMethod: action.payload };
    case CART_SAVE_SHIPPING_ADDRESS:
      return { ...state, shippingAddress: action.payload };
    default:
      return state
  }
}

export { cartReducer }