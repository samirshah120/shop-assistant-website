const express = require('express');
const router = express.Router();
const data = require('../data');
const productsData = data.products;
const elasticSearch = require("../data/elasticSearch");
router.get('/', async (req, res) => {
	console.log("hiii")
	await elasticSearch.ping(res)
	try {
		let sort = req.query.sortByPrice;
		let category = req.query.category;
		let productsList = await productsData.getAllproducts(sort,category);
		res.header("Access-Control-Allow-Origin", "*");
		if(productsList === null || productsList === undefined)
			res.status(404).json({ error: 'product not found' })
		else
			res.json(productsList);
	} catch (e) {
		res.sendStatus(400).json({error : e});
	}
});
router.get('productDetails/:id', async (req, res) => {
	try {
		let product = await productsData.getProductById(req.params.id);
		if(product === null || product === undefined)
			res.status(404).json({ error: 'product not found' })
		else
			res.json(product);
	} catch (e) {
		res.status(404).json({ error: 'product not found' });
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
		res.json(productsList);
	} catch (e) {
		res.status(400).json({error : e});
	}
});
module.exports = router