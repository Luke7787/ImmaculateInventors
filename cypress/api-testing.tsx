const BACKEND_URL = 'http://localhost:8000';

describe('Backend is listening', () => {
	//GET request
	context('Backend runs without error', () => {
		it('GIVEN I run the backend', () => {});
		it('WHEN I visit the root endpoint', () => {
			cy.request('GET', `${BACKEND_URL}/`).then((response) => {
				assert.isNotNull(response.body, 'THEN it does not blow up');
				assert.equal(
					response.body,
					'Hello World!',
					'AND returns "Hello World!"'
				);
			});
		});
	});
});

describe('API takes a user and adds it to the Data Base (then deletes it)', () => {
	//POST request
	context('Successful post', () => {
		before(() => {});
		let user = {};

		it('GIVEN the user has valid fields', () => {
			user = {
				username: 'TestingUser',
				password: 'ImmaculateInventors123!',
				email: 'joshhall408@gmail.com',
				country: 'United States',
				state: 'California',
				zipcode: '93407',
				city: 'San Luis Obispo',
				firstName: 'Test',
				lastName: 'User',
			};
		});

		it('WHEN I post the user', () => {
			cy.request('POST', `${BACKEND_URL}/register/`, user).then((response) => {
				assert.equal(
					response.status,
					201,
					'THEN I receive a successfull response coode: 201'
				);
				assert.exists(
					response.body._id,
					"AND the object has an '_id' property"
				);
				assert.equal(
					response.body.username,
					user.username,
					'AND the response object contains the same name and job I passed'
				);
				assert.notEqual(
					//check that the password got hashed
					response.body.password,
					user.password,
					"AND the user's password gets hashed/salted in the database"
				);

				cy.request('DELETE', `${BACKEND_URL}/users/${response.body._id}`);
			});
		});
	});
});
