import { useContext, useEffect, useRef, useCallback,memo, useMemo} from "react";
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
import "../../App.css"
import "../Editor/styles/Resize.css"
import "../Editor/styles/Editor.css"

//buttoms
import Downloadbtn from "../../components/Download/Downloadbtn.jsx";
import minimizeIcon from "../../assets/minimize.svg" ;
import maximizeIcon from "../../assets/maximize.svg" ;
import DownloadAll from "../../components/Download/DownloadAll.jsx";

import { Controlled as ControlledEditorSlow } from "react-codemirror2";
import { SettingsContext } from "../../App.jsx";

//utils
import { sanitizeHTML, isEmptyExcluding } from "../../utils/functions.js";
import {tabornotAtom,autoCloseTagsAtom,allowResizeAtom,maxHeightInSmallScreenAtom} from "../../Store/EditorSettingsStore.jsx";
import {themeAtom} from "../../Store/ThemeSettingsStore.jsx";
import { useAtomValue } from "jotai";






const contentTypes = {
  xml: {value:"html", type: "text/xml", name: "index.html", placeholder: "<!-- Drag and drop your HTML file here or start writing -->" },
  css: {value:"css", type: "text/css", name: "style.css", placeholder: "/* Drag and drop your CSS file here or start writing */" },
  javascript: {value:"js", type: "text/javascript", name: "script.js", placeholder: "// Drag and drop your JS file here or start writing" },
  markdown: {value:"md", type: "text/markdown", name: "markdown.md", placeholder: "# Drag and drop your Markdown file here or start writing" },
};



const ControlledEditor = memo(ControlledEditorSlow);


const Editor = (props) => {
  const { editor } = useContext(SettingsContext);

  const tabornot=useAtomValue(tabornotAtom);
  const autoCloseTags=useAtomValue(autoCloseTagsAtom);
  const allowResize=useAtomValue(allowResizeAtom);
  const maxHeightInSmallScreen=useAtomValue(maxHeightInSmallScreenAtom);


  const theme=useAtomValue(themeAtom);
  
  useEffect(() => {
  console.log(document.getElementsByClassName("CodeMirror-lines")[0])
  }, [theme])

  const editorRef = useRef(0);
  const editorContainerRef = useRef(null);

  const {
    language,
    displayname,
    value,
    onChange,
    minimized,
    handleMinimize,
    editorWidth,
    setEditorWidth,
  } = props;


  const handleChange =useCallback((editor, data, value) => {
    onChange(value);
  },[]);

  useEffect(() => {
    const adjustLines = () => {
      if (window.innerWidth > 768) {
        let is_empty = isEmptyExcluding(value, ["\n", "\t", " "]);
        if (is_empty) {
          let expectedLineCount = Math.min(Math.max(Math.floor(editorRef.current.editor.display.lastWrapHeight / 24) - 1, 5), 15);
          let newValue = contentTypes[language].placeholder + "\n".repeat(expectedLineCount - 1);
          onChange(newValue);
        } else {
          onChange(value);
        }
      } else {
        let expectedLineCount = Math.min(Math.max(Math.floor(editorRef.current.editor.display.lastWrapHeight / 24) - 1, 5), 15);
        let lineCount = value.split(`\n`).length;
        if (lineCount < expectedLineCount) {
          let newValue = value + "\n".repeat(expectedLineCount - lineCount);
          onChange(newValue);
        }
      }
    };
    adjustLines();
  }, []);



  const download =useCallback(
    () => {
    const link = document.createElement('a');
    const downloadableValue = language === "xml" ? sanitizeHTML(value) : value;
    const content = new Blob([downloadableValue], { type: `${contentTypes[language].type};charset=utf-8` });
    link.href = URL.createObjectURL(content);
    link.download = contentTypes[language].name;
    link.click();
    URL.revokeObjectURL(link.href);
  }, [language, value]);



  const handleResize = (event) => {
    handleMinimize(true);
    event.stopPropagation();
    document.body.style.userSelect = "none";

    const settingWidth = (e) => {
      e.stopPropagation();
      setEditorWidth(editorContainerRef.current.getBoundingClientRect().width + (e.type === "touchmove" ? e.touches[0].clientX : e.clientX) - editorContainerRef.current.getBoundingClientRect().right);
    };

    const endResize = () => {
      removeEventListener(event.type === "touchstart" ? "touchmove" : "mousemove", settingWidth);
      document.body.style.userSelect = "auto";
    };

    addEventListener(event.type === "touchstart" ? "touchmove" : "mousemove", settingWidth);
    addEventListener(event.type === "touchstart" ? "touchend" : "mouseup", endResize);
  };


  const editorOptions=useMemo(()=>{
    return {
      lineWrapping: true,
      lint: true,
      inputStyle: "textarea",
      lineNumbers: true,
      mode: language,
      theme: theme,
      autoCloseBrackets: autoCloseTags,
      autoCloseTags: autoCloseTags,
      matchBrackets: true,
      undoDepth: 400,
    }
  },[language,theme,autoCloseTags]);

  let editorClassName=useMemo(()=>`code-mirror-wrapper ${maxHeightInSmallScreen?"full-height":""}`,[maxHeightInSmallScreen]) ;





  return (
    <div className={`editor-container ${minimized === true ? "collapsed" : minimized === false ? "maximized" : ""}`} style={minimized === "resize" ? { flex: "0 1 auto", width: editorWidth,  position: "relative",minWidth:`${language=="markdown"&&"150px"}` } : {}} ref={editorContainerRef}>
      <div className={`editor-title ${language}`}>
        <div>{displayname}</div>
        <div style={{ display: 'flex', flexDirection: "row", marginLeft: "5px" }}>
          {language === "xml" && <DownloadAll title={"Combine into Single HTML"} code={props.code}/>}
          <Downloadbtn onClickfn={download} title={"Download " + contentTypes[language].name} />
          {!tabornot && editor !== 'markdown' && <button onClick={() => handleMinimize(false)} className="editor-button"><img src={minimized ? maximizeIcon : minimizeIcon} alt={!minimized ? "><" : "<>"} /></button>}
        </div>
      </div>

      <ControlledEditor onBeforeChange={handleChange} value={value} className={editorClassName} options={editorOptions} ref={editorRef} />

      {!!allowResize && tabornot==false && <div className="resizeBar" onMouseDown={handleResize} onTouchStart={handleResize}></div>}
    </div>
  );
};

export default memo(Editor);
