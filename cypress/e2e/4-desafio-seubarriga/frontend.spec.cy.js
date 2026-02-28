/// <reference types="cypress" />

import loc from '../../support/locators'
import '../../support/commandsContas'
import buildEnv from '../../support/buildEnv'

describe('Deve testar funcional', () => {

   beforeEach(() => {
      buildEnv()
      cy.login('raone57@gmail.com', 'senha errada')
      //cy.resetApp()
   })

   after(() => {
      cy.clearLocalStorage()
   })

   it('Deve inserir conta', () => {

      cy.intercept({
         method: 'GET',
         url: '/contas',
      },
         [
            {
               "id": 1,
               "nome": "Carteira",
               "visivel": true,
               "usuario_id": 1
            },
            {
               "id": 2,
               "nome": "Banco",
               "visivel": true,
               "usuario_id": 1
            }
         ]).as("contas")
      
      cy.intercept({
         method: 'POST',
         url: '/contas',
      },
         [
            {
               "id": 3,
               "nome": "Conta de teste",
               "visivel": true,
               "usuario_id": 1
            }
         ]).as("saveContas")

      cy.acessarMenuConta()

      cy.intercept({
         method: 'GET',
         url: '/contas',
      },
         [
            {
               "id": 1,
               "nome": "Carteira",
               "visivel": true,
               "usuario_id": 1
            },
            {
               "id": 2,
               "nome": "Banco",
               "visivel": true,
               "usuario_id": 1
            },
            {
               "id": 3,
               "nome": "Conta de teste",
               "visivel": true,
               "usuario_id": 1
            }
         ]).as("contasSave")

      cy.inserirConta('Conta de teste')
      cy.get(loc.MESSAGE).should('contain', 'Conta inserida com sucesso!')
   })

   it('Deve alterar conta', () => {

      cy.intercept({
         method: 'GET',
         url: '/contas',
      },
         [
            {
               "id": 1,
               "nome": "Carteira",
               "visivel": true,
               "usuario_id": 1
            },
            {
               "id": 2,
               "nome": "Banco",
               "visivel": true,
               "usuario_id": 1
            }
         ]).as("contas")

      cy.intercept({
         method: 'PUT',
         url: '/contas/**',
      },
         [
            {
               "id": 1,
               "nome": "Conta Alterada",
               "visivel": true,
               "usuario_id": 1
            }
         ]).as("alteraConta")

      cy.acessarMenuConta()
      cy.xpath(loc.CONTAS.FN_XP_BTN_ALTERAR('Carteira')).click()
      cy.get(loc.CONTAS.NOME).clear().type('Conta Alterada')
      cy.get(loc.CONTAS.BTN_SALVAR).click()
      cy.get(loc.MESSAGE).should('contain', 'atualizada com sucesso')
   })

   it('Não Deve criar conta repetida', () => {

      cy.intercept({
         method: 'POST',
         url: '/contas',
      },
         { 
            "error": "Já existe uma conta com esse nome!",
            statusCode: 400
         },
      ).as("saveContaRepetida")

      cy.acessarMenuConta()
      cy.inserirConta('Conta mesmo nome')
      cy.get(loc.MESSAGE).should('contain', 'code 400')
   })

   it('Deve inserir movimentação', () => {

      cy.intercept({
         method: 'POST',
         url: '/transacoes',
      },
         { 
         "id": 2396638,
         "descricao": "dasdsa",
         "envolvido": "dsds",
         "observacao": null,
         "tipo": "REC",
         "data_transacao": "2025-10-28T03:00:00.000Z",
         "data_pagamento": "2025-10-28T03:00:00.000Z",
         "valor": "32321.00",
         "status": false,
         "conta_id": 2555043,
         "usuario_id": 65425,
         "transferencia_id": null,
         "parcelamento_id": null
      },
      )

      cy.intercept({
         method: 'GET',
         url: '/extrato/**',
      },
      {fixture:'movimentacaoSalva'},
      ).as("extratoSalvo")

      cy.get(loc.MENU.MOVIMENTACAO).click()
      cy.get(loc.MOVIMENTACAO.DESCRICAO).type('Desc')
      cy.get(loc.MOVIMENTACAO.VALOR).type('123')
      cy.get(loc.MOVIMENTACAO.INTERESSADO).type('Interessado')
      cy.get(loc.MOVIMENTACAO.STATUS).click()
      cy.get(loc.MOVIMENTACAO.CONTA).select('Banco')
      cy.get(loc.MOVIMENTACAO.BTN_SALVAR).click()
      cy.get(loc.MESSAGE).should('contain', 'sucesso')
      cy.get(loc.EXTRATO.LINHAS).should('have.length', 7)
      cy.xpath(loc.EXTRATO.FN_XP_BUSCA_ELEMENTO('Desc', '123')).should('exist')
   })

   it('Deve validar o saldo', () => {
      cy.intercept({
         method: 'GET',
         url: '/transacoes/**',
      },
         {
            "conta": "Conta para saldo",
            "id": 2396641,
            "descricao": "Movimentacao 1, calculo saldo",
            "envolvido": "CCC",
            "observacao": null,
            "tipo": "REC",
            "data_transacao": "2025-10-28T03:00:00.000Z",
            "data_pagamento": "2025-10-28T03:00:00.000Z",
            "valor": "3500.00",
            "status": false,
            "conta_id": 2555053,
            "usuario_id": 65425,
            "transferencia_id": null,
            "parcelamento_id": null
         }
      )
      
      cy.intercept({
         method: 'PUT',
         url: '/transacoes/**',
      },
         {
            "conta": "Conta para saldo",
            "id": 2396641,
            "descricao": "Movimentacao 1, calculo saldo",
            "envolvido": "CCC",
            "observacao": null,
            "tipo": "REC",
            "data_transacao": "2025-10-28T03:00:00.000Z",
            "data_pagamento": "2025-10-28T03:00:00.000Z",
            "valor": "3500.00",
            "status": false,
            "conta_id": 2555053,
            "usuario_id": 65425,
            "transferencia_id": null,
            "parcelamento_id": null
         }
      ) 

      cy.get(loc.MENU.HOME).click()
      cy.xpath(loc.SALDO.FN_XP_SALDO_CONTA('Carteira')).should('contain', '100')

      cy.get(loc.MENU.EXTRATO).click()
      cy.xpath(loc.EXTRATO.FN_XP_BUSCA_ELEMENTO_ALTERAR('Movimentacao 1, calculo saldo')).click()
      cy.wait(4000)
      cy.get(loc.MOVIMENTACAO.DESCRICAO).should('have.value', 'Movimentacao 1, calculo saldo')
      cy.get(loc.MOVIMENTACAO.STATUS).click()
      cy.get(loc.MOVIMENTACAO.BTN_SALVAR).click()
      cy.get(loc.MESSAGE).should('contain', 'sucesso')

      cy.intercept({
         method: 'GET',
         url: '/saldo'
      },
         [
            {
               conta_id: 999,
               conta: "Carteira",
               saldo: "4034.00"
            },
            {
               conta_id: 9909,
               conta: "Banco",
               saldo: "500034.00"
            }
         ]).as("saldoFinal")

      cy.get(loc.MENU.HOME).click()
      cy.xpath(loc.SALDO.FN_XP_SALDO_CONTA('Carteira')).should('contain', '4.034')
   })

   it('Deve remover movimentação', () => {

      cy.intercept({
         method: 'DELETE',
         url: '/transacoes/**',
      },
         {
            statusCode: 204
         }
      ) 

      cy.get(loc.MENU.EXTRATO).click()
      cy.xpath(loc.EXTRATO.FN_XP_BUSCA_ELEMENTO_DELETAR('Movimentacao para exclusao')).click()
      cy.get(loc.MESSAGE).should('contain', 'removida com sucesso')
      //cy.xpath(loc.EXTRATO.FN_XP_BUSCA_ELEMENTO_DELETAR('Movimentacao para exclusao')).should('not.exist')
   })

   it.only('Deve valida os dados enviados para inserir conta', () => {      
      cy.intercept({
         method: 'POST',
         url: '/contas',
      },
         [
            {
               "id": 3,
               "nome": "Conta de teste",
               "visivel": true,
               "usuario_id": 1
            }
         ],
      ).as("saveContas")

      cy.acessarMenuConta()

      cy.intercept({
         method: 'GET',
         url: '/contas',
      },
         [
            {
               "id": 1,
               "nome": "Carteira",
               "visivel": true,
               "usuario_id": 1
            },
            {
               "id": 2,
               "nome": "Banco",
               "visivel": true,
               "usuario_id": 1
            },
            {
               "id": 3,
               "nome": "Conta de teste",
               "visivel": true,
               "usuario_id": 1
            }
         ]).as("contasSave")

      cy.inserirConta('{CONTROL}')
      //cy.wait('@saveContas').its('request.body.nome').should('not.be.empty')
      cy.get(loc.MESSAGE).should('contain', 'Conta inserida com sucesso!')
   })
})