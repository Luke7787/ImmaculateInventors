const express = require('express');
const cors = require('cors');
const userServices = require('./models/user-services.tsx');
const itemServices = require('./models/item-services.tsx');

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

const users = {
	users_list: [],
};

app.get('/', (req, res) => {
	res.send('Hello World!');
});

app.get('/users', async (req, res) => {
	let result;
	const username = req.query['username'];
	const password = req.query['password'];
	try {
		if (username && !password) {
			result = await userServices.findUserByUsername(username);
		} else {
			result = await userServices.getUsers(username, password);
		}
		if (result.length == 0) {
			return res.status(404).send('User not found');
		}
		return res.send({ users_list: result });
	} catch (error) {
		return res.status(500).send('An error occurred in the server.');
	}
});

app.get('/users/:username', async (req, res) => {
	const id = req.params['id'];
	const result = await userServices.findUserById(id);
	if (result === undefined || result === null)
		res.status(404).send('Resource not found.');
	else {
		res.send({ users_list: result });
	}
});

app.post('/users/', async (req, res) => {
	const user1 = req.body['username'];
	const userData = req.body.params;
	const user2 = await userServices.findUserByUsername(user1);
	if (user2.length > 0) {
		res.status(409).send('username already taken');
	}
	const savedUser = await userServices.addUser(userData);
	if (savedUser.error) {
		// Validation error
		res.status(400).send(savedUser.message);
	} else {
		res.status(201).send(savedUser);
	}
});

app.get('/uniqueUser/:username', async (req, res) => {
	const username = req.params.username;
	const result = await userServices.findUserByUsername(username);
	if (result.length > 0) res.status(409).send('Username already taken');
	else {
		res.status(200).send('Valid username');
	}
});

app.get('/uniqueUser/:username', async (req, res) => {
	const username = req.params.username;
	const result = await userServices.findUserByUsername(username);
	if (result.length > 0) res.status(409).send('Username already taken');
	else {
		res.status(200).send('Valid username');
	}
});

app.post('/items/', async (req, res) => {
	const item = req.body;

	const savedItem = await itemServices.addItem(item);
	if (savedItem) res.status(201).send(savedItem);
	else res.status(409).end();
});

app.patch('/itemToUser/', async (req, res) => {
	const uid = req.query['uid'];
	//const id = req.query["id"];
	const item = req.body;
	const savedItem = await itemServices.addItem(item);
	const id = savedItem._id;
	console.log(id);
	const user = await userServices.addItemToUser(uid, id);
	if (user) {
		res.status(201).send(user);
	} else res.status(409).end();
});

app.patch('/items/', async (req, res) => {
	const uid = req.query['uid'];
	const id = req.query['id'];
	const option = req.query['option']; // add or subtract from existing quantity
	const quantity = req.query['quantity']; // amount to increment or decrement by
	if (option === 'add' || option === 'sub') {
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

app.get('/items/', async (req, res) => {
	let result = null;
	const uid = req.query['uid'];
	const id = req.query['id'];
	const itemName = req.query['itemName'];
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

app.delete('/items/', async (req, res) => {
	const uid = req.query['uid'];
	const id = req.query['id'];
	const result = await userServices.deleteItemFromUser(uid, id);
	const result2 = await itemServices.deleteItem(id);
	res.status(201).send('item deleted');
});

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});

app.delete('/users/:id', async (req, res) => {
	const id = req.params['id'];
	if (await userServices.deleteUserById(id)) res.status(204).end();
	else res.status(404).send('Resource not found.');
});
