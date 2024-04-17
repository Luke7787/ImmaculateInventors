import mongoose from 'mongoose';

const FolderSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
		},
		userId: {
			type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
		},
		items: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Item'
        }]
	},
	{ collection: 'folders' }
);

const Folder = mongoose.model("Folder", FolderSchema);

module.exports = Folder;
