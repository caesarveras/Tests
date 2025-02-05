/// <reference types="cypress" />


describe('Login_ADM', () => {
  it('login e senha - ADM', () => {
    cy.fixture('data').then((data) => {
      const usernameADM = data.usernameADM;
      const siteteste = data.siteteste;
      const passwordADM = data.passwordADM;
      
    cy.visit(siteteste)
  

    cy.get('#user_login_66fc27c74ae36').type(usernameADM)
    cy.get('#user_pass_66fc27c74ae36').type(passwordADM)
    cy.get('.et_pb_login_0 > .et_pb_newsletter_form > form > :nth-child(4) > .et_pb_newsletter_button').click();
    //logar

    (cy.get('.login-error-list > :nth-child(1)').should('be.visible')) 
    //login vai direcionar para wordpress
    //(cy.get('.locked_page_header').should('be.visible'))
    
  })
})
});