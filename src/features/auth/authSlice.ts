import { createSlice } from '@reduxjs/toolkit'

import type { User } from '../../services/auth'
import { authApi } from '../../services/auth'
import type { RootState } from '../../store/store'

type AuthState = {
  user: User | null
  token: string | null
}

const slice = createSlice({
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        state.token = payload.token
        state.user = payload.user
      }
    )
  },
  initialState: { token: null, user: null } as AuthState,
  name: 'auth',
  reducers: {},
})

export default slice.reducer

export const selectCurrentUser = (state: RootState) => state.auth.user
