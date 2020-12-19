import React, { useEffect,useState } from 'react';
import { addToCart, removeFromCart } from '../actions/cartActions';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AuthContext } from '../firebase/Auth';
import firebase from 'firebase/app'
import 'firebase/auth';


function CartScreen(props) {
  const [userInfo, setUserInfo] = useState(undefined);
  const productId = props.match.params.id;
  console.log("inside cartscreen");
  const qty = props.location.search ? Number(props.location.search.split("=")[1]) : 1;
  const cart = useSelector(state => state.cart);
  const { cartItems,error } = cart;

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
  }, [dispatch, productId, qty]);

  firebase.auth().onAuthStateChanged((user) => {
        
    if (user) {
        setUserInfo(user.uid);
        // User logged in already or has just logged in.
        console.log("User has logged in and userid is")
        console.log(user.uid);
    } else {
        // User not logged in or has just logged out.

        console.log("User not logged in")
        props.history.push("/signin");
    }
});


  const checkoutHandler = () => {
    if(userInfo)
    {
      props.history.push("/shipping");
    }
    else
    props.history.push("/signin");
    
  }

  return <div className="cart">
    <div className="cart-list">
      <ul className="cart-list-container">
        <li>
          <h1>
            Shopping Cart
          </h1>
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
                    <Link to={"/productDetails/" + item.product}>
                      {item.name}
                    </Link>

                </div>
                  <div>
                        Qty:
                        <select value={item.qty} onChange={(e) => dispatch(addToCart(item.product, e.target.value))}>
                      
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                    
                    </select>
                        
                      
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
      <h2>
        Subtotal ( {cartItems.reduce((a, c) => a + parseInt(c.qty), 0)} items)
        :
         $ {cartItems.reduce((a, c) => a + c.price * parseInt(c.qty), 0)}
      </h2>
      <button onClick={checkoutHandler} className="button primary full-width" disabled={cartItems.length === 0}>
        Proceed to Checkout
      </button>

    </div>

  </div>
}

export default CartScreen;