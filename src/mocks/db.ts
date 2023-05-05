import { faker } from '@faker-js/faker/locale/en_GB'
import { factory, primaryKey } from '@mswjs/data'

export const db = factory({
  user: {
    email: String,
    first_name: String,
    last_name: String,
    uuid: primaryKey(faker.datatype.uuid),
  },
})
