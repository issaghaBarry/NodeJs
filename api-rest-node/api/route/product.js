const express = require('express');
const router = express.Router();
const Product = require('../../model/product');
const mongoose = require('mongoose');
const checkAuth = require('../../midleware/check-auth');

router.get('/', (req, res, next)=>{
	const product = new Product({
		_id: new mongoose.Types.ObjectId(),
		name: req.param('name'),
		price: req.param('price')
	})
	product.save()
	.then(res=>{
		console.log(res);
	})
	.catch(err=>{
		console.log(err);
	})
	res.status(200).json({
		message: 'get request',
		product: product,
	})
});
router.get('/:productId',checkAuth, (req, res, next)=>{
	const id = req.params.productId;
	Product.findById(id)
	.exec()
	.then(doc=>{
		console.log(doc);
		res.status(200).json(doc);
	})
	.catch(err=>{
		console.log(err);
		res.status(500).json({err: err})
	})
})
router.post('/', (req, res, next)=>{
	const product = {
		name: req.body.name,
		price: req.body.price
	}
	res.status(200).json({
		message: 'post request',
		product: product
	})
})
router.post('/:productId', (req, res, next)=>{

})
module.exports = router;