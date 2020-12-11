const express = require('express');
const router = express.Router();
const data = require('../data');
const productsData = data.products;
const elasticSearch = require("../data/elasticSearch");
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