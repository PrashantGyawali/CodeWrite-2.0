import { Outlet } from "react-router-dom"
import LoginNavComponent from "../../components/LoginNavBar"
export default function DefaultNavOnlyPage() {
  return (
    <>
        <LoginNavComponent/>
        <Outlet />
    </>
    )
}
