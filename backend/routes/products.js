const express = require('express');
const router = express.Router();
const data = require('../data');
const productsData = data.products;
const elasticSearch = require("../data/elasticSearch");

/* firebase.auth().onAuthStateChanged((user) => {
        
	if (user) {
		
		// User logged in already or has just logged in.
		console.log("User has logged in and userid is")
		console.log(user.uid);
	} else {
		// User not logged in or has just logged out.
		console.log("User not logged in")
	}
});
 */

router.get('/', async (req, res) => {
	await elasticSearch.ping(res)
	try {
        let productsList = await productsData.getAllproducts();
        res.header("Access-Control-Allow-Origin", "*");
		res.json(productsList);
	} catch (e) {
		console.log(e);
		//res.sendStatus(400).json({error : e});
	}
});

//shweta add to cart route
router.post('/addtocart/:prodid/:userid', async (req, res) => {
	console.log("product routes");
	if(!req.params.prodid || !req.params.userid )
	throw "id's cannot be empty"
	try{
		let prodid=req.params.prodid;
		let userid=req.params.userid;
		let type1="cart";
		let cart= await productsData.addToCart(prodid,userid,type1);
		res.json(cart);
		} catch (e) {
			res.status(400).json({error : e});
		}
		});

		

		//shweta add to wishlist route by prod id and user id
router.post('/addtowishlist/:prodid/:userid', async (req, res) => {
	if(!req.params.prodid || !req.params.userid )
	throw "id's cannot be empty"

	console.log("product routes");
	try{
		let prodid=req.params.prodid;
		let userid=req.params.userid;
		let type="wish";
		let cart= await productsData.addToCart(prodid,userid,type);
		res.json(cart);
		} catch (e) {
			res.status(400).json({error : e});
		}
		});

		//shweta get all wish list item from cart collection by user id
router.get('/getwish/:userid', async (req, res) => {
	console.log("product routes");
	if(!req.params.userid)
	throw "id's cannot be empty"
	try{
		let userid=req.params.userid;
		let type1="wish";
		let allcart= await productsData.getallCart(userid,type1);
		res.json(allcart);
		} catch (e) {
			res.status(400).json({error : e});
		}
		});

				//shweta get all cart item from cart collection by uder id
router.get('/getcart/:userid', async (req, res) => {
	console.log("product routes");
	if(!req.params.userid)
	throw "id's cannot be empty"
	try{
		let userid=req.params.userid;
		let type1="cart";
		let allwish= await productsData.getallCart(userid,type1);
		res.json(allwish);
		} catch (e) {
			res.status(400).json({error : e});
		}
		});

//shweta get one item by prodid
		router.get('/item/:prodid', async (req, res) => {
			console.log("inside item id route");
			if(!req.params.prodid )
	throw "id's cannot be empty"
			try{
				let prodid=req.params.prodid;
				console.log("prodid+userid"+prodid);
		
				let getproduct= await productsData.getProductById(prodid);
				res.json(getproduct);
				} catch (e) {
					res.status(400).json({error : e});
				}
				});


router.get('/search', async (req, res) => {

	try {
		// await elasticSearch.ping()
		let body = {
			query: {
				match_phrase_prefix: {
				name: req.query.c,

			  }
			}
		  }
		// let body = {
		// 	"query": {
		// 		"regexp": {
		// 		  name: {
		// 			"value":  req.query.c+"[-._:A-Za-z0-9]*",
		// 			"flags": "ALL",
		// 			"case_insensitive": true,
		// 			"max_determinized_states": 10000,
		// 			"rewrite": "constant_score"
		// 		  }
		// 		}
		// }
	// }
        let productsList = await productsData.searchClothesProduct(body, res);
	} catch (e) {
		res.status(400).json({error : e});
	}
});
module.exports = router