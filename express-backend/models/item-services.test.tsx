const mongoose = require('mongoose');
const mockingoose = require('mockingoose');
const {
	getItems,
	getItemsFromUser,
	getDbConnection,
	deleteItem,
	addItem,
	findItemByName,
	updateItem,
} = require('./item-services.tsx');
const ItemModel = require('./item.tsx');

describe('item services', () => {
	
	beforeEach(async () => {

	})
	beforeAll(async () => {
		mongoose.set("debug", true);
		await mongoose.connect("mongodb+srv://awu98:inventoryUsers98@inventory.pen6xvt.mongodb.net/myInventory?retryWrites=true&w=majority&appName=Inventory", {
		useNewUrlParser: true, //useFindAndModify: false,
		useUnifiedTopology: true,
		});
	});
	afterAll(async () => {
		await mongoose.connection.close();
	});

	test('addItem', async () =>{
		const itemToAdd = { userId: 'dawglogsondog', name: 'Foot', quantity: 3 };
		mockingoose(ItemModel).toReturn(itemToAdd, 'save');
		const savedItem = await addItem(itemToAdd);
		expect(savedItem.name).toBe(itemToAdd.name);
		expect(savedItem.quantity).toBe(itemToAdd.quantity);
		expect(savedItem.userId).toBe(itemToAdd.userId);
	});





	test('getItemsFromUser returns items for a given user', async () => {
        const mockItems = [
            { userId: 'dawglogsondog', name: 'Foot', quantity: 3 },
            { userId: 'abcdeffasdf', name: 'Foot', quantity: 5 },
            { userId: 'abcdeffasdfasdf', name: 'Foot', quantity: 5 }
        ];

        mockingoose(ItemModel).toReturn(mockItems.filter(item => item.userId === 'dawglogsondog'), 'find');
        const items = await getItemsFromUser('dawglogsondog');

        expect(items[0].name).toBe('Foot');
        expect(items[0].quantity).toBe(3);
        expect(items[0].userId).toBe('dawglogsondog');
    });


    test('findItemByName finds the item by name', async () => {
		// Define mock data
		const mockItems = [
            { userId: 'dawglogsondog', name: 'Foot', quantity: 3 },
            { userId: 'abcdeffasdf', name: 'Foot', quantity: 5 },
            { userId: 'josh', name: 'toes', quantity: 5 }
		];
		
		// Setup mocking
		// mockingoose(ItemModel).toReturn(mockItems, 'find');
		ItemModel.find = jest.fn().mockResolvedValue(mockItems);
		
		// Execute function
		const items = await findItemByName("toes");
	
		console.log("items", items);
		// Assertions
		// expect(items.length).toBe(1);
		// if (items.length > 0) {
			expect(items[0].name).toBe('toes');
			expect(items[0].quantity).toBe(5);
			expect(items[0].userId).toBe('josh');
		// } else {
		// 	fail('No items found');
		// }
	});
	
	
	

    test('deleteItem deletes items', async () => {
        const mockItem = { userId: 'dawglogsondog', name: 'Toe', quantity: 3, _id: '65ef409a0336b57ddfbe9ce3' };
		mockingoose(ItemModel).toReturn(mockItem, 'findOneAndDelete');
        const items = await deleteItem('65ef409a0336b57ddfbe9ce3');

		console.log(items);
        expect(items.name).toBe('Toe');
        expect(items.quantity).toBe(3);
        expect(items.userId).toBe('dawglogsondog');
    });

    test('updateItem updates items', async () => {
        const updates = { quantity: 233, note: 'update worasdfasdfks', name: 'Hello' };
        const updatedItem = { ...updates, userId: 'dawglogsondog', _id: '65ef409a0336b57ddfbe9ce3' };
        mockingoose(ItemModel).toReturn(updatedItem, 'findOneAndUpdate');
        const res = await updateItem('65ef409a0336b57ddfbe9ce3', updates);

        expect(res.name).toBe('Hello');
        expect(res.quantity).toBe(233);
        expect(res.userId).toBe('dawglogsondog');
        expect(res.note).toBe('update worasdfasdfks');
    });

    test('getItems retrieves all items', async () => {
        const mockItems = [
            { name: 'Pentagon', quantity: 3 },
            { name: 'Foot', quantity: 5 }
        ];
        mockingoose(ItemModel).toReturn(mockItems, 'find');
        const items = await getItems();

        expect(items).toEqual(expect.arrayContaining(mockItems));
        // expect(items).toEqual(mockItems);
        // expect(items).toHaveLength(2);
        // expect(items[0].name).toBe('Pentagon');
        // expect(items[1].name).toBe('Foot');
    });
});

export {};
