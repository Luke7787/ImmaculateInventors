const BACKEND_URL = 'https://immaculate-backend.azurewebsites.net';

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
		let user = {
			username: 'jbakdlfdjwzzzz',
			password: '1234567890!A',
			email: 'asdfkj@gmai.com',
			country: 'China',
			state: 'CA',
			zipcode: '93407',
			city: 'SLO',
			firstName: 'asd',
			lastName: 'asfd',
		};

		// it('GIVEN the user has valid fields', () => {
		// 	user = {
		// 		username: 'jbakdlfdjwzzzz',
		// 		password: '1234567890!A',
		// 		email: 'asdfkj@gmai.com',
		// 		country: 'China',
		// 		state: 'CA',
		// 		zipcode: '93407',
		// 		city: 'SLO',
		// 		firstName: 'asd',
		// 		lastName: 'asfd',
		// 	};
		// });

		it('WHEN I post the user', () => {
			cy.request({
				method: 'POST',
				url: `${BACKEND_URL}/register/`,
				body: user,
				failOnStatusCode: false,
			}).then((response) => {
				console.log(response);
				assert.equal(
					response.status,
					201,
					'THEN I receive a successful response coode: 201'
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
