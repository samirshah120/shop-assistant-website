
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

import '../App.css';
const useStyles = makeStyles({
  card: {
      maxWidth: 550,
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
  }
});

function ProductDetails(props) {
  const [productData, setproductData] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(undefined);
  const classes = useStyles();
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
  if (productData && productData.details) {
      summary = productData && productData.details.replace(regex, '');
  } else {
      summary = 'No Description';
  }

  return (
    <Card className={classes.card} variant='outlined'>
    <CardHeader className={classes.titleHead} title={productData.name} />
    <CardMedia
        className={classes.media}
        component='img'
        image={}
        title='show image'
    />

    <CardContent>
        <Typography variant='body2' color='textSecondary' component='div'>
            <div>
                <div>
                    <div className='title'>Summary:</div>
                    <div>{summary}</div>
                </div>
            </div>
            <Link to='/clothes'>Back...</Link>
        </Typography>
    </CardContent>
</Card>
  );
}
}

export default ProductDetails;