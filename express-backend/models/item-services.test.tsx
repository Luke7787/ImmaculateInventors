const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const {
  getItems,
  getItemsFromUser,
  findItemByName,
  addItem,
  deleteItem,
  updateItem,
} = require('./item-services');
const ItemSchema = require('./item').schema;

describe('item services', () => {
  let mongoServer: any;
  let conn: any;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();

    const mongooseOpts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    conn = await mongoose.createConnection(uri, mongooseOpts);
  });

  afterAll(async () => {
    await conn.dropDatabase();
    await conn.close();
    await mongoServer.stop();
  });

  afterEach(async () => {
    const models = mongoose.modelNames();
    models.forEach(async (model: any) => {
      await conn.model(model).deleteMany();
    });
  });

  describe('getItemsFromUser', () => {
    it('returns items for a given user', async () => {
      const ItemModel = conn.model('Item', ItemSchema, 'items');
      await ItemModel.create({ userId: 'dawglogsondog', name: 'Foot', quantity: 3 });
      await ItemModel.create({ userId: 'abcdeffasdf', name: 'Foot', quantity: 5 });
      await ItemModel.create({ userId: 'abcdeffasdfasdf', name: 'Foot', quantity: 5 });
      const items = await getItemsFromUser('dawglogsondog', conn);

      expect(items[0].name).toBe('Foot');
      expect(items[0].quantity).toBe(3);
      expect(items[0].userId).toBe('dawglogsondog');
    });
  });

  describe('findItemByName', () => {
    it('finds the item by name', async () => {
		const ItemModel = conn.model('Item', ItemSchema, 'items');
		// await ItemModel.create({ userId: 'dawglogsondog', name: 'Toe', quantity: 3 });
		
		const newItem = new ItemModel({
            userId: 'dawglogsondog',
            name: 'Toe',
            quantity: 3
        });
        await newItem.save();
		
		const all = await getItems();
		console.log("all items: ", all);

		const items = await findItemByName('Toe');

		console.log("items: ", items);

		expect(items.length).toBeGreaterThan(0);
		expect(items[0].name).toBe('Toe');
		expect(items[0].quantity).toBe(3);
		expect(items[0].userId).toBe('dawglogsondog');
    });
  });

  describe('addItem', () => {
    it('adds items', async () => {
      const itemToAdd = { userId: 'dawglogsondog', name: 'Foot', quantity: 3 };
      const res = await addItem(itemToAdd, conn);

      expect(res.name).toBe(itemToAdd.name);
      expect(res.quantity).toBe(itemToAdd.quantity);
      expect(res.userId).toBe(itemToAdd.userId);
    });
  });

  describe('deleteItem', () => {
    it('deletes items', async () => {
      const ItemModel = conn.model('Item', ItemSchema, 'items');
      const newItem = await ItemModel.create({ userId: 'dawglogsondog', name: 'Toe', quantity: 3 });
      const res = await deleteItem(newItem._id.toString(), conn);

      expect(res.name).toBe('Toe');
      expect(res.quantity).toBe(3);
      expect(res.userId).toBe('dawglogsondog');
    });
  });

  describe('updateItem', () => {
    it('updates items', async () => {
      const ItemModel = conn.model('Item', ItemSchema, 'items');
      const newItem = await ItemModel.create({
        userId: 'dawglogsondog',
        name: 'Toe',
        quantity: 3,
        note: 'Hi there',
      });
      const updates = { quantity: 233, note: 'update works', name: 'Hello' };
      const res = await updateItem(newItem._id.toString(), updates, conn);

      expect(res.name).toBe('Hello');
      expect(res.quantity).toBe(233);
      expect(res.userId).toBe('dawglogsondog');
      expect(res.note).toBe('update works');
    });
  });

  describe('getItems', () => {
    it('all items', async () => {
      const itemList = [{ name: 'pentagon', quantity: 3 }, { name: 'Foot', quantity: 5 }];
      const ItemModel = conn.model('Item', ItemSchema, 'items');
      ItemModel.find = jest.fn().mockResolvedValue(itemList);
      const items = await getItems(conn);

      expect(items).toEqual(itemList);
    });
  });
});

export {};
