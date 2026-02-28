/// <reference types="cypress" />

import dayjs from "dayjs"

describe('Deve testar funcional', () => {

   let token

   before(() => {
      cy.getToken('raone57@gmail.com', 'teste123')
   })

   beforeEach(() => {
      cy.resetRest(token)
   })

   it('Deve inserir conta', () => {
      cy.request({
         method: 'POST',
         url: '/contas',
         //headers: { Authorization: `JWT ${token}` },
         body: {
            nome: "Conta via REST"
         }
      }).as('response')

      cy.get('@response').then(res => {
         expect(res.status).to.be.equals(201)
         expect(res.body).to.have.property('id')
         expect(res.body).to.have.property('nome', 'Conta via REST')
      })
   })

   it('Deve alterar conta', () => {
      cy.getContaByName('Conta para movimentacoes', token)
         .then(contaId => {
            cy.request({
               method: 'PUT',
               url: `/contas/${contaId}`,
               //headers: { Authorization: `JWT ${token}` },
               body: {
                  nome: "Conta alterada via REST"
               }
            }).as('response')
         })

      cy.get('@response').its('status').should('be.equal', 200)
   })

   it('Não Deve criar conta repetida', () => {
      cy.request({
         method: 'POST',
         url: '/contas',
         //headers: { Authorization: `JWT ${token}` },
         body: {
            nome: "Conta mesmo nome"
         },
         failOnStatusCode: false
      }).then(response => {
         expect(response.status).to.be.eq(400)
         expect(response.body).to.have.property('error', 'Já existe uma conta com esse nome!')
      })
   })

   it('Deve inserir movimentação', () => {
      cy.getContaByName('Conta para movimentacoes', token)
         .then(contaId => {
            cy.request({
               method: 'POST',
               url: '/transacoes',
               //headers: { Authorization: `JWT ${token}` },
               body: {
                  conta_id: contaId,
                  data_pagamento: dayjs().add(1, 'day').format('DD/MM/YYYY'),
                  data_transacao: dayjs().format('DD/MM/YYYY'),
                  descricao: "desc",
                  envolvido: "interess",
                  status: true,
                  tipo: "REC",
                  valor: "57"
               }
            }).as('response').its('status').should('be.equal', 201)
         })
   })

   it('Deve validar o saldo', () => {
      cy.request({
         method: 'GET',
         url: '/saldo',
         //headers: { Authorization: `JWT ${token}` },
      }).then(response => {
         let saldoConta = null
         response.body.forEach(linhaSaldo => {
            if (linhaSaldo.conta == 'Conta para saldo') saldoConta = linhaSaldo.saldo
         });
         expect(saldoConta).to.be.eq('534.00')
      })

      cy.request({
         method: 'GET',
         url: '/transacoes',
         //headers: { Authorization: `JWT ${token}` },
         qs: {descricao: 'Movimentacao 1, calculo saldo'}
      }).then(res => {
         cy.request({
            method: 'PUT',
            url: `/transacoes/${res.body[0].id}`,
            //headers: { Authorization: `JWT ${token}` },
            body: {
               data_pagamento: dayjs(res.body[0].data_pagamento).format('DD/MM/YYYY'),
               data_transacao: dayjs().format('DD/MM/YYYY'),
               status: true,
               descricao: res.body[0].descricao,
               envolvido: res.body[0].envolvido,
               valor: res.body[0].valor,
               conta_id: res.body[0].conta_id
            }
         }).as('response').its('status').should('be.equal', 200)
      })

      cy.request({
         method: 'GET',
         url: '/saldo',
         //headers: { Authorization: `JWT ${token}` },
      }).then(response => {
         let saldoConta = null
         response.body.forEach(linhaSaldo => {
            if (linhaSaldo.conta == 'Conta para saldo') saldoConta = linhaSaldo.saldo
         });
         expect(saldoConta).to.be.eq('4034.00')
      })

   })

   it('Deve remover movimentação', () => {
      cy.request({
         method: 'GET',
         url: '/transacoes',
         //headers: { Authorization: `JWT ${token}` },
         qs: {descricao: 'Movimentacao para exclusao'}
      }).then(res => {
         cy.request({
         method: 'DELETE',
         //headers: { Authorization: `JWT ${token}` },
         url: `/transacoes/${res.body[0].id}`
         }).then(response => {
            expect(response.status).to.be.eq(204)
         })
      })
   })
})