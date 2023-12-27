import {createContext} from 'react'

import './App.css'
import { Outlet } from 'react-router-dom';
import useLocalStorage from './hooks/localstorage';
import useUrl from './hooks/UrlClassify';

export const SettingsContext = createContext()


export default function App() {

  //editor settings
    const editor = useUrl();  //sets the default editor to webeditor
    const [theme, setTheme] = useLocalStorage("theme","material");
    const [tabornot, setTabornot] = useLocalStorage("tabornot",false);
    const [autorun, setAutorun] = useLocalStorage("autorun",true);
    const [autoCloseTags, setAutoCloseTags] = useLocalStorage("autoclosetags",true);


  return (
    <>
    <SettingsContext.Provider value={{editor,theme,setTheme,tabornot,setTabornot,autorun,setAutorun,autoCloseTags,setAutoCloseTags}}>
      <Outlet/>
    </SettingsContext.Provider>
    </>
  )
}


