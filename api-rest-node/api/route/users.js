const express = require('express');
const router = express.Router();
const User = require('../../model/users');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');

router.post('/signup', (req, res, next)=>{
	User.find({email: req.body.email})
	.exec()
	.then( user =>{
		if( user.length >=1){
			res.status(409).json({
				message: 'exist',
				
			})
		} else {
			bcrypt.hash(req.body.password, 10, (error, hash)=>{
				if(error){
					return res.status(500).json({
						error: error,
					});
				} else{
					const user = new User({
						_id: new mongoose.Types.ObjectId(),
						email: req.body.email,
						password: hash
					});
					user.save()
					.then(resut =>{
						res.status(201).json({
							message: 'ok',
						})
					})
					.catch(err =>{
						res.status(500).json({
							message: 'pas crée',
							error: err,
						});
					});
				}
		});
		}
	})
})

router.post('/login', (req, res, next) => {
	User.find({email: req.body.email})
	.exec()
	.then( user => {
		if( user.length < 1){
			return res.status(401).json({
				message: 'user dont exist in database',
			})
		}
		bcrypt.compare(req.body.password, user[0].password, (err, result) =>{
			if(err){
				return res.status(401).json({
					message: 'auth failed',
					error: err
				})
			}
			if(result){
				const token = jsonwebtoken.sign({
					email: user[0].email,
					userId: user[0]._id,
				},
				process.env.JWT_KEY,
				{
					expiresIn: '1h',
				});
				return res.status(200).json({
					message:'sucessfull auth',
					token: token,
				});
			}else{
				return res.status(401).json({
					message: 'auth failed',
					error: err
				})
			}
		})
	})
	.catch( err => {
		res.status(500).json({
			message: 'pas crée',
			error: err,
		});
	});
})

router.delete('/:userId', (req, res, next) => {
	User.remove({_id: req.params.userId})
	.exec()
	.then(result => {
		res.status(200).json({
			message: 'user delete',
		})
	})
	.catch( err => {
		res.status(500).json({
			error: err,
		})
	})
})

module.exports = router;