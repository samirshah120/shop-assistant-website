import React, { useState } from 'react';

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
  if (productData && productData.description) {
      summary = productData && productData.description.replace(regex, '');
  } else {
      summary = 'No Description';
  }

  return (
    <Card className={classes.card} variant='outlined'>
    <CardHeader className={classes.titleHead} title={productData.name} />
    <CardMedia
        className={classes.media}
        component='img'
        image={productData.thumbnail && productData.thumbnail.path && productData.thumbnail.extension ? productData.thumbnail.path + "." + productData.thumbnail.extension : noImage}
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
