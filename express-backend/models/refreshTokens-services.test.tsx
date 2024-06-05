const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const {
  getRefreshToken,
  addRefreshToken,
  deleteRefreshToken,
  setConnection,
  getDbConnection,
} = require('./refreshTokens-services');
const RefreshTokenSchema = require('./refreshTokens');
const refreshToken_Services = require('./refreshTokens-services');


describe('refreshToken services', () => {
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

    refreshToken_Services.setConnection(conn);
  });

  afterAll(async () => {
    await conn.dropDatabase();
    await conn.close();
    await mongoServer.stop();
  });

  afterEach(async () => {
    await conn.model('RefreshToken').deleteMany();
  });

  describe('Add a refresh Token', () => {
    it('returns items for a given user', async () => {
        const RefreshModel = conn.model('RefreshToken', RefreshTokenSchema, 'refreshTokens');
        const result = await addRefreshToken("adshf9w8f3h9safdsaf");
        //console.log(result); 
      expect(result.refreshToken).toBe("adshf9w8f3h9safdsaf");
    });
  });

  describe('get a refresh Token', () => {
    it('returns items for a given user', async () => {
        const RefreshModel = conn.model('RefreshToken', RefreshTokenSchema, 'refreshTokens');
        const result = await addRefreshToken("adshf9w8f3h9safdsaf");
        const get = await getRefreshToken("adshf9w8f3h9safdsaf");
      expect(get.refreshToken).toBe("adshf9w8f3h9safdsaf");
    });
  });

  describe('get a refresh Token', () => {
    it('returns items for a given user', async () => {
        const RefreshModel = conn.model('RefreshToken', RefreshTokenSchema, 'refreshTokens');
        const result = await addRefreshToken("adshf9w8f3h9safdsaf");
        const del = await deleteRefreshToken("adshf9w8f3h9safdsaf");
        const get = await getRefreshToken("adshf9w8f3h9safdsaf")
        console.log(del)
      expect(get).toBe(undefined);
    });
  });
});

describe('dbc', () => {
    getDbConnection()
});