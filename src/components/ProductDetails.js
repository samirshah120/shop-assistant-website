import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import noImage from '../img/download.jpeg';
import { makeStyles, Card, CardContent, CardMedia, Typography, CardHeader,Button,Select,MenuItem } from '@material-ui/core';
import '../App.css';
import { AuthContext } from '../firebase/Auth';
import firebase from 'firebase/app'
import 'firebase/auth';

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

function ProductDetails(props) {
    const [productData, setproductData] = useState(undefined);
    const [count, setQty] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(undefined);
    const [userInfo, setUserInfo] = useState(undefined);
    const classes = useStyles();


    const options = {
        headers: {"Access-Control-Allow-Origin": "*"}
       };
    useEffect(
        () => {
            console.log("useEffect fired")
            async function fetchData() {
                const url = 'http://127.0.0.1:5000/products/ProductDetails/' + props.match.params.id;
                console.log(url)
                // const reg = new RegExp('^\\d+$');
                try {
                    const { data } = await axios.get(url);
                    setproductData(data);
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
        [props.match.params.id]
    );

    firebase.auth().onAuthStateChanged((user) => {
        
        if (user) {
            setUserInfo(user.uid);
            // User logged in already or has just logged in.
            console.log("User has logged in and userid is")
            console.log(user.uid);
        } else {
            // User not logged in or has just logged out.
            console.log("User not logged in")
        }
    });


/*     const handleAddToCart = async() => {
        console.log("inside handleaddcart");
        const url2 = `http://127.0.0.1:5000/products/addtocart/${productData._id}/${userInfo}`;
                try{
                const newitem= await axios.post(url2,options);
                if(newitem)
            alert("Product added to cart");
            else
            alert("Product add failed");
        } catch (e) {
            setError(e.message);
            console.log(e);
        }
      };
 */
      const handleAddToCart = async () => {
        props.history.push('/cart/' + props.match.params.id + '?qty=' + count);
      };
/*       const handleAddToWishlist = async () => {
        console.log("inside handleaddcart");
        //const baseurl = "http://127.0.0.1:5000/products/search";
        const url2 = `http://127.0.0.1:5000/products/addtowishlist/${productData._id}/${userInfo}`;
                try{
                const newitem= await axios.post(url2,options);
                if(newitem)
            alert("Product added to cart");
            else
            alert("Product add failed");
        } catch (e) {
            setError(e.message);
            console.log(e);
        }
      }; */

    if (loading) {
        return (
            <div>
                <h2>Loading....</h2>
            </div>
        );
    }
    else if (error) {
        return (
            <div>
                <h2>{error}</h2>
            </div>
        );
    }
    else if (!productData) {
        return (
            <div>
                <h2>No Data Found....</h2>
            </div>
        );
    }
    else {
        let summary = ""
        if (productData && productData.details) {
            summary = productData.details;
        } else {
            summary = 'No Description';
        }

        return (
            <div>
 <Card className={classes.card} variant='outlined'>
                <CardHeader className={classes.titleHead} title={productData.name} />
                <CardMedia
                    className={classes.media}
                    component='img'
                    src = {process.env.PUBLIC_URL + `/img/dst/${productData.url}`}
                    title='show image'
                />

                <CardContent>
                    <Typography variant='body2' color='textSecondary' component='p'>
                        {productData.price ? "Price: " + productData.price : 'Price Not available'}
                    </Typography>
                    <Typography variant='body2' color='textSecondary' component='p'>
                        {productData.gender ? "Gender: " + productData.gender : ""}
                    </Typography>
                    <Typography variant='body2' color='textSecondary' component='div'>
                        <div>
                            <div>
                                <div className='title'>Summary:</div>
                                <div>{summary}</div>
                            </div>
                        </div>
                    </Typography>
                    <Typography variant='body2' color='textSecondary' component='p'>
                    
        
                    </Typography>
                </CardContent>
            </Card>
                    {/* <Button variant="contained" color="primary" onClick={() => handleAddToCart(productData._id)}>
                        Add to Cart
                        </Button>
                        <Button variant="contained" color="primary" onClick={() => handleAddToWishlist(productData._id)}>
                        Add to Wishlist
                        </Button>  */}
                        
            <div className="">
              <ul>
                <li>
                  Status:InStock
                </li>
                <li>
                  Qty:{' '}
                  <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={count}
          onChange={(e) => {
            setQty(e.target.value);
          }}
          label="count" required
        >
          {/* <MenuItem value="">
            <em>None</em>
          </MenuItem> */}
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={3}>3</MenuItem>
        </Select>
                </li>
                <li>
                
                    <button
                      onClick={handleAddToCart}
                      className="button primary"
                    >
                      Add to Cart
                    </button>
                    {/* <button
                      onClick={handleAddToWishlist}
                      className="button primary"
                    >
                      Add to Wishlist
                    </button> */}
                </li>
              </ul>
            </div>
            </div>
            
            
        );
    }
}

export default ProductDetails;
