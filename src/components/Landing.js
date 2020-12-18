import React from 'react';

import '../App.css';
import {makeStyles } from '@material-ui/core';
import bannerImg from '../img/landing.png';

const useStyles = makeStyles({
    banner: {
        height: '70%',
        width: '70%',
        backgroundColor: 'blue'
    }
});
function Landing() {
    const classes = useStyles();
    return (
        <div>
            <h1 >Welcome to Shop Assistant</h1>
            <img src={bannerImg} alt="banner image" className={classes.banner} ></img>
        </div>

    );
}

export default Landing;