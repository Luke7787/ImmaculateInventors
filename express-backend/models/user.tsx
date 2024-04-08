const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const Item = require('./item.tsx');

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
		},
		country: {
			type: String,
			required: true,
			trim: true,
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
	},
	{ collection: 'users_list' }
);

module.exports = UserSchema;
