import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom';
import { SettingsContext } from '../App';
export default function Protected({element}) {
    const Element=element;
    const {user}=useContext(SettingsContext);
    console.log(user);
    return (
        <>{user.isAuth?<Element/>:<Navigate to="/auth" />}</>
    )
}
