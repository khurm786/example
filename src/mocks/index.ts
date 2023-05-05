async function seed() {
  const { db } = await import('./db')

  db.user.create({
    email: 'dev@example.net',
    first_name: 'Example',
    last_name: 'Developer',
  })
}

export const prepare = async () => {
  if (import.meta.env.VITE_START_MSW) {
    // @ts-ignore
    await import('../../public/mockServiceWorker.js')

    const { worker } = await import('./browser')

    await seed()

    return worker.start({
      onUnhandledRequest: 'warn',
    })
  }

  return Promise.resolve()
}
