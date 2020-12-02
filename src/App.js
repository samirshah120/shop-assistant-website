import React from 'react';
import './App.css';
import Products from './components/Products';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
const App = () => {
    return (
        <Router>
            <div className='App'>
                <header className='App-header'>
                    <h1 >Welcome to Marvel</h1>
                    <Link  to='/products'>
                    Products
                    </Link>
                </header>
                <br />
                <br />
                <div>
                    <Route exact path='/products' component={Products} />
                </div>
            </div>
        </Router>
    );
};
export default App;