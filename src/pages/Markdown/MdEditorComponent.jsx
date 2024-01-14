import {useState, useContext, useEffect, useRef} from "react";
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/cobalt.css'
import 'codemirror/theme/material.css'
import 'codemirror/theme/xq-dark.css'
import 'codemirror/theme/the-matrix.css'
import 'codemirror/theme/night.css'
import 'codemirror/theme/3024-day.css'

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
import minimizeIcon from "../../assets/minimize.svg";
import maximizeIcon from "../../assets/maximize.svg";

import { Controlled as ControlledEditor } from "react-codemirror2";
import { SettingsContext } from "../../App.jsx";

//utils
import { isEmptyExcluding } from "../../utils/functions.js";



const contentTypes = {
  markdown: { type: "text/markdown", name: "markdown.md", placeholder: "# Drag and drop your Markdown file here or start writing" },
};

const Editor = (props) => {
  const { theme, autoCloseTags } = useContext(SettingsContext);
  const editorRef = useRef(0);
  const editorContainerRef = useRef(null);
  const [editorWidth, setEditorWidth] = useState("auto");

  const {
    language,
    displayname,
    value,
    onChange,
    minimized,
    handleMinimize,
  } = props;

  const handleChange = (editor, data, value) => {
    onChange(value);
  };

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

  const download = () => {
    const link = document.createElement('a');
    const downloadableValue = value;
    const content = new Blob([downloadableValue], { type: `${contentTypes["markdown"].type};charset=utf-8` });
    link.href = URL.createObjectURL(content);
    link.download = contentTypes[language].name;
    link.click();
    URL.revokeObjectURL(link.href);
  };

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

  return (
    <div className={`editor-container h-90vh ${minimized!="resize"?"markdowneditor":""} ${minimized==true?"minimized":""}`} style={minimized === "resize" ? { flex: "0 1 auto", width: editorWidth,  position: "relative",minWidth:"200px",overflowY:"auto",overflowX:"hidden" }:{}} ref={editorContainerRef}>
      <div className={`editor-title ${language}`}>
        <div>{displayname}</div>
        <div style={{ display: 'flex', flexDirection: "row", marginLeft: "5px" }}>
          <Downloadbtn onClickfn={download} title={"Download " + contentTypes[language].name} />
          <button className="editor-button" onClick={() => handleMinimize(false)}><img src={minimized ? maximizeIcon : minimizeIcon} alt={!minimized ? "><" : "<>"} /></button>
        </div>
      </div>
      <div className={`flexcolgrow ${minimized && "md-minimize"}`}>
        <ControlledEditor onBeforeChange={handleChange} value={value} className="code-mirror-wrapper" options={{
          lineWrapping: true,
          lint: true,
          inputStyle: "textarea",
          lineNumbers: true,
          mode: "markdown",
          theme: theme,
          autoCloseBrackets: autoCloseTags,
          autoCloseTags: autoCloseTags,
          matchBrackets: true,
          undoDepth: 400,
        }} ref={editorRef} />
      </div>
      <div className="resizeBar" onMouseDown={handleResize} onTouchStart={handleResize}></div>
    </div>
  );
};

export default Editor;
