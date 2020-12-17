import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Account from './components/Account';
import Home from './components/Home';
import Landing from './components/Landing';
import Navigation from './components/Navigation';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import { AuthProvider } from './firebase/Auth';
import PrivateRoute from './components/PrivateRoute';
import Products from './components/Products';
import ProductDetails from './components/ProductDetails';
import CartScreen from './components/CartScreen';
import ShippingScreen from './components/ShippingScreen';
import PaymentScreen from './components/PaymentScreen';
import PlaceOrderScreen from './components/PlaceOrderScreen';
import OrderScreen from './components/OrderScreen';


const App = () => {
    return (
        <AuthProvider>
            <Router>
                <div className="App">
                    <header className="App-header">
                        <Navigation />
                    </header>
                </div>
                <Route exact path="/" component={Home} />
                <PrivateRoute path="/home" component={Home} />
                <PrivateRoute path="/account" component={Account} />
                <Route path="/signin" component={SignIn} />
                <Route path="/signup" component={SignUp} />
                <PrivateRoute exact path='/products/clothes' component={Products} />
                <PrivateRoute path="/order/:id" component={OrderScreen} />
                <PrivateRoute exact path='/products/electronics' component={Products} />
                <PrivateRoute exact path='/products/groceries' component={Products} />
                <PrivateRoute path="/placeorder" component={PlaceOrderScreen} />
                <PrivateRoute path="/payment" component={PaymentScreen} />
                <PrivateRoute path="/shipping" component={ShippingScreen} />
                <PrivateRoute exact path='/productDetails/:id' component={ProductDetails} />
                <PrivateRoute path="/cart/:id?" component={CartScreen} />
            </Router>
        </AuthProvider>
    );
};
export default App;