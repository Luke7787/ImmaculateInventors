//const mongoose = require('mongoose');
import mongoose from 'mongoose';
//import mongoose from 'mongoose';
import {Schema, model, models}  from "mongoose";
const ObjectId = mongoose.Types.ObjectId;
//const Item = require('./item.tsx');
const bcryptjs = require('bcryptjs');


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
    if (!this.isModified("password")) {
        return next()
    }
	const salt = await bcryptjs.genSalt(10);
    this.password = bcryptjs.hash(this.password, salt);
})

const User = mongoose.model("User", UserSchema);

module.exports = User;
