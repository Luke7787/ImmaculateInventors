const RefreshTokenSchema = require('./refreshTokens.tsx');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

let dbConnection: any;

function setConnection(newConn: any) {
	dbConnection = newConn;
	return dbConnection;
}

function getDbConnection() {
	if (!dbConnection) {
		dbConnection = mongoose.createConnection(
			'mongodb+srv://awu98:inventoryUsers98@inventory.pen6xvt.mongodb.net/myInventory?retryWrites=true&w=majority&appName=Inventory',
			{
				useNewUrlParser: true,
				useUnifiedTopology: true,
			}
		);
	}
	return dbConnection;
}

const uri =
	'mongodb+srv://awu98:inventoryUsers98@inventory.pen6xvt.mongodb.net/myInventory?retryWrites=true&w=majority&appName=Inventory';
mongoose.connect(uri, {
	useNewUrlParser: true, //useFindAndModify: false,
	useUnifiedTopology: true,
});

async function getRefreshToken(refreshToken: String) {
	const RefreshModel = getDbConnection().model(
		'RefreshToken',
		RefreshTokenSchema
	);
	const result = await RefreshModel.find({ refreshToken: refreshToken });
	return result[0];
}

async function addRefreshToken(refreshToken: String) {
	const RefreshModel = getDbConnection().model(
		'RefreshToken',
		RefreshTokenSchema
	);
	const tokenToAdd = new RefreshModel({ refreshToken: refreshToken });
	const addedToken = await tokenToAdd.save();
	return addedToken;
}

async function deleteRefreshToken(refreshToken: String) {
	const RefreshModel = getDbConnection().model(
		'RefreshToken',
		RefreshTokenSchema
	);
	const tokenToDelete = await RefreshModel.find({
		refreshToken: refreshToken,
	});
	await RefreshModel.findByIdAndDelete(tokenToDelete[0]._id);
}

exports.getRefreshToken = getRefreshToken;
exports.addRefreshToken = addRefreshToken;
exports.deleteRefreshToken = deleteRefreshToken;
exports.setConnection = setConnection;
exports.getDbConnection = getDbConnection;
export {};
