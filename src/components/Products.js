import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import { Card, CardActionArea, CardContent, CardMedia, Grid, Typography, makeStyles } from '@material-ui/core';
import md5 from 'blueimp-md5';
import '../App.css';
import noImage from '../img/download.jpeg';
import Search from './Search';
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
        justifyContent: 'center',
        paddingStart: '200px',
        paddingEnd: '200px',
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
    const [pageTitle, setPageTitle] = useState('');
    const [sortValue, setSortValue] = useState('asc');
    const [pageNum, setPagenum] = useState(0);
    const [pageCount, setPageCount] = useState(0);
    const [error, setError] = useState(undefined);
    let card = null;
    let previousLink = null;
    let nextLink = null;
    let publickey = process.env.REACT_APP_PUBLIC_KEY;
    let privatekey = process.env.REACT_APP_PRIVATE_KEY;
    const options = {
        headers: { "Access-Control-Allow-Origin": "*" }
    };
    useEffect(
        () => {

            console.log('search useEffect fired');
            async function fetchData() {
                let url = '';
                if (props.match.url == '/products/clothes') {
                    url = "http://127.0.0.1:5000/products/search?c=" + searchTerm;
                    setPageTitle('Clothes')
                }
                else if (props.match.url == '/products/electronics') {
                    url = "http://127.0.0.1:5000/products/search?e=" + searchTerm;
                    setPageTitle('Electronics')
                }
                else if (props.match.url == '/products/groceries') {
                    url = "http://127.0.0.1:5000/products/search?g=" + searchTerm;
                    setPageTitle('Groceries')
                }
                try {
                    console.log(`in fetch searchTerm: ${searchTerm}`);
                    const { data } = await axios.get(url);
                    console.log(url + '&c=' + searchTerm)
                    console.log("serachdata: " + JSON.stringify(data));
                    setSearchData(data);
                    setLoading(false);
                } catch (e) {
                    setLoading(false);
                    setError(e.message);
                    console.log(e);
                }
            }
            if (searchTerm) {
                fetchData();
            }
        },
        [searchTerm]
    );
    useEffect(
        () => {
            console.log("useEffect fired")
            async function fetchData() {
                // const url = 'http://127.0.0.1:5000/products';

                let url = '';
                if (props.match.url == '/products/clothes') {
                    url = "http://127.0.0.1:5000/products?category=clothes&sortByPrice=" + sortValue;
                    setPageTitle('Clothes')
                }
                else if (props.match.url == '/products/electronics') {
                    url = "http://127.0.0.1:5000/products?category=electronics&sortByPrice=" + sortValue;
                    setPageTitle('Electronics')
                }
                else if (props.match.url == '/products/groceries') {
                    url = "http://127.0.0.1:5000/products?category=groceries&sortByPrice=" + sortValue;
                    setPageTitle('Groceries')
                }
                console.log(url)
                const reg = new RegExp('^\\d+$');
                try {
                    const { data } = await axios.get(url, options);
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
        [sortValue]
    );
    const searchValue = async (value) => {
        setSearchTerm(value);
    };
    const sortBy = async (event) => {
        setSortValue(event.target.value);
    };
    const buildCard = (product) => {
        return (
            <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={product.id}>
                <Card className={classes.card} variant='outlined'>
                    <CardActionArea>
                        <Link to={`/productDetails/${product._id}`}>
                            <CardMedia
                                className={classes.media}
                                component='img'
                                src = {process.env.PUBLIC_URL + `/img/dst/${product.url}`}
                                title='product image'
                            />

                            <CardContent>
                                <Typography className={classes.titleHead} gutterBottom variant='h6' component='h2'>
                                    {product.name}
                                </Typography>
                                <Typography variant='body2' color='textSecondary' component='p'>
                                    {product.price ? "Price: " + product.price : 'Price Not available'}
                                </Typography>
                                <Typography variant='body2' color='textSecondary' component='p'>
                                    {product.gender ? "Gender: " + product.gender : ""}
                                </Typography>
                            </CardContent>
                        </Link>
                    </CardActionArea>
                </Card>
            </Grid>
        )
    };
    if (loading) {
        return (
            <div>
                <h2>Loading....</h2>
            </div>
        );
    } else if (!error) {
        if (searchTerm) {
            card =
                searchData && searchData.length > 0 ?
                    <Grid container className={classes.grid} spacing={5}> {searchData.map((product) => {
                        return buildCard(product._source);
                    })} </Grid> : <div>No data available</div>;
        } else {
            card =
                productsData ?
                    <Grid container className={classes.grid} spacing={5}> {productsData.map((product) => {
                        return buildCard(product);
                    })}  </Grid> : <div>No data available</div>;
        }
        return (
            <div>
                <br />
                <h1 >{pageTitle}</h1>
                <br />
                <div className={classes.horizontal}>
                    <Search searchValue={searchValue} label="Search Products" />
                    <div>
                        Sort by:
                        <select onChange={sortBy}>
                            <option value="asc">Price: Low to High</option>
                            <option value="desc">Price: High to Low</option>
                        </select>
                    </div>
                </div>
                <br />
                <br />
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