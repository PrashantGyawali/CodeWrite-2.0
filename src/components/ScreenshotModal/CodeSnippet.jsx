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
import { scFontSizeAtom, scFontStyleAtom, scLineHeightAtom, scLineNumberAtom, scShadowAtom, scTitleBarAtom } from "../../Store/ScreenshotStore.jsx";

const ControlledEditor = memo(ControlledEditorSlow);



const fontMap={
  "Ubuntu Mono":`"Ubuntu Mono", monospace`,
  "Fira Code":`"Fira Code", monospace`,
  "VT323":`"VT323", monospace`,
  "Source Code Pro":`"Source Code Pro", monospace`,
  "Press Start 2P":`"Press Start 2P", system-ui`,
  "DynaPuff":`"DynaPuff", system-ui`,
  "Monospace":`monospace`
}


const CodeSnippet = (props) => {

  const theme=useAtomValue(themeAtom);
  const lineNumbers=useAtomValue(scLineNumberAtom)
  const shadows =useAtomValue(scShadowAtom)
  const titleBarPresence=useAtomValue(scTitleBarAtom);
  const fontSize=useAtomValue(scFontSizeAtom);
  const lineHeight=useAtomValue(scLineHeightAtom);
  const fontStyle=useAtomValue(scFontStyleAtom);

  const {language,value} = props;

  const editorClassName="has-titlebar";


const handleChange=()=>{} 

  const editorOptions=useMemo(()=>{
    return {
        lineWrapping: true,
        lint: true,
        inputStyle: "textarea",
        lineNumbers: lineNumbers,
        mode: language,
        theme: theme,
        matchBrackets: true,
        readOnly:"nocursor",
        viewportMargin: Infinity,
    }
  },[language,theme,lineNumbers]);

  const handleClasses={
    "top":"top-resize resize",
    "bottom":"bottom-resize resize",
    "left":"left-resize resize",
    "right":"right-resize resize",
}
  const titleBarRef=useRef(null);

  function handleTitleBarWidthSync(){
    titleBarRef.current.style.width=document.querySelector(".codesnippet-div").getBoundingClientRect().width+"px";
  }
  useEffect(() => {
    titleBarRef.current.style.width=document.querySelector(".codesnippet-div").getBoundingClientRect().width+"px";
    window.addEventListener("resize",handleTitleBarWidthSync);
    return () => {
      window.removeEventListener("resize",handleTitleBarWidthSync)
    }
  },[fontSize]);

  return (<>
    <TitleBar titleBarRef={titleBarRef} type={language}/>
    <Resizable className={`codesnippet-div ${titleBarPresence?"rounded-bottom":"rounded-all"} ${shadows?"snippet-shadow":""}`} defaultSize={{width:"90%"}} style={{fontSize:fontSize+"px",lineHeight:lineHeight+"em",fontFamily:fontMap[fontStyle]}} maxHeight={props.maxHeight} handleClasses={handleClasses} onClick={(e)=>e.stopPropagation()}  onResize={handleTitleBarWidthSync}>
        <ControlledEditor onBeforeChange={handleChange} value={value} className={editorClassName} options={editorOptions} />
    </Resizable>
  </>
  );
};

export default memo(CodeSnippet);
