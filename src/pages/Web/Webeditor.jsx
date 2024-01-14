import { useState, useEffect, useContext, useRef, createContext} from "react";
import Editor from "../Editor/Editor";
import "../../App.css";
import NavComponent from "../../components/Navbar";
import { SettingsContext } from "../../App";
import { combineIntoHTML} from "../../utils/functions";
import htmlWithConsole from "./htmlConsole";

import runbtn from "../../assets/run.svg";

import Nav from "react-bootstrap/Nav";
import useProject from "../../hooks/ProjectFunctions";
import useLocalStorage from "../../hooks/localstorage";

import { useParams,useNavigate } from "react-router-dom";



export const ProjectContext = createContext();





export default function WebEditor() {
  const urlParams=useParams();
  const navigate=useNavigate();
  
  const [code, setCode] = useProject("web",urlParams.id); 
  const [lastOpened, setLastOpened] = useLocalStorage("lastOpened", {web:"",md:""});


//for tab or not nd run btn
  const { tabornot, autorun, showConsoleOnError, showConsole } = useContext(SettingsContext);

  const [html, setHTML] = useState( code?.html || "");
  const [css, setCss] = useState(code?.css || "");
  const [js, setJs] = useState(code?.js || "");



  //for iframe
  const [srcDoc, setSrcDoc] = useState(htmlWithConsole(html,css,js,showConsole,showConsoleOnError));



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
  };

  const handleHtmlMinimize = (resize) => {
    handleMinimize(setHtmlMinimize, htmlMinimize,resize);
  };
  const handleCssMinimize = (resize) => {
    handleMinimize(setCssMinimize, cssMinimize,resize);
  };
  const handleJsMinimize = (resize) => {
    handleMinimize(setJsMinimize, jsMinimize,resize);
  };


  useEffect(() => {

    if(!code || !setCode)
    {
      navigate(`/projects/web`);
    }

    else{
      setLastOpened({web:urlParams.id,md:lastOpened.md});
      // setCode({html:html,css:css,js:js});
      if (autorun) {
        const timeout = setTimeout(() => {
          setSrcDoc(
          htmlWithConsole(html,css,js,showConsole,showConsoleOnError)
          );
        }, 1000);
  
        return () => clearTimeout(timeout);
      }
    }
  }, [html, css, js,showConsole,showConsoleOnError]);

// dont cause reinitialization of lastModified date on entering
  const renderCount=useRef(0);
  useEffect(()=>{
    if(renderCount.current>0)
    {
      setCode({html:html,css:css,js:js});
    }
    else{
      renderCount.current+=1;
    }
  },[html,css,js]);



// handle download all
  const handleDownloadAllClick = () => {
    const link = document.createElement('a');
    let  downloadableValue=combineIntoHTML(html,css,js);

    // console.log(downloadableValue);
    const content=new Blob([downloadableValue],{type:`text/xml`,name:"index.html"});
    link.href=URL.createObjectURL(content);
    link.download="index.html";
    link.click();
    URL.revokeObjectURL(link.href);
    link.remove();
  }

  return (
    <>
    
    <ProjectContext.Provider value={{code,setCode}}>
        <NavComponent project={code} setProject={setCode}/>
    </ProjectContext.Provider>


      {!tabornot ? (
        <>
          <div className="pane top-pane d-inline d-md-flex">
            <Editor
              language="xml"
              displayname="HTML"
              value={html}
              onChange={setHTML}
              minimized={htmlMinimize}
              handleMinimize={handleHtmlMinimize}
              handleDownloadAllClick={handleDownloadAllClick}
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
                onChange={setHTML}
                handleDownloadAllClick={handleDownloadAllClick}
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

      <div className="pane bottom-pane" style={{ position: "relative" }}>
        <iframe
          srcDoc={srcDoc}
          title="output"
          sandbox="allow-scripts allow-modals allow-forms"
          style={{flexGrow:1}}
        ></iframe>
        {!autorun && (
          <button
            onClick={() =>
              setSrcDoc(htmlWithConsole(html,css,js,showConsole,showConsoleOnError ))
            }
            className="run-button"
          >
            <img src={runbtn} alt="" />
          </button>
        )}
      </div>
    </>
  );
}

