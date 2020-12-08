import { user } from '../../../private';

context('Actions', () => {
  beforeEach(() => {
    cy.visit('https://avtocod.ru/')
  })


  it('login invalid account and valid', () => {
    cy.contains('Вход').matchImageSnapshot('login-button-main-page')
    // https://on.cypress.io/type
    cy.contains('Вход')
      .click()
      .url().should('include', '/auth/login')
    
    cy.get(`input[type='email']`)
      .type('unvalid@email.com', { delay: 100 })
      .should('have.value', 'unvalid@email.com')
    
    cy.get(`input[type='password']`)
      .type('unvalidpassword', { delay: 100 })
      .should('have.value', 'unvalidpassword')

    cy.contains('Войти').matchImageSnapshot('login-button-login-page')

    cy.contains('Войти')
      .click()
    
    cy.get('div.alert-danger')
      .should('contain', 'Имя пользователя и пароль не совпадают.')
    
    cy.get(`input[type='email']`)
      .clear()
      .type(user.email, { delay: 100 })
      .should('have.value', user.email)
    
    cy.get(`input[type='password']`)
      .clear()
      .type(user.pass, { delay: 100 })
      .should('have.value', user.pass)

    cy.contains('Войти')
      .click()
      .url().should('include', '/my/history')
  })

  it('validation should work', () => {
    cy.get(`div[data-rel='GRZ'] input`)
      .type('999999999999', { delay: 100 })
    
    cy.get(`div[data-rel='GRZ'] .search-block__tip`).matchImageSnapshot('error_too_many_symbols')
  })

  it('additional payments mobile', () => {
    cy.viewport(320, 568);
    cy.visit('https://avtocod.ru/auth/login')

    cy.get(`input[type='email']`)
      .type(user.email, { delay: 100 })
      .should('have.value', user.email)
    
    cy.get(`input[type='password']`)
      .type(user.pass, { delay: 100 })
      .should('have.value', user.pass)

    cy.contains('Войти')
      .click()

    cy.visit('https://avtocod.ru/')

    cy.get(`div[data-rel='GRZ'] input`)
      .type('А009АА197', { delay: 100 })
    
    cy.get(`div[data-rel='GRZ']`)
      .click()

    cy.get(`div[data-rel='GRZ'] button`)
      .click()
    
    cy.get('.form-buy__toggle-btn.hidden-desktop')
      .click()

    cy.get('.pn-btn.pn-btn--gold.pn-btn--small.buy-button')
      .click()

    cy.get('.js-card-payment-others.collapsed')
      .click()

    cy.get('.collapse.show .paylist').matchImageSnapshot('Other_payments')
  })
})
