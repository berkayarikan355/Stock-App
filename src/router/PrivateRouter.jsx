import { useSelector } from "react-redux"
import { Navigate, Outlet, useRouteError } from "react-router-dom"

const PrivateRouter = () => {
  const {user} = useSelector(state => state.auth)

  return user ? <Outlet /> : <Navigate to="/" />
}

export default PrivateRouter
