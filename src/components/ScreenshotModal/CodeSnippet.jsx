import {useRef, memo, useMemo} from "react";
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
//buttoms


import { Controlled as ControlledEditorSlow } from "react-codemirror2";

import {themeAtom} from "../../Store/ThemeSettingsStore.jsx";
import { useAtomValue } from "jotai";

import { Resizable } from 're-resizable';



const ControlledEditor = memo(ControlledEditorSlow);


const CodeSnippet = (props) => {


  const theme=useAtomValue(themeAtom);
  


  const editorRef = useRef(0);

  const {
    language,
    value,
  } = props;



  const editorClassName="";




const handleChange=()=>{}

  const editorOptions=useMemo(()=>{
    return {
        lineWrapping: true,
        lint: true,
        inputStyle: "textarea",
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

  return (
    <Resizable className="codesnippet-div" defaultSize={{width:"90%"}} maxHeight={props.maxHeight} handleClasses={handleClasses} onClick={(e)=>e.stopPropagation()}>
        <ControlledEditor onBeforeChange={handleChange} value={value} className={editorClassName} options={editorOptions} ref={editorRef} />
    </Resizable>

  );
};

export default memo(CodeSnippet);
