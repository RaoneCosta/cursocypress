/// <reference types="cypress" />

describe ('Desafios...', () => {
    beforeEach(() => {
        cy.visit('https://www.wcaquino.me/cypress/componentes.html')
     })

    it('Desafio 1', () => {

        const stub = cy.stub().as('alerta')
        cy.on('window:alert', stub)
        
        cy.get('#formCadastrar').click()
            .then(() => {
                expect(stub.getCall(0)).to.be.calledWith('Nome eh obrigatorio')
            })

        cy.get('#formNome').type('Nome')
        cy.get('#formCadastrar').click()
            .then(() => {
                expect(stub.getCall(1)).to.be.calledWith('Sobrenome eh obrigatorio')
            })
        
        cy.get('#formSobrenome').type('Sobrenome')
        cy.get('#formCadastrar').click()
            .then(() => {
                expect(stub.getCall(2)).to.be.calledWith('Sexo eh obrigatorio')
            })

        cy.get('#formSexoMasc').click()
        cy.get('#formCadastrar').click()
        cy.get('#resultado > :nth-child(1)').should('have.text', 'Cadastrado!')
    })
})