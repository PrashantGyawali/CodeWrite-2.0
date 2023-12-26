import {createContext} from 'react'

import './App.css'
import { Outlet , useLocation} from 'react-router-dom';
import useLocalStorage from './hooks/localstorage';

export const SettingsContext = createContext()


export default function App() {

  const location=useLocation();

  const useUrl=()=>{
    if(String(location.pathname).includes("web"))
    return "webeditor";
    else if(String(location.pathname).includes("md"))
    return "markdown";
  }

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


