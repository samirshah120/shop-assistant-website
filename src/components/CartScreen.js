import React, { useEffect,useState } from 'react';
import { addToCart, removeFromCart } from '../actions/cartActions';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import image from '../img/jeans_image.png';
import { AuthContext } from '../firebase/Auth';
import firebase from 'firebase/app'
import 'firebase/auth';


function CartScreen(props) {
  const [userInfo, setUserInfo] = useState(undefined);
  console.log("inside cartscreen");
  const cart = useSelector(state => state.cart);

  const { cartItems } = cart;

  const productId = props.match.params.id;
  const qty = props.location.search ? Number(props.location.search.split("=")[1]) : 1;
  console.log("qty:"+qty)
  console.log("productId:"+productId)
  const dispatch = useDispatch();
  const removeFromCartHandler = (productId) => {
    dispatch(removeFromCart(productId));
  }
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, []);

  firebase.auth().onAuthStateChanged((user) => {
        
    if (user) {
        setUserInfo(user.uid);
        // User logged in already or has just logged in.
        console.log("User has logged in and userid is")
        console.log(user.uid);
    } else {
        // User not logged in or has just logged out.
        console.log("User not logged in")
    }
});

  const checkoutHandler = () => {
    props.history.push("/shipping");
  }

  return <div className="cart">
    <div className="cart-list">
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
                  <img src={image} alt="product" />
                </div>
                <div className="cart-name">
                  <div>
                    <Link to={"/product/" + item.product}>
                      {item.name}
                    </Link>

                </div>
                  <div>
                        Quantity: {qty}
                      
                        <button type="button" className="button" onClick={() => removeFromCartHandler(item.product)} >
                          Delete
                        </button>
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
    <div className="cart-action">
      <h3>
        Subtotal ( {cartItems.reduce((a, c) => a + c.qty, 0)} items)
        :
         $ {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
      </h3>
      <button onClick={checkoutHandler} className="button primary full-width" disabled={cartItems.length === 0}>
        Proceed to Checkout
      </button>

    </div>

  </div>
}

export default CartScreen;