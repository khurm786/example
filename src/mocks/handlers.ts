import { rest } from 'msw'

export const exampleApi = (path: string) => {
  let baseUrl = import.meta.env.VITE_API_URL

  baseUrl = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`

  return new URL(path, baseUrl).toString()
}

import { db } from './db'
import loginResolver from './handlers/login'

export const handlers = [
  rest.post(exampleApi('login'), loginResolver),
  ...db.user.toHandlers('rest', exampleApi('users')), // It will generate a crud for users, GET /users, /users/:id etc...
]
