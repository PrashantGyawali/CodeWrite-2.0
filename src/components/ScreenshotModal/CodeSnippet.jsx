import {useRef, memo, useMemo, useEffect} from "react";
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/cobalt.css'
import 'codemirror/theme/material.css'
import 'codemirror/theme/xq-dark.css'
import 'codemirror/theme/the-matrix.css'
import 'codemirror/theme/night.css'
import 'codemirror/theme/3024-day.css'

import 'codemirror/mode/xml/xml'
import 'codemirror/mode/css/css'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/markdown/markdown'

import 'codemirror/addon/edit/closebrackets'
import 'codemirror/addon/edit/closetag'
import 'codemirror/addon/lint/lint'
import 'codemirror/addon/display/autorefresh'
import 'codemirror/addon/edit/matchbrackets'

//css
import "./ScreenshotModal.css"


import { Controlled as ControlledEditorSlow } from "react-codemirror2";

import {themeAtom} from "../../Store/ThemeSettingsStore.jsx";
import { useAtomValue } from "jotai";

import { Resizable } from 're-resizable';
import TitleBar from "./Titlebar.jsx";
import { scTitleBarAtom } from "../../Store/ScreenshotStore.jsx";

const ControlledEditor = memo(ControlledEditorSlow);






// todo: make it responsive on resizing, add toogle to show ... or -+x or none

const CodeSnippet = (props) => {

  const theme=useAtomValue(themeAtom);
  const titleBarPresence=useAtomValue(scTitleBarAtom);
  
  const {language,value,lineNumbers} = props;

  const editorClassName="has-titlebar";


const handleChange=()=>{} 

  const editorOptions=useMemo(()=>{
    return {
        lineWrapping: true,
        lint: true,
        inputStyle: "textarea",
        lineNumbers: true,
        mode: language,
        theme: theme,
        matchBrackets: true,
        readOnly:"nocursor",
        viewportMargin: Infinity,

    }
  },[language,theme]);

  const handleClasses={
    "top":"top-resize resize",
    "bottom":"bottom-resize resize",
    "left":"left-resize resize",
    "right":"right-resize resize",
}

  const titleBarRef=useRef(null);

  function handleWidthSync(){
    titleBarRef.current.style.width=document.querySelector(".codesnippet-div").getBoundingClientRect().width+"px";
  }
  useEffect(() => {
    titleBarRef.current.style.width=document.querySelector(".codesnippet-div").getBoundingClientRect().width+"px";
    window.addEventListener("resize",handleWidthSync);

    return () => {
      window.removeEventListener("resize",handleWidthSync)
    }
  },[]);

  return (<>
    <TitleBar titleBarRef={titleBarRef} type={language}/>
    <Resizable className={`codesnippet-div ${titleBarPresence?"rounded-bottom":"rounded-all"}`} defaultSize={{width:"90%"}}  maxHeight={props.maxHeight} handleClasses={handleClasses} onClick={(e)=>e.stopPropagation()}  onResize={handleWidthSync}>
        <ControlledEditor onBeforeChange={handleChange} value={value} className={editorClassName} options={editorOptions} />
    </Resizable>
  </>
  );
};

export default memo(CodeSnippet);
