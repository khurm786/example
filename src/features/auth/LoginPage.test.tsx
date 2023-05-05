import { rest } from 'msw'
import * as router from 'react-router'
import { vi, expect } from 'vitest'

import { db } from '../../mocks/db'
import { exampleApi } from '../../mocks/handlers'
import { renderWithProviders, mockServer } from '../../utils/test-utils'

import LoginPage from './LoginPage'

describe('LoginPage', () => {
  it('should validate user input', async function () {
    const component = renderWithProviders(<LoginPage />)
    const button = await component.findByTestId('sign-in')
    await component.user.click(button)
    await component.findByText('password is a required field')
    await component.findByText('username is a required field')
  })

  test('it should display an error message if username password combination is invalid', async () => {
    const component = renderWithProviders(<LoginPage />)

    const username = await component.findByPlaceholderText('Username')
    const password = await component.findByPlaceholderText('Password')

    await component.user.type(username, 'nope')
    await component.user.type(password, 'nope')

    expect(username).toHaveValue('nope')
    expect(password).toHaveValue('nope')

    let button = await component.findByTestId('sign-in')

    await component.user.click(button)

    await component.findByText(
      'The username and password combination was incorrect'
    )
  })

  it('successfully authenticates the user', async () => {
    const navigate = vi.fn()

    vi.spyOn(router, 'useNavigate').mockImplementation(() => navigate)

    const user = db.user.create({
      email: 'test@test.com',
    })

    const component = renderWithProviders(<LoginPage />)

    const username = await component.findByPlaceholderText('Username')
    const password = await component.findByPlaceholderText('Password')

    await component.user.type(username, user.email)
    await component.user.type(password, 'secret')

    let button = await component.findByTestId('sign-in')

    await component.user.click(button)

    expect(navigate).toHaveBeenCalledWith('/')
  })

  it('will display a different error if the server is returning a 500', async () => {
    mockServer.use(
      rest.post(exampleApi('login'), (req, res, ctx) => {
        return res.once(ctx.status(500))
      })
    )

    const user = db.user.create({
      email: 'test@test.com',
    })

    const component = renderWithProviders(<LoginPage />)

    const username = await component.findByPlaceholderText('Username')
    const password = await component.findByPlaceholderText('Password')

    await component.user.type(username, user.email)
    await component.user.type(password, 'secret')

    let button = await component.findByTestId('sign-in')

    await component.user.click(button)

    await component.findByText('There was an error connecting to the server')
  })
})
