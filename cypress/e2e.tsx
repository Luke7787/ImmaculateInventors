describe('sign in', () => {
	it('signs in properly', () => {
		cy.visit('https://mango-island-08612f41e.5.azurestaticapps.net/');
		cy.contains('button', 'REGISTER NOW').should('be.visible').click();
		cy.get('input[name="username"]').should('be.visible').type('Dwglawg');
		cy.get('input[name="password"]').should('be.visible').type('1234567890!A');
		cy.contains('button', 'Login').should('be.visible').click();
		cy.url().should('include', '/inventory');
	});

	it('displays error on wrong credentials', () => {
		cy.visit('https://mango-island-08612f41e.5.azurestaticapps.net/');
		cy.contains('button', 'REGISTER NOW').should('be.visible').click();
		cy.get('input[name="username"]').should('be.visible').type('Dwglawg');
		cy.get('input[name="password"]').should('be.visible').type('torloall');
		cy.contains('button', 'Login').should('be.visible').click();
		cy.url().should('include', '/');
		cy.contains('p', 'Your username or password is incorrect.')
			.should('be.visible')
			.click();
	});
});
