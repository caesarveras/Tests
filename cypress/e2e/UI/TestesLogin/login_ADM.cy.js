/// <reference types="cypress" />

describe('Login_ADM', () => {
  it('login e senha - ADM', () => {
    cy.fixture('data').then((data) => {
      const adminUser = data.users.admin;
      const Login = data.ambientes.Login;
      
      cy.visit(Login);
      cy.get('#user_login_67f662a352b55')
      .should('be.visible')
      .type(adminUser.username), { delay: 100 };

      cy.get('#user_pass_67f662a352b55')
      .should('be.visible')
      .type(adminUser.password), { delay: 100 };

      cy.get('.et_pb_login_0 > .et_pb_newsletter_form > form > :nth-child(4) > .et_pb_newsletter_button')
      .should('be.visible')
      .click();
    });

    describe('Verificações', () => {
      cy.get('.login-error-list > :nth-child(1)').should('be.visible');
    });
  });
});




