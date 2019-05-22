const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
	_id: mongoose.Schema.Types.ObjectId,
	email:{ 
		type: String, 
		required: true,
		unique: true,
		match: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	},
	password: {type: String, required: true},
});

const User = mongoose.model('User', userSchema);
module.exports = User;