const express = require('express');
const router = express.Router();
const Order = require('../../model/order');
const mongoose = require('mongoose');
const Product = require('../../model/product');

router.get('/', (req, res, next)=>{
	const order = new Order({
		_id: new mongoose.Types.ObjectId(),
		quantity: req.param('quantity'),
		product: req.param('id')
	})
	order.save()
	.then(doc=>{
		res.status(200).json({
			message:'ok',
			order: doc
		})
	})
	.catch(err=>{
		res.status(200).json({
			message:'pas enregistré',
			error: err
		})
	})
})
router.get('/:orderId', (req, res, next)=>{
	Order.find()
	.select('product quantity _id')
	.exec()
	.then(doc=>{
		res.status(200).json({
			message: 'ok',
			order: doc
		})
	})
	.catch(err=>{
		res.status(200).json({
			message: 'error',
			error: err
		})
	});
})

router.post('/', (req, res, next)=>{
	res.status(200).json({
		message: 'order get request',
	})
})
router.post('/:orderId', (req, res, next)=>{
	res.status(200).json({
		message: 'delete an order',
		id: req.params.orderId
	})
})

module.exports = router;