import React from 'react';

// import '../App.css';
// import './Products';

import '../App.css';

import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { AuthProvider } from '../firebase/Auth';


function Home() {
    return (


        <div className='App'>
            <header className='App-header'>
                <h1 >Welcome to Shop Assistant</h1>
                <Link className='showlink' to='/products/clothes'>
                    Clothes
                    </Link>
                <Link className='showlink' to='/products/electronics'>
                    Electronics
                    </Link>
                <Link className='showlink' to='/products/groceries'>
                    Groceries
                    </Link>
            </header>
            <br />
            <br />
            <div className='App-body'>


            </div>
        </div>


    );
}

export default Home;