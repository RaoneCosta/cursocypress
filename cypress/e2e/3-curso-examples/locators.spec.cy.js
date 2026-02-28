/// <reference types="cypress" />

describe ('Work with Locators',() => {

    beforeEach(() => {
        cy.visit('https://www.wcaquino.me/cypress/componentes.html')
     })

     it('Using jquery selector', () => {
        cy.get('#tabelaUsuarios td:contains(Doutorado):eq(0) ~ td:eq(3) input')
        cy.get('[onclick*=Francisco]')
        cy.get('table#tabelaUsuarios tbody > tr:eq(0) td:nth-child(3) > input')
        cy.get(':nth-child(2) > :nth-child(1) > :nth-child(3) > input')
        
     })

     it.only('Using xpath', () => {
        cy.xpath('//input[contains(@onclick, Francisco)]')
        cy.xpath("//table[@id='tabelaUsuarios']//td[contains(.,'Francisco')]/..//input[@type='button']")
        cy.xpath("//td[contains(.,'Usuario A')]/following-sibling::td[contains(.,'Mestrado')]/..//input[@type='text']").type('Funciona')
     })

})