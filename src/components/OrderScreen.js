import React, { useEffect, useContext} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { createOrder, detailsOrder } from '../actions/orderActions';
import { AuthContext } from '../firebase/Auth';
import firebase from 'firebase/app'
import 'firebase/auth';
import Button from "react-bootstrap/Button";
import { jsPDF } from "jspdf";
function OrderScreen(props) {

  const orderId = props.match.params.id;
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;
  const orderPay = useSelector((state) => state.orderPay);
  const { currentUser } = useContext(AuthContext);


  const dispatch = useDispatch();
  useEffect(() => {
    
      dispatch(detailsOrder(orderId));
  }, [orderId]);

  return loading ? <div>Loading ...</div> : error ? <div>{error}</div> :
    <div>
      <div>
        <Button
          variant="primary"
          style={{ marginBottom: "15px" }}
          onClick={(props) => {

            const doc = new jsPDF();
            console.log('reached carItems');
            let orderstr = "";
            let tcost = 0;
            order.orderItems.map((i) => {
              orderstr += "\n" +
                "Item Name: " + i.name + "\n" +
                "Price: " + i.price + "\n" +
                "Quantity: " + i.qty + "\n";

              tcost += i.price;


            })

            console.log("tcost is " + tcost);
            console.log(currentUser.metadata.lastSignInTime);




            // console.log(cartItems)
            // let a = {
            //   name: cartItems[1].name,
            //   price: cartItems[1].price,
            //   qty: cartItems[1].qty
            // };
            // console.log(JSON.stringify(a))
            // doc.text(`${currentUser}`);
            // doc.text(`${JSON.stringify(a.name)}, Thank you for Shopping with us! This is the receipt for your shopping`, 10, 10);
            // doc.setFontSize(10)
            doc.setFontSize(30).text(`Order Receipt for ${currentUser.email}`, 10, 10)
            doc.setFontSize(20).text(`The shipping cost is ${order.shippingPrice}.`, 10, 30)
            doc.setFontSize(20).text(`The total tax is ${order.taxPrice}.`, 10, 40)
            doc.setFontSize(20).text(`The total cost is : ${order.totalPrice}`, 10, 50)
            doc.setFontSize(10).text(`Order placed on ${currentUser.metadata.lastSignInTime}. Thank you for Shopping with us!`, 10, 60);
            doc.setFontSize(10).text("Contact us at customercare@business.com for enquiry", 10, 70);
            doc.setFontSize(10).text(`It will be shipped to ${order.shipping.address} ${order.shipping.city} ${order.shipping.postalCode}${order.shipping.country}`, 10, 80)
            doc.setFontSize(10).text(`The payment was done by ${order.payment.paymentMethod}`, 10, 90)
            doc.setFontSize(10).text(orderstr, 10, 100);
            doc.save("Order_receipt.pdf");
          }}
        >
          Download Receipt PDF
        </Button>
      </div>

      <div className="placeorder">
        <div className="placeorder-info">
          <div>
            <h3>
              Shipping
          </h3>
            <div>
              {order.shipping.address}, {order.shipping.city},
          {order.shipping.postalCode}, {order.shipping.country},
          </div>
            <div>
              {order.isDelivered ? "Delivered at " + order.deliveredAt : "Not Delivered."}
            </div>
          </div>
          <div>
            <h3>Payment</h3>
            <div>
              Payment Method: {order.payment.paymentMethod}
            </div>
            <div>
              {"Paid"}
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
                order.orderItems.length === 0 ?
                  <div>
                    Cart is empty
          </div>
                  :
                  order.orderItems.map(item =>
                    <li key={item._id}>
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
              <h3>Order Summary</h3>
            </li>
            <li>
              <div>Items</div>
              <div>${order.itemsPrice}</div>
            </li>
            <li>
              <div>Shipping</div>
              <div>${order.shippingPrice}</div>
            </li>
            <li>
              <div>Tax</div>
              <div>${order.taxPrice}</div>
            </li>
            <li>
              <div>Order Total</div>
              <div>${order.totalPrice}</div>
            </li>
          </ul>



        </div>

      </div>
    </div>

}

export default OrderScreen;