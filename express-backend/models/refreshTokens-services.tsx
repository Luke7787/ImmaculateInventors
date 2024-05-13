const RefreshTokenSchema = require('./refreshTokens.tsx');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const uri = process.env.MONGODB_URI;
mongoose.connect(uri, {
	useNewUrlParser: true, //useFindAndModify: false,
	useUnifiedTopology: true,
});

async function getRefreshToken(refreshToken : String) {
    const result = await RefreshTokenSchema.find({refreshToken : refreshToken});
    return result[0];
}

async function addRefreshToken(refreshToken: String) {
    const tokenToAdd = new RefreshTokenSchema({refreshToken : refreshToken});
	const addedToken = await tokenToAdd.save();
    return addedToken;
}

async function deleteRefreshToken(refreshToken: String) {
    const tokenToDelete = await RefreshTokenSchema.find({refreshToken : refreshToken});
    await RefreshTokenSchema.findByIdAndDelete(tokenToDelete[0]._id);
}

exports.getRefreshToken = getRefreshToken;
exports.addRefreshToken = addRefreshToken;
exports.deleteRefreshToken = deleteRefreshToken;
export {};
