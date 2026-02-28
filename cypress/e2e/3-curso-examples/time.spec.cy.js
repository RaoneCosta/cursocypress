/// <reference types="cypress" />

describe ('Work with alerts',() => {
     
    beforeEach(() => {
        cy.visit('https://www.wcaquino.me/cypress/componentes.html')
     })

     it('Going back to the past', () => {
        //cy.get('#buttonNow').click()
        //cy.get('#resultado > span').should('contain', '16/10/2025')

        // cy.clock()
        // cy.get('#buttonNow').click()
        // cy.get('#resultado > span').should('contain', '31/12/1969')

        const dt = new Date(2012, 3 , 10, 15, 23, 50)
        cy.clock(dt.getTime())
        cy.get('#buttonNow').click()
        cy.get('#resultado > span').should('contain', '10/04/2012')
     })

     it.only('Goes to the future', () => {
        cy.clock()
        cy.get('#buttonTimePassed').click()
        cy.get('#resultado > span').invoke('text').then($el => {
            cy.wrap(Number($el)).should('lte', 0)
        })

        //cy.wait(1000)
        cy.tick(5000)
        cy.get('#buttonTimePassed').click()
        cy.get('#resultado > span').invoke('text').then($el => {
            cy.wrap(Number($el)).should('gte', 5000)
        })
        cy.tick(10000)
        cy.get('#buttonTimePassed').click()
        cy.get('#resultado > span').invoke('text').then($el => {
            cy.wrap(Number($el)).should('gte', 15000)
        })
     })
})