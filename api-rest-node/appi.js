const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//Route
const productRouter = require('./api/route/product');
const orderRouter = require('./api/route/order');
const userRouter = require('./api/route/users');

//mongoose

mongoose.connect(`mongodb+srv://titi:${process.env.MONGO_ATLAS_PW}@cluster0-nilgl.mongodb.net/test?retryWrites=true`,{useNewUrlParser: true})



app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next)=>{
	res.header('Access-Controle-Allow-Origin', '*');
	res.header('Acces-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accep, Authorisation');
	if(req.method=='OPTIONS'){
		res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE');
	}
	next();
})

app.use('/order', orderRouter);
app.use('/product', productRouter);
app.use('/user', userRouter);

//gestion des erreurs
app.use((req, res, next)=>{
	const error = new Error('page non trouvez');
	error.status = 404;
	next(error);
})
app.use((error, req, res, next)=>{
	res.status(error.status || 500);
	res.json({
		erro: {
			message: error.message,
		}
	})
})

module.exports = app;