import {createContext} from 'react'

import './App.css'
import { Outlet } from 'react-router-dom';
import useUrl from './hooks/UrlClassify';
import useUser from './hooks/user';
export const SettingsContext = createContext()
export const ProjectCodeContext=createContext();
export const SetProjectCodeContext=createContext();

export default function App() {

  //editor settings
    const editor = useUrl(); 
    const [user, setUser] = useUser();
  
    const contextValues = {
      editor,
      user,
      setUser,
    };

  return (
    <>
    <SettingsContext.Provider value={contextValues}>
      <Outlet/>
    </SettingsContext.Provider>
    </>
  )
}


