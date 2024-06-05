const express = require('express');
const cors = require('cors');
const userServices = require('./models/user-services.tsx');
const itemServices = require('./models/item-services.tsx');
const refreshTokenServices = require('./models/refreshTokens-services');
// const upload = require('./models/aws-config');
const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const { S3Client } = require('@aws-sdk/client-s3');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');
dotenv.config();

const s3client = new S3Client({
	region: process.env.AWS_REGION,
	credentials: {
		accessKeyId: process.env.AWS_ACCESS_KEY_ID,
		secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
	},
});

// AWS.config.update({
//   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//   region: process.env.AWS_REGION,
// });

const s3 = new AWS.S3();

// const storage = multer.memoryStorage();
const s3Storage = multerS3({
	s3: s3client, // s3 instance
	bucket: process.env.S3_BUCKET_NAME, // change it as per your project requirement
	// ContentType : 'image/jpeg',
	acl: 'public-read', // storage access type - makes it so that everyone can view it
	metadata: (req: any, file: any, cb: any) => {
		cb(null, { fieldname: file.fieldname });
	},
	key: (req: any, file: any, cb: any) => {
		const fileName =
			Date.now() + '_' + file.fieldname + '_' + file.originalname;
		console.log(fileName);
		cb(null, fileName);
	},
	contentType: multerS3.AUTO_CONTENT_TYPE, // Automatically sets the ContentType based on the file type
});
const uploadImage = multer({ storage: s3Storage });

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());
app.use(express.json());

const users = {
	users_list: [],
};

app.listen(process.env.PORT || port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});

//test
app.get('/', async (req: any, res: any) => {
	res.send('Hello World!');
});

app.get('/users', async (req: any, res: any) => {
	try {
		const { username, password } = req.query;
		console.log(username, password);
		if (username && password) {
			const user = await userServices.findUserByUserAndPass(username, password);
			if (user.length == 0) {
				return res.status(404).send('User not found');
			}
			return res.send({ user });
		} else {
			const users = await userServices.getUsers();
			return res.send({ users });
		}
	} catch (error) {
		return res.status(500).send('An error occurred in the server.');
	}
});

app.post('/checkUser', async (req: any, res: any) => {
	const { username, password } = req.body;

	try {
		const user = await userServices.findUserByUsername(username);
		if (!user) {
			return res.status(404).send('User not found');
		}
		//since findUserByUsername() returns an array

		console.log('User: ', user); //debug
		console.log('Password: ', password); //debug
		console.log('user.password: ', user.password); //debug

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return res.status(404).send('Incorrect username or password');
		}

		res.status(200).send({ user });
	} catch (error) {
		console.error(error);
		res.status(500).send('Server error');
	}
});

// register a user (creates a new user to the database)
app.post('/register/', async (req: any, res: any) => {
	//previously was /users/
	const user1 = req.body['username'];
	const userData = req.body;
	const user2 = await userServices.findUserByUsername(user1);
	if (user2) {
		res.status(409).send('username already taken');
	} else {
		const savedUser = await userServices.addUser(userData);
		if (savedUser.error) {
			// Validation error
			res.status(400).send(savedUser.message);
		} else {
			res.status(201).send(savedUser);
		}
	}
});

// add item
app.post('/items/', authenticateToken, async (req: any, res: any) => {
	const item = req.body;
	const savedItem = await itemServices.addItem(item);
	if (savedItem) res.status(201).send(savedItem);
	else res.status(409).end();
});

// delete item
app.delete('/items/', authenticateToken, async (req: any, res: any) => {
	const id = req.query['id'];
	const result2 = await itemServices.deleteItem(id);
	res.status(201).send(result2);
});

// add or subtract number of items
app.patch('/items/', authenticateToken, async (req: any, res: any) => {
	let result;
	const id = req.query['id'];
	const option = req.query['option'];
	const quantity = req.query['quantity'];
	if (option === 'add') {
		result = await itemServices.incQuantity(id, quantity);
	} else if (option === 'sub') {
		result = await itemServices.decQuantity(id, quantity);
	}
	if (!result) res.sendStatus(404);
	res.status(201).send(result);
});

// gets items from a user
app.get('/items/', authenticateToken, async (req: any, res: any) => {
	let result = null;
	const uid = req.query['uid'];
	const id = req.query['id'];
	const itemName = req.query['itemName'];
	if (uid && !id && !itemName) {
		// get all items from a user
		result = await itemServices.getItemsFromUser(uid);
	} else if (uid && !id && itemName) {
		// get an item by name
		result = await itemServices.findItemByName(itemName, uid);
	} else if (id && !itemName) {
		// get an item by id
		result = await itemServices.findItemById(id);
	}
	if (result) {
		res.status(201).send(result);
	} else {
		res.status(404).send('item not found');
	}
});

app.delete('/users/:id', async (req: any, res: any) => {
	const id = req.params['id'];
	if (await userServices.deleteUserById(id)) {
		res.status(204).end();
	} else {
		res.status(404).send('Resource not found.');
	}
});

app.patch('/items/:id', async (req: any, res: any) => {
	const { id } = req.params;
	const updates = req.body; //gets the entire item body so this can be used to update any field ("note": "Updated note" -- or -- "quantity": 4)
	try {
		const updatedItem = await itemServices.updateItem(id, updates);
		if (!updatedItem) {
			return res.status(404).send('Item not found'); //error check if the item does not exist
		}
		res.send(updatedItem);
	} catch (error) {
		console.error(error);
		res.status(400).send('Error updating item');
	}
});

// delete a user
app.delete('/users/:id', async (req: any, res: any) => {
	const id = req.params['id'];
	if (await userServices.deleteUserById(id)) {
		res.status(204).end();
	} else {
		res.status(404).send('Resource not found.');
	}
});

app.post(
	'/upload',
	uploadImage.single('imageFile'),
	async (req: any, res: any) => {
		if (!req.file) {
			return res.status(400).send('Please upload a file.');
		}
		console.log('upload req', JSON.stringify(req.file));
		try {
			// `req.file.buffer` contains the file data
			const fileName = `uploads/${Date.now().toString()}-${
				req.file.originalname
			}`;
			// await uploadImage(req.file.buffer, fileName);

			// // Construct the file URL or use the response from `uploadFile` as needed
			const fileUrl = `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${req.file.key}`;

			console.log(
				'Success!',
				'fileUrl: ',
				`https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`
			);
			res.status(201).send({
				message: 'File uploaded successfully',
				fileUrl: fileUrl,
			});
		} catch (error) {
			console.error(error);
			res.status(500).send('Error uploading file to S3.');
		}
	}
);

// returns a list of folders associated with the user
app.get('/folders/', authenticateToken, async (req: any, res: any) => {
	const userId = req.query['userId'];
	try {
		const c = await userServices.getFolders(userId);
		res.status(200).send(c);
	} catch (error) {
		res.status(400).send('error');
	}
});

// returns a list of items inside of a folder
app.get('/folderGet/', authenticateToken, async (req: any, res: any) => {
	const folderId = req.query['folderId'];
	const items = await userServices.getFolderContents(folderId);
	res.status(201).send(items);
});

// adds a folder to the user and returns the id of the folder
app.post('/folders/', authenticateToken, async (req: any, res: any) => {
	const folderName = req.query['folderName'];
	const userId = req.query['userId'];
	const imageUrl = req.query['imageUrl'];
	try {
		const folderId = await userServices.addFolder(userId, folderName, imageUrl);
		if (!folderId) {
			return res.status(404).send('User not found');
		}
		res.send(folderId);
	} catch (error) {
		console.log(error);
		res.status(400).send('Error updating user');
	}
});

// deletes a folder
app.delete('/folders/', authenticateToken, async (req: any, res: any) => {
	const folderName = req.query['folderName'];
	const userId = req.query['userId'];
	try {
		const updatedUser = await userServices.deleteFolder(userId, folderName);
		if (!updatedUser) {
			return res.status(404).send('User not found');
		}
		res.send(updatedUser);
	} catch (error) {
		console.log(error);
		res.status(400).send('Error updating user');
	}
});

// change the name of a folder
app.patch('/folderName/', authenticateToken, async (req: any, res: any) => {
	const folderId = req.query['folderId'];
	const newFolderName = req.query['newName'];
	try {
		const updatedFolder = await userServices.updateFolderName(
			folderId,
			newFolderName
		);
		res.status(201).send(updatedFolder);
	} catch (error) {
		console.log(error);
		res.status(400).send('Error updating folder');
	}
});

app.get('/sort/', authenticateToken, async (req: any, res: any) => {
	const folderId = req.query['folderId'];
	const option = req.query['option'];
	let items;
	if (option === 'ascQ') {
		items = await userServices.sortByQuantityAsc(folderId);
	} else if (option === 'desQ') {
		items = await userServices.sortByQuantityDes(folderId);
	} else if (option === 'ascD') {
		items = await userServices.sortByDateAsc(folderId);
	} else if (option === 'desD') {
		items = await userServices.sortByDateDes(folderId);
	} else if (option == 'ascN') {
		items = await userServices.sortByNameAsc(folderId);
	} else if (option == 'desN') {
		items = await userServices.sortByNameDes(folderId);
	}
	res.status(201).send(items);
});

// User Authentication
app.get('/posts', authenticateToken, async (req: any, res: any) => {
	const user = await userServices.findUserByUsername(req.user.username);
	res.json(user);
});

app.post('/token', async (req: any, res: any) => {
	const refreshToken = req.body.token;
	if (refreshToken == null) return res.sendStatus(401);
	if (!(await refreshTokenServices.getRefreshToken(refreshToken)))
		return res.sendStatus(403);
	jwt.verify(
		refreshToken,
		process.env.REFRESH_TOKEN_SECRET,
		(err: any, user: any) => {
			if (err) return res.sendStatus(403);
			const user2 = {
				username: user.username,
				password: user.password,
			};
			const accessToken = generateAccessToken(user2);
			res.json({ accessToken: accessToken });
		}
	);
});

app.delete('/logout', async (req: any, res: any) => {
	await refreshTokenServices.deleteRefreshToken(req.body.token);
	res.sendStatus(204);
});

app.post('/login', async (req: any, res: any) => {
	const username = req.body.username;
	const password = req.body.password;
	const user = await userServices.findUserByUsername(username);
	if (user == null) {
		return res.status(400).send('Cannot find user');
	}
	try {
		const user2 = {
			username: username,
			password: password,
		};
		const accessToken = generateAccessToken(user2);
		const refreshToken = jwt.sign(user2, process.env.REFRESH_TOKEN_SECRET);
		await refreshTokenServices.addRefreshToken(refreshToken);
		res.json({ accessToken: accessToken, refreshToken: refreshToken });
	} catch {
		res.status(500).send();
	}
});

function authenticateToken(req: any, res: any, next: any) {
	const authHeader = req.headers['authorization'];
	const token = authHeader && authHeader.split(' ')[1];
	if (token == null) return res.sendStatus(401);
	jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err: any, user: any) => {
		if (err) return res.sendStatus(403);
		req.user = user;
		next();
	});
}

function generateAccessToken(user: any) {
	return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30m' });
}
