import { setupWorker, rest } from 'msw'

import { handlers, exampleApi } from './handlers'

export const worker = setupWorker(...handlers)

// @ts-ignore
window.msw = { rest, exampleApi, worker }
