const express = require('express');
const router = express.Router();
const data = require('../data');
const productsData = data.products;
const elasticSearch = require("../data/elasticSearch");
const redis = require('redis');
const bluebird = require('bluebird');
const client = redis.createClient();
bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);
router.get('/', async (req, res) => {
	await elasticSearch.ping(res)
	try {
		let sort = req.query.sortByPrice;
		let category = req.query.category;
		let productsList = null;
		let cacheForProductListExists = await client.getAsync(category+"_"+sort);
		if (cacheForProductListExists) {
		  productsList = JSON.parse(cacheForProductListExists)
		} else {
		 productsList = await productsData.getAllproducts(sort,category);
		await client.setAsync(category+"_"+sort, JSON.stringify(productsList));
		}
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
		let product = null
		let cacheForProduct = await client.getAsync(req.params.id);
		if (cacheForProduct) {
			product = JSON.parse(cacheForProduct)
		} else {
		product = await productsData.getProductById(req.params.id);
		await client.setAsync(req.params.id, JSON.stringify(product));
		}
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