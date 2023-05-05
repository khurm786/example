declare global {
  namespace Cypress {
    interface Chainable {
      checkMockServerStarted(): Chainable
      mockEndpoint(fn: MockEndpointCallback): Chainable
    }
  }
}

import type { SetupWorker, rest } from 'msw'

export type MSWWindowObject = {
  worker: SetupWorker
  exampleApi(path: string): string
  rest: typeof rest
}

/**
 * Cypress does not have access to MSW since it's running in a separate instance,
 * the development server has access to MSW, we expose this through a global window object.
 *
 * It takes a short time to boot up, but sometimes Cypress can access the window before the server starts.
 * In this scenario, we need to make sure that the global MSW object is available to manipulate.
 *
 * It's worth nothing that this will only be slow once, because once MSW is loaded
 * it doesn't shut down until npm run dev stops.
 */
Cypress.Commands.add('checkMockServerStarted', () => {
  cy.window().should('have.property', 'msw')
})

export type MockEndpointCallback = (msw: MSWWindowObject) => void

Cypress.Commands.add('mockEndpoint', (resolve) => {
  cy.window().then((window) => {
    // @ts-ignore
    const object: MSWWindowObject = window.msw

    resolve(object)
  })
})
