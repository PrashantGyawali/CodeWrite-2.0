import {createContext} from 'react'

import './App.css'
import { Outlet } from 'react-router-dom';
import useLocalStorage from './hooks/localstorage';
import useUrl from './hooks/UrlClassify';
import useUser from './hooks/user';
export const SettingsContext = createContext()


export default function App() {

  //editor settings
    const editor = useUrl();  //sets the default editor to webeditor
    const [theme, setTheme] = useLocalStorage("theme","material");
    const [tabornot, setTabornot] = useLocalStorage("tabornot",false);
    const [autorun, setAutorun] = useLocalStorage("autorun",true);
    const [autoCloseTags, setAutoCloseTags] = useLocalStorage("autoclosetags",true);
    const [user, setUser] = useUser();


  return (
    <>
    <SettingsContext.Provider value={{editor,theme,setTheme,tabornot,setTabornot,autorun,setAutorun,autoCloseTags,setAutoCloseTags,user,setUser}}>
      <Outlet/>
    </SettingsContext.Provider>
    </>
  )
}


