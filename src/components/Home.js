import React from 'react';

// import '../App.css';
// import './Products';

import '../App.css';
import bannerImg from '../img/banner.png';
import {makeStyles } from '@material-ui/core';

import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { AuthProvider } from '../firebase/Auth';
const useStyles = makeStyles({
    banner: {
        height: '80%',
        width: '80%',
        backgroundColor: 'blue'
    }
});

function Home() {
    const classes = useStyles();
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
            <div>
			<p>
				Start by clicking shopping categories button above
			</p>
            <img src={bannerImg} alt="banner image" className={classes.banner} ></img>
		
		</div>

            </div>
        </div>


    );
}

export default Home;