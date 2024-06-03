//const mongoose = require('mongoose');
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
//import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;
//const Item = require('./item.tsx');

const UserSchema = new mongoose.Schema(
	{
		firstName: {
			type: String,
			required: true,
			trim: true,
		},
		lastName: {
			type: String,
			required: true,
			trim: true,
		},
		email: {
			type: String,
			required: true,
			trim: true,
			unique: true,
		},
		country: {
			type: String,
			required: true,
			trim: true,
			unique: true,
		},
		state: {
			type: String,
			required: true,
			trim: true,
		},
		city: {
			type: String,
			required: true,
			trim: true,
		},
		zipcode: {
			type: String,
			required: true,
			trim: true,
		},
		username: {
			type: String,
			required: true,
			trim: true,
		},
		password: {
			type: String,
			required: true,
			trim: true,
			validate: {
				validator: function (value: any) {
					const passwordPolicy = /^(?=.*\d)(?=.*[?!@#$%^&*])(?=.*[A-Z]).{10,}$/;
					return passwordPolicy.test(value);
				},
				message: (props: any) =>
					'Error: Password must be 10 characters long, have a special character, uppercase character, and a number',
			},
		},
		items: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Item',
				required: false,
				trim: true,
			},
		],
		folders: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Folder',
			},
		],
	},
	{ collection: 'users' }
);

UserSchema.pre('save', async function (next) {
	//pre() makes it so that this is done before the user gets saved to the database
	if (!this.isModified('password')) return next(); //only hash password if it is new or just modified (implementing for if we allow users to change their passsword in the future)

	try {
		const salt = await bcrypt.genSalt(10); //salting password
		const hashedPassword = await bcrypt.hash(this.password, salt); //hash the password with the salt
		this.password = hashedPassword; //replace the current password with the hashed password
		next(); //allows this item to be added to the database
	} catch (error) {
		next(error as mongoose.CallbackError); //pass the error to next() to handle it gracefully
	}
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
