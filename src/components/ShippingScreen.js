import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { saveShipping } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';
import { makeStyles, Card, CardContent, CardMedia, Typography, CardHeader,Button,Select,MenuItem,Divider } from '@material-ui/core';
import { saveShippingAddress } from '../actions/cartActions';
function ShippingScreen(props) {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');
  // const [address, setAddress] = useState(shippingAddress.address);
  // const [city, setCity] = useState(shippingAddress.city);
  // const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  // const [country, setCountry] = useState(shippingAddress.country);
 

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    props.history.push('/payment');
  }
  return <div>
    <CheckoutSteps step1 step2 ></CheckoutSteps>
    <div className="Shipform">
      <form onSubmit={submitHandler} >
        <div>
          <div>
            <h2>Shipping</h2>
          </div>
          <div>
            <label htmlFor="address">
              Address
          </label>
            <input type="text" name="address" id="address" value={address? address:""} onChange={(e) => setAddress(e.target.value)} required>
            </input>
          </div>
          <br></br>
          <div>
            <label htmlFor="city">
              City
          </label>
            <input type="text" name="city" id="city" value={city? city : ""} onChange={(e) => setCity(e.target.value)} required>
            </input>
          </div>
          <br></br>
          <div>
            <label htmlFor="postalCode">
              Postal Code
          </label>
          <div>
            <input type="number" min="0" max="99999" name="postalCode" id="postalCode" value={postalCode?postalCode:""} onChange={(e) => setPostalCode(e.target.value)} required>
            </input>
          </div>
          </div>
          <br></br>
          <div>
            <label htmlFor="country">
              Country
          </label>
            <input type="text" name="country" id="country" value={country?country:""} onChange={(e) => setCountry(e.target.value)} required>
            </input>
          </div>
          <br></br>
          <div>
            <button type="submit" className="button primary">Continue</button>
          </div>
        </div>
      </form>
    </div>
  </div>

}
export default ShippingScreen;