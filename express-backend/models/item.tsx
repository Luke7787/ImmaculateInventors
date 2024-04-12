import mongoose from 'mongoose';
//const Schema = mongoose.Schema;
//const ObjectId = Schema.ObjectId;

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

const Item = mongoose.model("Item", ItemSchema);

module.exports = Item;
