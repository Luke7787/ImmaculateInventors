const mongoose = require('mongoose');

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
				validator: function (value) {
					const passwordPolicy =
						/^(?=.*\d)(?=.*[?!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{10,}$/;
					return passwordPolicy.test(value);
				},
				message: (props) =>
					'Error: Password must be 10 characters long, have a special character, uppercase character, and a number',
			},
		},
	},
	{ collection: 'users_list' }
);

module.exports = UserSchema;
