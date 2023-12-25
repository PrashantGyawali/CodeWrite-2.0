import {createContext} from 'react'

import './App.css'
import { Outlet } from 'react-router-dom';
import useLocalStorage from './hooks/localstorage';

export const SettingsContext = createContext()

export default function App() {

  //editor settings
    const [editor, setEditor] = useLocalStorage("editor","webeditor");  //sets the default editor to webeditor
    const [theme, setTheme] = useLocalStorage("theme","material");
    const [tabornot, setTabornot] = useLocalStorage("tabornot",false);
    const [autorun, setAutorun] = useLocalStorage("autorun",true);
    const [autoCloseTags, setAutoCloseTags] = useLocalStorage("autoclosetags",true);


  return (
    <>
    <SettingsContext.Provider value={{editor,setEditor,theme,setTheme,tabornot,setTabornot,autorun,setAutorun,autoCloseTags,setAutoCloseTags}}>
      <Outlet/>
    </SettingsContext.Provider>
    </>
  )
}


