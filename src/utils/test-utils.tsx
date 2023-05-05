import type { queries, RenderOptions } from '@testing-library/react'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { setupServer } from 'msw/node'
import type { PropsWithChildren } from 'react'
import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import { handlers } from '../mocks/handlers'
import { store } from '../store/store'

function Wrapper({ children }: PropsWithChildren): JSX.Element {
  return (
    <Provider store={store}>
      <BrowserRouter>{children}</BrowserRouter>
    </Provider>
  )
}

export function renderWithProviders(
  ui: React.ReactElement,
  ...renderOptions: RenderOptions<typeof queries, HTMLElement, HTMLElement>[]
) {
  const user = userEvent.setup()

  return { store, user, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}

export const mockServer = setupServer(...handlers)

beforeAll(() =>
  mockServer.listen({
    onUnhandledRequest: 'error',
  })
)
afterEach(() => mockServer.resetHandlers())
afterAll(() => mockServer.close())
