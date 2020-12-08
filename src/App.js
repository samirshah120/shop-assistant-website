import React from 'react';
import './App.css';
import Products from './components/Products';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
const App = () => {
    return (
        <Router>
            <div className='App'>
                <header className='App-header'>
                    <h1 >Welcome to Shop Assistant</h1>
                    <Link className='showlink'  to='/products/clothes'>
                    Clothes
                    </Link>
                    <Link className='showlink' to='/products/electronics'>
                    Electronics
                    </Link>
                    <Link  className='showlink' to='/products/groceries'>
                    Groceries
                    </Link>
                </header>
                <br />
                <br />
                <div className='App-body'>
                    <Route exact path='/products/clothes' component={Products} />
                    <Route exact path='/products/electronics' component={Products} />
                    <Route exact path='/products/groceries' component={Products} />
                </div>
            </div>
        </Router>
    );
};
export default App;