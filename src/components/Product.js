import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import { Card, CardActionArea, CardContent, CardMedia, Grid, Typography, makeStyles } from '@material-ui/core';
import md5 from 'blueimp-md5';
import '../App.css';
import noImage from '../img/download.jpeg';
import Search from './Search';
import { AuthContext } from '../firebase/Auth';
import firebase from 'firebase/app'
import 'firebase/auth';
import Cookie from 'js-cookie';

const Product1 = (props) => {

    const [productId, setroductId] = useState(undefined);
    const [ProductInfo, setProductInfo] = useState(undefined);
    const [userInfo, setUserInfo] = useState(undefined);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(undefined);
    
    const options = {
        headers: {"Access-Control-Allow-Origin": "*"}
       };
//props.match.params.id
    useEffect(
        () => {

            setroductId(props.match.params.id);
            async function fetchData() {
                try {
                    console.log("inside product componenet");
                    let url='';
                    url=`http://127.0.0.1:5000/products/item/${props.match.params.id}`;
                    const { data } = await axios.get(url);
                    console.log("data"+data)
                    setProductInfo(data);
                    //console.log("product info"+ProductInfo.name);
                    setLoading(false);
                } catch (e) {
                    console.log(e);
                }
            }
            fetchData();
     }, [props.match.params.id]
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

    

    const handleAddToCart=async(pid) => {
        console.log("inside handleaddcart");
        const url2 = `http://127.0.0.1:5000/products/addtocart/${pid}/${userInfo}`;
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

      const handleAddToWishlist=async(pid) => {
        console.log("inside handleaddcart");
        //const baseurl = "http://127.0.0.1:5000/products/search";
        const url2 = `http://127.0.0.1:5000/products/addtowishlist/${pid}/${userInfo}`;
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
      
      
 return (
            <div>
<div>
{!ProductInfo ? (<p>Product not found</p> ):  (<div>
                <img width={150} height={150} alt = "noimage" src ="" />
                <button type="button"
                      onClick={() => handleAddToCart(ProductInfo._id)}
                      className="button primary"
                    >
                      Add to Cart
                    </button>
                    <button type="button"
                      onClick={() => handleAddToWishlist(ProductInfo._id)}
                      className="button primary"
                    >
                     Add to Wishlist
                    </button>

            </div>)}</div>
        </div >
    )
}
export default Product1;