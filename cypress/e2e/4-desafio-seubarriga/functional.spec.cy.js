/// <reference types="cypress" />

import loc from '../../support/locators'
import '../../support/commandsContas'

describe ('Deve testar funcional',() => {
     
    beforeEach(() => {
        cy.login('raone57@gmail.com', 'teste123')
        cy.resetApp()
    })

     it('Deve inserir conta', () => {
        cy.resetApp()
        cy.acessarMenuConta()
        cy.inserirConta('Conta Inserida')
        cy.get(loc.MESSAGE).should('contain', 'Conta inserida com sucesso!')
     })

     it('Deve alterar conta', () => {
        cy.acessarMenuConta()
        cy.xpath(loc.CONTAS.FN_XP_BTN_ALTERAR('Conta para alterar')).click()
        cy.get(loc.CONTAS.NOME).clear().type('Conta Alterada')
        cy.get(loc.CONTAS.BTN_SALVAR).click()
        cy.get(loc.MESSAGE).should('contain', 'atualizada com sucesso')
     })

     it('Não Deve criar conta repetida', () => {
        cy.acessarMenuConta()
        cy.inserirConta('Conta mesmo nome')
        cy.get(loc.MESSAGE).should('contain', 'code 400')
     })

     it('Deve inserir movimentação', () => {
        cy.get(loc.MENU.MOVIMENTACAO).click()
        cy.get(loc.MOVIMENTACAO.DESCRICAO).type('Desc')
        cy.get(loc.MOVIMENTACAO.VALOR).type('1234')
        cy.get(loc.MOVIMENTACAO.INTERESSADO).type('Interessado')
        cy.get(loc.MOVIMENTACAO.STATUS).click()
        cy.get(loc.MOVIMENTACAO.CONTA).select('Conta para movimentacoes')
        cy.get(loc.MOVIMENTACAO.BTN_SALVAR).click()
        cy.get(loc.MESSAGE).should('contain', 'sucesso')
        cy.get(loc.EXTRATO.LINHAS).should('have.length', 7)
        cy.xpath(loc.EXTRATO.FN_XP_BUSCA_ELEMENTO('Desc', '1.234')).should('exist')
     })

     it('Deve validar o saldo', () => {
        cy.get(loc.MENU.HOME).click()
        cy.xpath(loc.SALDO.FN_XP_SALDO_CONTA('Conta para saldo')).should('contain','534')

        cy.get(loc.MENU.EXTRATO).click()
        cy.xpath(loc.EXTRATO.FN_XP_BUSCA_ELEMENTO_ALTERAR('Movimentacao 1, calculo saldo')).click()
        cy.wait(4000)
        cy.get(loc.MOVIMENTACAO.DESCRICAO).should('have.value', 'Movimentacao 1, calculo saldo')
        cy.get(loc.MOVIMENTACAO.STATUS).click()
        cy.get(loc.MOVIMENTACAO.BTN_SALVAR).click()
        cy.get(loc.MESSAGE).should('contain', 'sucesso')

        cy.get(loc.MENU.HOME).click()
        cy.xpath(loc.SALDO.FN_XP_SALDO_CONTA('Conta para saldo')).should('contain','4.034')
     })

     it('Deve remover movimentação', () => {
        cy.get(loc.MENU.EXTRATO).click()
        cy.xpath(loc.EXTRATO.FN_XP_BUSCA_ELEMENTO_DELETAR('Movimentacao para exclusao')).click()
        cy.get(loc.MESSAGE).should('contain', 'removida com sucesso')
        cy.xpath(loc.EXTRATO.FN_XP_BUSCA_ELEMENTO_DELETAR('Movimentacao para exclusao')).should('not.exist')
     })
})