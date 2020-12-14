const express = require('express');
const router = express.Router();
const data = require('../data');
const productsData = data.products;
const elasticSearch = require("../data/elasticSearch");
router.get('/', async (req, res) => {
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
router.get('/productDetails/:id', async (req, res) => {
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
	let query = null;
	let index = null;
	if(req.query.c){
		query = req.query.c;
		index = 'clothes_index';
	}
	else if(req.query.e){
		query = req.query.e;
		index = 'electronics_index';
	}
	else if(req.query.g){
		query = req.query.g;
		index = 'groceries_index';
	}
	try {
		// await elasticSearch.ping()
		let body = {
			query: {
				match_phrase_prefix: {
				name: query,

			  }
			}
		  }
	let productsList  = await productsData.searchProduct(body, res, index);
	res.json(productsList);
	} catch (e) {
		res.status(400).json({error : e});
	}
});
module.exports = router