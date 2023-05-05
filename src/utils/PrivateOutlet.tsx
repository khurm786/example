import { Navigate, Outlet, useLocation } from 'react-router-dom'

import { useAuth } from '../store/useAuth'

const PrivateOutlet = () => {
  const auth = useAuth()
  const location = useLocation()

  return auth && auth.user ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  )
}

export default PrivateOutlet
