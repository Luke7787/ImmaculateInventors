const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const ItemSchema = new mongoose.Schema(
	{
		userId: {
			type: String,
			required: true,
			trim: true,
		},
		name: {
			type: String,
			required: true,
			trim: true,
		},
		quantity: {
			type: Number,
			required: true,
			trim: true,
		},
		note: {
			type: String,
			required: false,
			trim: true,
		},
	},
	{ collection: 'items' }
);

module.exports = ItemSchema;
export {};
