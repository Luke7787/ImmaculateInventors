const express = require('express');
const cors = require('cors');
const userServices = require('./models/user-services.tsx');
const itemServices = require('./models/item-services.tsx');
// const upload = require('./models/aws-config');
const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const { S3Client } = require('@aws-sdk/client-s3');
const dotenv = require('dotenv');
dotenv.config();
const bcrypt = require('bcrypt');

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

const users = {
	users_list: [],
};

app.listen(port || process.env.PORT, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});

// test
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

app.get('/users/:username', async (req: any, res: any) => {
	const id = req.params['id'];
	//const conn = await userServices.getDbConnection();
	const result = await userServices.findUserById(id);
	if (result === undefined || result === null)
		res.status(404).send('Resource not found.');
	else {
		res.send({ users_list: result });
	}
});

app.post('/users/', async (req: any, res: any) => {
	const user1 = req.body['username'];
	const userData = req.body;
	const user2 = await userServices.findUserByUsername(user1);
	if (user2.length > 0) {
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

app.get('/uniqueUser/:username', async (req: any, res: any) => {
	const username = req.params.username;
	//const conn = await userServices.getDbConnection();
	const result = await userServices.findUserByUsername(username);
	if (result.length > 0) res.status(409).send('Username already taken');
	else {
		res.status(200).send('Valid username');
	}
});

app.post('/items/', async (req: any, res: any) => {
	const item = req.body;
	const savedItem = await itemServices.addItem(item);
	if (savedItem) res.status(201).send(savedItem);
	else res.status(409).end();
});

app.patch('/itemToUser/', async (req: any, res: any) => {
	const item = req.body;
	const uid = item.userId;
	const savedItem = await itemServices.addItem(item);
	const id = savedItem._id;
	const user = await userServices.addItemToUser(uid, id);
	if (user) {
		res.status(201).send(user);
	} else res.status(409).end();
});

app.patch('/items/', async (req: any, res: any) => {
	const uid = req.query['uid'];
	const id = req.query['id'];
	const option = req.query['option']; // add or subtract from existing quantity
	const quantity = req.query['quantity']; // amount to increment or decrement by
	if (option === 'add' || option === 'sub') {
		//const conn = await userServices.getDbConnection();
		const result = await userServices.updateItemFromUser(
			uid,
			id,
			quantity,
			option
		);
		if (result) {
			res.status(201).send(result);
		} else {
			res.status(404).send('function: updateItemFromUser');
		}
	} else {
		res.status(404).send('Wrong Option! (Use add or subtract)');
	}
});

app.get('/items/', async (req: any, res: any) => {
	let result = null;
	const uid = req.query['uid'];
	const id = req.query['id'];
	const itemName = req.query['itemName'];
	//const conn = await userServices.getDbConnection();
	if (!id && !uid && !itemName) {
		result = await itemServices.getItems(); // gets all items from item database
	} else if (uid && !id) {
		result = await itemServices.getItemsFromUser(uid); // gets items specific to the user
	} else if (!uid && !id && itemName) {
		result = await itemServices.findItemByName(itemName); // get items with the name
	} else {
		result = await userServices.getItemFromUser(uid, id); // get a specific item from a user
	}
	if (result) {
		res.status(201).send(result);
	} else {
		res.status(404).send('item not found');
	}
});

app.delete('/items/', async (req: any, res: any) => {
	const id = req.query['id'];
	const result2 = await itemServices.deleteItem(id);
	res.status(201).send(result2);
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
	//const conn = await itemServices.getDbConnection();
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

app.get('/folders/', async (req: any, res: any) => {
	const userId = req.query['userId'];
	if (!userId) {
		res.status(400).send('error: userid not provided');
	}
	try {
		const c = await userServices.getFolders(userId);
		res.status(200).send(c);
	} catch (error) {
		console.log('error', error);
		res.status(400).send('error');
	}
});

app.post('/folders/', async (req: any, res: any) => {
	// when making a folder return the id
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

app.delete('/folders/', async (req: any, res: any) => {
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

app.patch('/folders/', async (req: any, res: any) => {
	const option = req.query['option'];
	const folderName = req.query['folderName'];
	const itemId = req.query['itemId'];
	console.log(folderName);
	try {
		if (option === 'add') {
			const updatedFolder = await userServices.addItemToFolder(
				folderName,
				itemId
			);
			if (!updatedFolder) {
				return res.status(404).send('Folder not found');
			}
			res.send(updatedFolder);
		} else if (option === 'delete') {
			const updatedFolder = await userServices.deleteItemFromFolder(
				folderName,
				itemId
			);
			if (!updatedFolder) {
				return res.status(404).send('Folder not found');
			}
			res.send(updatedFolder);
		}
	} catch (error) {
		console.log(error);
		res.status(400).send('Error updating folder');
	}
});

app.patch('/folderName/', async (req: any, res: any) => {
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

app.get('/folderGet/', async (req: any, res: any) => {
	const folderId = req.query['folderId'];
	const items = await userServices.getFolderContents(folderId);
	res.status(201).send(items);
});

app.get('/sort/', async (req: any, res: any) => {
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

app.post('/login', async (req: any, res: any) => {
	const {username, password } = req.body;

	try{
		const users = await userServices.findUserByUsername(username);
		if (users.length === 0) {
			return res.status(404).send('User not found');
		}
		
		const user = users[0] //since findUserByUsername() returns an array
		
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch){
			return res.status(400).send('Incorrect username or password');
		}

		res.send('Login Successful!');
	}
	catch (error) {
		console.error(error);
		res.status(500).send('Server error');
	}

});