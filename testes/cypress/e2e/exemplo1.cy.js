/// <reference types="cypress"/>



describe('Criando o cenario de testes para o site globalsqa', () => {
  it('Caso de teste: Registrando um usuario no site com sucesso', () => {
    cy.visit('https://www.globalsqa.com/angularJs-protractor/registration-login-example/#/login')
    cy.get('.btn-link').click()
    cy.get('#firstName').type('Inatel')
    cy.get('#Text1').type('Inatel')
    cy.get('#username').type('Inatel')
    cy.get('#password').type('Inatel')
    cy.get('.btn-primary').click()

    cy.get('.ng-binding').should('contain.text',
    'Registration successful')
  })

  it('Caso de teste: Registrando um usuario com falha (faltando senha)', () => {
    cy.visit('https://www.globalsqa.com/angularJs-protractor/registration-login-example/#/register')
    cy.get('#firstName').type('Inatel')
    cy.get('#Text1').type('Inatel')
    cy.get('#username').type('Inatel')
    cy.get('#password').type('Inatel')
    cy.get('#password').clear()
    
    cy.get('.has-error > .help-block').should('have.text',
    'Password is required')
    cy.get('.btn-primary').should('be.disabled')
  })

  it('Caso de teste: Realizando login com sucesso', () => {
    let info = createUser()
    cy.get('#username').type(info[0])
    cy.get('#password').type(info[1])
    cy.get('.btn-primary').click()

    cy.get('h1.ng-binding').should('contains.text',
    info[0])
  })
})

function createUser(){

  let hour = new Date().getHours().toString()
  let min = new Date().getMinutes().toString()
  let sec = new Date().getSeconds().toString()
  let user = hour + min + sec + 'Id'
  let password = hour + min + sec + 'pass'
  let userInfo = [user, password]

  cy.visit('https://www.globalsqa.com/angularJs-protractor/registration-login-example/#/login')
  cy.get('.btn-link').click()
  cy.get('#firstName').type(user)
  cy.get('#Text1').type(user)
  cy.get('#username').type(user)
  cy.get('#password').type(password)
  cy.get('.btn-primary').click()
  cy.get('.ng-binding').should('contain.text',
  'Registration successful')

  return userInfo
}