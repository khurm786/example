import { configureStore } from '@reduxjs/toolkit'

import authReducer from '../features/auth/authSlice'
import { authApi } from '../services/auth'

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    auth: authReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
