/// <reference types="cypress" />

describe('Login_User', () => {
  it('login e senha - USER COMUM', () => {
    cy.fixture('data').then((data) => {
      const user = data.users.user; 
      const Login = data.ambientes.login;

      cy.visit(Login);
      
      cy.get('#user_login_67f662a352b55')
        .should('be.visible')
        .type(user.username), { delay: 100 }; 
          
        cy.get('#user_pass_67f662a352b55')
        .should('be.visible')
        .type(user.password), { delay: 100 };
      
      cy.get('.et_pb_login_0 > .et_pb_newsletter_form > form > :nth-child(4) > .et_pb_newsletter_button')
        .should('be.visible')
        .click();
      
      
    });
  });
});