import React, { useState,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CheckoutSteps from '../components/CheckoutSteps';
import { createOrder } from '../actions/orderActions';
import { ORDER_CREATE_RESET } from '../constants/orderConstants';
import firebase from 'firebase/app'
import 'firebase/auth';
function PlaceOrderScreen(props) {
  const cart = useSelector(state => state.cart);
  const orderCreate = useSelector(state => state.orderCreate);
  const { loading, success, error, order } = orderCreate;
  //const [userInfo, setUserInfo] = useState(undefined);

  const { cartItems, shipping, payment } = cart;
  // if (!shipping.address) {
  //   props.history.push("/shipping");
  // } else if (!payment.paymentMethod) {
  //   props.history.push("/payment");
  // }
  const itemsPrice = cartItems.reduce((a, c) => a + c.price * c.qty, 0);
  const shippingPrice = itemsPrice > 100 ? 0 : 10;
  const taxPrice = 0.15 * itemsPrice;
  const totalPrice = itemsPrice + shippingPrice + taxPrice;

  const dispatch = useDispatch();

let userInfo;
firebase.auth().onAuthStateChanged((user) => {
          
  if (user) {
    userInfo=user.uid;
      //setUserInfo(user.uid);
     // alert("userInfo:"+userInfo)
      // User logged in already or has just logged in.
      console.log("User has logged in and userid is")
      console.log(user.uid);
  } else {
      // User not logged in or has just logged out.
      console.log("User not logged in")
  }
});
  
    

  const placeOrderHandler = () => {
    console.log(userInfo)
    // create an order
    dispatch(createOrder({
      orderItems: cartItems, shipping, payment, itemsPrice, shippingPrice,taxPrice, totalPrice,userInfo
    }));
   // alert(order)
    //props.history.push("/order/" + order._id);
    //prompt("order", order);
    
  }
   useEffect(() => {
    
    if (success) {
      //alert(order._id)
      props.history.push("/order/" + order._id);
      dispatch({ type: ORDER_CREATE_RESET });
    }

  }, [success]); //dispatch, order, props.history, success

  return <div>
    <CheckoutSteps step1 step2 step3 step4 ></CheckoutSteps>
    <div className="placeorder">
      <div className="placeorder-info">
        <div>
          <h1>
            Shipping
          </h1>
          <div>
            {cart.shippingAddress.address}, {cart.shippingAddress.city},
          {cart.shippingAddress.postalCode}, {cart.shippingAddress.country},
          </div>
        </div>
        <div>
          <h2>Payment</h2>
          <div>
            Payment Method: {cart.paymentMethod}
          </div>
        </div>
        <div>
          <ul className="cart-list-container">
            <li>
              <h3>
                Shopping Cart
          </h3>
              <div>
                Price
          </div>
            </li>
            {
              cartItems.length === 0 ?
                <div>
                  Cart is empty
          </div>
                :
                cartItems.map(item =>
                  <li>
                    <div className="cart-image">
                    <img src = {process.env.PUBLIC_URL + `/img/dst/${item.url}`} alt="product" />
                    </div>
                    <div className="cart-name">
                      <div>
                        <Link to={"/product/" + item.product}>
                          {item.name}
                        </Link>

                      </div>
                      <div>
                        Qty: {item.qty}
                      </div>
                    </div>
                    <div className="cart-price">
                      ${item.price}
                    </div>
                  </li>
                )
            }
          </ul>
        </div>

      
      </div>
      <div className="placeorder-action">
        <ul>
          <li>
            <button className="button primary full-width" onClick={placeOrderHandler} >Place Order</button>
          </li>
          <li>
            <h3>Order Summary</h3>
          </li>
          <li>
            <div>Items</div>
            <div>${itemsPrice}</div>
          </li>
          <li>
            <div>Shipping</div>
            <div>${shippingPrice}</div>
          </li>
          <li>
            <div>Tax</div>
            <div>${taxPrice}</div>
          </li>
          <li>
            <div>Order Total</div>
            <div>${totalPrice}</div>
          </li>
        </ul>



      </div>

    </div>
  </div>

}

export default PlaceOrderScreen;