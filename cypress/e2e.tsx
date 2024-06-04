describe('sign in', () => {
	it('signs in properly', () => {
		cy.visit('http://localhost:3000');
		cy.contains('button', 'REGISTER NOW').should('be.visible').click();
		cy.get('input[name="username"]').should('be.visible').type('Dwglawg');
		cy.get('input[name="password"]').should('be.visible').type('1234567890!A');
		cy.contains('button', 'Login').should('be.visible').click();
		cy.url().should('include', '/inventory');
	});
});
