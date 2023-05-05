import type { ResponseComposition, RestContext, RestRequest } from 'msw'

interface ILoginRequest {
  username: string
  password: string
}

interface ILoginResponse {
  user: {
    email: string
    first_name: string
    last_name: string
  }
  token: string
}

interface IUnauthorizedResponse {
  message: string
}

import { db } from '../db'

export default async (
  req: RestRequest,
  res: ResponseComposition,
  context: RestContext
) => {
  const data = await req.json<ILoginRequest>()

  const user = db.user.findFirst({
    where: { email: { equals: data.username } },
  })

  if (user === null) {
    return res(
      context.status(401),
      context.json<IUnauthorizedResponse>({
        message: 'Unauthorized.',
      })
    )
  }

  return res(
    context.status(200),
    context.json<ILoginResponse>({
      token: 'A_Randomly_Generated_Token',
      user: {
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
      },
    })
  )
}
