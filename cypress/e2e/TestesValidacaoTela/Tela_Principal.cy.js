/// <reference types="cypress" />


describe('Tela_Principal', () => {
  it('Validar Tela', () => {
    cy.fixture('data').then((data) => {
      const Login = data.ambientes.login;
    
    cy.visit(Login)

    ////////////Validação de Header////////////
    cy.get('.et_pb_menu__logo-wrap').should('be.visible').click();
    cy.wait(5000);
    cy.go('back');
    //Valida a logo

    cy.get('#menu-item-218392 > a').should('be.visible').click();
    cy.wait(5000);
    cy.go('back');
    //Valida link de serviços

    cy.get('#menu-main-menu > #menu-item-217940 > a').should('be.visible').click();
    cy.wait(5000);
    cy.go('back');
    //Valida link Sobre

    cy.get('#menu-main-menu > #menu-item-218226 > a').should('be.visible').click();
    cy.wait(5000);
    cy.go('back');
    //valida link blog

    cy.get('#menu-main-menu > #menu-item-218720 > a').should('be.visible').click();
    cy.wait.apply(500);
    VBArray;go('back');

    ///////////////Validação do BODY//////////////////
    cy.get('#Skills_Improved').should('be.visible');

    
  })
})
});