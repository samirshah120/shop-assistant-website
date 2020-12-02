const express = require('express');
const router = express.Router();
const data = require('../data');
const productsData = data.products;
router.get('/', async (req, res) => {
	try {
        let productsList = await productsData.getAllproducts();
        res.header("Access-Control-Allow-Origin", "*");
		res.json(productsList);
	} catch (e) {
		res.sendStatus(400).json({error : e});
	}
});
module.exports = router