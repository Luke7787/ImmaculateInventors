import mongoose from 'mongoose';

const ItemSchema = new mongoose.Schema(
	{
		userId: {
			type: String,
			required: false,
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
		date: {
			type: Date,
			required: true,
			default: Date.now, // Default to the current date and time
		},
		folder: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'Folder',
		},
		image: {
			type: String,
			required: true,
		},
	},
	{ collection: 'items' }
);

const Item = mongoose.model('Item', ItemSchema);

module.exports = Item;
