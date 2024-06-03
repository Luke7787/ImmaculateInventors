import mongoose from 'mongoose';

const RefreshTokenSchema = new mongoose.Schema(
	{
		refreshToken: {
			type: String,
		},
	},
	{ collection: 'refreshtokens' }
);

const RefreshToken = mongoose.model('RefreshToken', RefreshTokenSchema);

module.exports = RefreshToken;
module.exports = RefreshTokenSchema;
