import { useState, useEffect, memo, useRef, useCallback, useContext} from "react";
import Editor from "../Editor/Editor";
import "../../App.css";

import Nav from "react-bootstrap/Nav";
import useLocalStorage from "../../hooks/localstorage";

import {tabornotAtom} from "../../Store/EditorSettingsStore";
import { useAtomValue } from "jotai";
import { ProjectCodeContext, SetProjectCodeContext } from "../../App";


import VerticalResize from "./VerticalResize/VerticalResize";



function WebEditorBody() {

  const tabornot= useAtomValue(tabornotAtom);

  const code=useContext(ProjectCodeContext);
  const setCode=useContext(SetProjectCodeContext);
  
  const [lastOpened, setLastOpened] = useLocalStorage("lastOpened", {web:"",md:""});
  
  const [html, setHtml] = useState(code?.html||"");
  const [css, setCss] = useState(code?.css||"");
  const [js, setJs] = useState(code?.js||"");
  
  useEffect(() => {
    setCode({...code,html:html,css:css,js:js});
  }, [html, css, js]);


  // handling tabs if user has enabled show as tabs
  const [tabstate, setTabstate] = useState(1);



  //for minimizing if not tabs
  const [htmlMinimize, setHtmlMinimize] = useState(false);
  const [cssMinimize, setCssMinimize] = useState(false);
  const [jsMinimize, setJsMinimize] = useState(false);


  const [htmlWidth, setHtmlWidth] = useState("auto");
  const [cssWidth, setCssWidth] = useState("auto");
  const [jsWidth, setJsWidth] = useState("auto");

  
  //prevent minimizing if 2 editors are already minimized except on smaller screens, to prevent looking odd
  const handleMinimize = (fn, prevValue,resize) => {
    let sizeStore={
      //true means minimzed and flase means maximazed
      true:0,false:0,resize:0
    }

    sizeStore[htmlMinimize]+=1;
    sizeStore[cssMinimize]+=1;
    sizeStore[jsMinimize]+=1;
    if(!resize)
    {
      //stopping minimization if two are already minimized is not necessary on mobiles since the editors are not in same row
      if (window.innerWidth > 768) {
        if ((prevValue==false ) && (sizeStore["resize"]+sizeStore["true"])<2) {
          //minimize the editor
          fn(true);
        } else if (prevValue==true || prevValue== "resize") {
          //maximize the editor
          fn(false);
        }
      }
      else {
        //toggle the editor size
          fn(!prevValue);   
      }
    }
    else{
      //due to problems in resizing, we are not allowing to minimize or resize if 2 editors are already minimized
      if((sizeStore["resize"]+sizeStore["true"])<2 || (prevValue==true && ((sizeStore["true"]-1+sizeStore["resize"])<2)) || prevValue== "resize")
      {    fn("resize");  }
    }
  }

  const handleHtmlMinimize = useCallback((resize) => {
    handleMinimize(setHtmlMinimize, htmlMinimize,resize);
  },[htmlMinimize]);

  const handleCssMinimize = useCallback((resize) => {
    handleMinimize(setCssMinimize, cssMinimize,resize);
  },[cssMinimize]);

  const handleJsMinimize = useCallback((resize) => {
    handleMinimize(setJsMinimize, jsMinimize,resize);
  },[jsMinimize]);


  useEffect(() => {

    if(!code || !setCode)
    {
      navigate(`/projects/web`);
    }

    else{
      if(code?.id)
      {
        setLastOpened({web:code.id,md:lastOpened.md});
      }
    }},[]);


  const editorContainerRef = useRef(null);
  const [editorHeight, setEditorHeight] = useState("50vh");


  return (
    <>
      {!tabornot ? (
        <>
          <div className="pane top-pane d-inline d-md-flex position-relative" ref={editorContainerRef} style={{height:editorHeight}}>
            <Editor
              language="xml"
              displayname="HTML"
              value={html}
              onChange={setHtml}
              minimized={htmlMinimize}
              handleMinimize={handleHtmlMinimize}
              code={code}
              editorWidth={htmlWidth}
              setEditorWidth={setHtmlWidth}
            />
            <Editor
              language="css"
              displayname="CSS"
              value={css}
              onChange={setCss}
              minimized={cssMinimize}
              handleMinimize={handleCssMinimize}
              editorWidth={cssWidth}
              setEditorWidth={setCssWidth}
            />
            <Editor
              language="javascript"
              displayname="JS"
              value={js}
              onChange={setJs}
              minimized={jsMinimize}
              handleMinimize={handleJsMinimize}
              editorWidth={jsWidth}
              setEditorWidth={setJsWidth}
            />
            <VerticalResize setEditorHeight={setEditorHeight} editorContainerRef={editorContainerRef} />
          </div>
        </>
      ) : (
        <>
          <Nav variant="tabs" defaultActiveKey="link-1" data-bs-theme="dark">
            <div className="d-flex pl-3">
              <Nav.Item>
                <Nav.Link
                  eventKey="link-1"
                  onClick={() => setTabstate(1)}
                  className="xml"
                >
                  HTML
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  eventKey="link-2"
                  onClick={() => setTabstate(2)}
                  className="css"
                >
                  CSS
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  eventKey="link-3"
                  onClick={() => setTabstate(3)}
                  className="javascript"
                >
                  JS
                </Nav.Link>
              </Nav.Item>
            </div>
          </Nav>

          {tabstate == 1 && (
            <div className="pane top-pane">
              <Editor
                language="xml"
                displayname="HTML"
                value={html}
                onChange={setHtml}
                code={code}
              />
            </div>
          )}
          {tabstate == 2 && (
            <div className="pane top-pane">
              <Editor
                language="css"
                displayname="CSS"
                value={css}
                onChange={setCss}
              />
            </div>
          )}
          {tabstate == 3 && (
            <div className="pane top-pane">
              <Editor
                language="javascript"
                displayname="JS"
                value={js}
                onChange={setJs}
              />
            </div>
          )}
        </>
      )}
    </>
  );
}

export default memo(WebEditorBody)