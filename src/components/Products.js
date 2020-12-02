import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import { Card, CardActionArea, CardContent, CardMedia, Grid, Typography, makeStyles } from '@material-ui/core';
import md5 from 'blueimp-md5';
import '../App.css';
const useStyles = makeStyles({
    card: {
        maxWidth: 250,
        height: 'auto',
        marginLeft: 'auto',
        marginRight: 'auto',
        borderRadius: 5,
        border: '1px solid #1e8678',
        boxShadow: '0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);'
    },
    titleHead: {
        borderBottom: '1px solid #1e8678',
        fontWeight: 'bold'
    },
    grid: {
        flexGrow: 1,
        flexDirection: 'row'
    },
    media: {
        height: '100%',
        width: '100%'
    },
    button: {
        color: '#1e8678',
        fontWeight: 'bold',
        fontSize: 12
    },
    horizontal: {
        display: 'flex',
        justifyContent: 'space-around'
    },
    active: {
        color: 'blue',
    }
});
const Products = (props) => {
    const regex = /(<([^>]+)>)/gi;
    const classes = useStyles();
    const [loading, setLoading] = useState(true);
    const [searchData, setSearchData] = useState(undefined);
    const [productsData, setProductsData] = useState(undefined);
    const [searchTerm, setSearchTerm] = useState('');
    const [pageNum, setPagenum] = useState(0);
    const [pageCount, setPageCount] = useState(0);
    const [error, setError] = useState(undefined);
    let card = null;
    let previousLink = null;
    let nextLink = null;
    let publickey = process.env.REACT_APP_PUBLIC_KEY;
    let privatekey = process.env.REACT_APP_PRIVATE_KEY;
    const options = {
        headers: {"Access-Control-Allow-Origin": "*"}
       };
    useEffect(
        () => {
            console.log("useEffect fired")
            async function fetchData() {
                const url = 'http://127.0.0.1:5000/products';
                console.log(url)
                const reg = new RegExp('^\\d+$');
                try {
                    const { data } = await axios.get(url,options);
                    setProductsData(data);
                    setError(undefined);
                    setLoading(false);
                    console.log(data);
                } catch (e) {
                    setLoading(false);
                    setError(e.message);
                    console.log(e);
                }
            }
            fetchData();
        },
        []
    );
    const buildCard = (product) => {
        return (
            <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={product.id}>
                <Card className={classes.card} variant='outlined'>
                    <CardActionArea>
                        <CardContent>
                            <Typography className={classes.titleHead} gutterBottom variant='h6' component='h2'>
                                {product.name}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Grid>
        );
    };
    if (loading) {
        return (
            <div>
                <h2>Loading....</h2>
            </div>
        );
    } else if (!error) {
        card =
            productsData ?
                <Grid container className={classes.grid} spacing={5}> {productsData.map((product) => {
                    return buildCard(product);
                })}  </Grid> : <div>No data available</div>;
        return (
            <div>
                {card}
            </div>
        );
    }
    else {
        return (

            <div>{error}</div>

        );
    }
};

export default Products;