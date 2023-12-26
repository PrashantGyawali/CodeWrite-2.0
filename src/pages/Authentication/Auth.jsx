import React from 'react'
import { Outlet } from 'react-router-dom'
import LoginNavComponent from '../../components/LoginNavBar'

export default function Auth() {
  return (
    <>
        <LoginNavComponent/>
            <Outlet/>
    </>
    )
}
