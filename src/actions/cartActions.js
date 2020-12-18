import Axios from "axios";
import Cookie from "js-cookie"
//import Cookie from "js-cookie";
import { CART_ADD_ITEM,CART_ADD_ITEM_FAIL, CART_REMOVE_ITEM, CART_SAVE_SHIPPING, CART_SAVE_PAYMENT,CART_SAVE_PAYMENT_METHOD ,CART_SAVE_SHIPPING_ADDRESS} from "../constants/cartConstants";

const addToCart = (productId, qty) => async (dispatch, getState) => {
  try {
    console.log("inside add to cart"+productId+qty)
    const { data } = await Axios.get("http://127.0.0.1:5000/products/ProductDetails/" + productId);
    const { cart: { cartItems } } = getState();
    dispatch({
      type: CART_ADD_ITEM, payload: {
        product: data._id,
        name: data.name,
        image: data.url,
        price: data.price,
        category:data.category,
        size:data.size,
        gender:data.gender,
        brand:data.brand,
        details:data.details,
        url:data.url,
        qty
      }
    });
    //Cookie.set("cartItems", JSON.stringify(cartItems));
    localStorage.setItem(
      'cartItems',
      JSON.stringify(getState().cart.cartItems)
    );
    

  } catch (error) {
console.log("error:"+error)
  }
}
const removeFromCart = (productId) => (dispatch, getState) => {
  dispatch({ type: CART_REMOVE_ITEM, payload: productId });
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
  //const { cart: { cartItems } } = getState();
  //Cookie.set("cartItems", JSON.stringify(cartItems));
}
const saveShipping = (data) => (dispatch) => {
  dispatch({ type: CART_SAVE_SHIPPING, payload: data });
  localStorage.setItem('shippingAddress', JSON.stringify(data));
}
const savePayment = (data) => (dispatch) => {
  dispatch({ type: CART_SAVE_PAYMENT, payload: data });
}
const savePaymentMethod = (data) => (dispatch) => {
  dispatch({ type: CART_SAVE_PAYMENT_METHOD, payload: data });
};
const saveShippingAddress = (data) => (dispatch) => {
  dispatch({ type: CART_SAVE_SHIPPING_ADDRESS, payload: data });
  localStorage.setItem('shippingAddress', JSON.stringify(data));
};
export { addToCart, removeFromCart, saveShipping, savePayment,savePaymentMethod,saveShippingAddress }