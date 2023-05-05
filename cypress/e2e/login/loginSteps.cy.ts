import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'

Given('I open the login page', () => {
  cy.visit('/login')
  cy.checkMockServerStarted()
})

When('I enter valid credentials', () => {
  cy.get('input[name="username"]')
    .type('dev@example.net')
    .get('input[name="password"]')
    .type('something')
})

When('I enter invalid credentials', () => {
  cy.get('input[name="username"]').type('invalid')
  cy.get('input[name="password"]').type('something')
})

When('I click login', () => {
  cy.get('[data-testid=sign-in]').click()
})

When('The API is offline', async () => {
  cy.mockEndpoint(({ worker, exampleApi, rest }) => {
    worker.use(
      rest.post(exampleApi('login'), (req, res, ctx) => {
        return res.once(ctx.status(500))
      })
    )
  })
})

Then('I should see the homepage', () => {
  cy.get('h1').should('contain.text', 'Dashboard Page')
})

Then('I should see a server error message', () => {
  cy.get('[data-testid="auth-error"]').should(
    'contain.text',
    'There was an error connecting to the server'
  )
})

Then('I should see a validation error message', () => {
  cy.get('[data-testid="auth-error"]').should(
    'contain.text',
    'The username and password combination was incorrect'
  )
})
