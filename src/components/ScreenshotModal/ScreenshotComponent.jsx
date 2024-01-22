import { memo,useRef,useState,useCallback} from "react";
import { ProjectCodeContext, SettingsContext } from '../../App';
import { useContext,useEffect} from "react";
import { Button, Nav } from "react-bootstrap";

import CodeSnippet from "./CodeSnippet";

import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image';

import screenshotIcon from "../../assets/screenshotIcon.svg"

import { Resizable } from 're-resizable';

const ModalComponent = (props) => {
    const code = useContext(ProjectCodeContext);
    const {editor}=useContext(SettingsContext);
    const [tabstate, setTabstate] = useState(1);

    const { handleClose } = props;

    const {html,css,js,md}=code; 

    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "unset";
        }
    }, [])

    const editorContainerRef = useRef(null);

    const handleClasses={
        "top":"top-resize resize",
        "bottom":"bottom-resize resize",
        "left":"left-resize resize",
        "right":"right-resize resize",
    }

    const heightRef=useRef(null);
    const [minHeight,setMinHeight]=useState("auto");
    const [maxHeight,setMaxHeight]=useState(0);

    function setHeights(){
        setMinHeight(heightRef.current.querySelector(".codesnippet-div").getBoundingClientRect().height);
        setMaxHeight(document.querySelector(".resizeable-component").getBoundingClientRect().height);
    }

    useEffect(() => {
        document.querySelector(".resizeable-component").style.height=document.querySelector(".resizeable-component").getBoundingClientRect().height+
        (document.querySelector(".resizeable-component").getBoundingClientRect().width- document.querySelector(".codesnippet-div").getBoundingClientRect().width)*0.8+"px";
        setHeights();
    }, [tabstate])



    const downloadImage = useCallback(() => {
        let node=document.querySelector(".resizeable-component");
    if (!node) {
        return
    }

    toPng(node, { cacheBust: true, })
        .then((dataUrl) => {
        const link = document.createElement('a')
        link.download = 'code-snippet.png'
        link.href = dataUrl
        link.click();
        })
        .catch((err) => {
        console.log(err)
        })
    })

    const [color,setColor]=useState("#00FFFF");
    const colorPickerRef=useRef(null);
    const colorPickerFn=useCallback((e)=>{
        const colorPicker=colorPickerRef.current;
        colorPicker.click();      
    },[])

    return (
        <>
            <div className="codesnippet-modal " >
            
            <div style={{height:"1vh",minWidth:"270px !important",padding:"15px"}} ref={editorContainerRef}  >
                
                <Nav variant="tabs"  defaultActiveKey="link-1" data-bs-theme="dark">
                    <div className="d-flex w-100 justify-content-start container ">
                        
                        {editor=="web" && 
                        <div className="d-flex">
                        <Nav.Item >
                            <Nav.Link
                                eventKey="link-1"
                                onClick={() => setTabstate(1)}
                                className="xml px-2">
                                HTML
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link
                                eventKey="link-2"
                                onClick={() => setTabstate(2)}
                                className="css px-2"
                            >
                                CSS
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link
                                eventKey="link-3"
                                onClick={() => setTabstate(3)}
                                className="javascript px-2"
                            >
                                JS
                            </Nav.Link>
                        </Nav.Item>
                        </div>
                        }
                        {editor=="md" &&
                        <div className="d-flex">
                        <Nav.Item >
                            <Nav.Link
                                eventKey="link-1"
                                className="markdown px-2">
                                Markdown
                            </Nav.Link>
                        </Nav.Item>
                        </div>
                        }   
                        <div className="ms-auto d-flex align-items-center ">
                            <input type="color" id="colorPicker" value={color} onChange={(e)=>setColor(e.target.value)} ref={colorPickerRef}></input>
                            <Button variant="dark" onClick={downloadImage}><img src={screenshotIcon}></img></Button>
                            <Button variant="dark" onClick={handleClose}>Close</Button>
                        </div>
                    </div>
                </Nav>



                {tabstate == 1 && editor=="web" && (
                <Resizable style={{backgroundColor:color}} className="resizeable-component" handleClasses={handleClasses} defaultSize={{width:"80vw"}} onResize={(...e)=>{setHeights( )}} minHeight={minHeight+"px"} onClick={colorPickerFn} >
                        <div style={{minHeight:"1vh", padding:"5px", display:"flex",width:"100%",justifyContent:"center",alignItems:"center", maxHeight:`100%`}} ref={heightRef}>
                            <CodeSnippet value={html} language="xml" maxHeight={maxHeight}/>
                        </div>
                </Resizable>
                )}
                {tabstate == 2 && (
                <Resizable style={{backgroundColor:color}} className="resizeable-component" handleClasses={handleClasses} defaultSize={{width:"80vw"}} onResize={(...e)=>{setHeights()}} minHeight={minHeight+"px"} onClick={colorPickerFn} >
                    <div style={{minHeight:"1vh", padding:"5px", display:"flex",width:"100%",justifyContent:"center",alignItems:"center", maxHeight:`100%`}} ref={heightRef}>
                        <CodeSnippet value={css} language="css" maxHeight={maxHeight}/>
                    </div>
                </Resizable>
                )}
                {tabstate == 3 && (
                <Resizable style={{backgroundColor:color}} className="resizeable-component" handleClasses={handleClasses} defaultSize={{width:"80vw"}} onResize={(...e)=>{setHeights()}} minHeight={minHeight+"px"} onClick={colorPickerFn} >
                    <div style={{minHeight:"1vh", padding:"5px", display:"flex",width:"100%",justifyContent:"center",alignItems:"center", maxHeight:`100%`}} ref={heightRef}>
                        <CodeSnippet value={js} language="javascript" maxHeight={maxHeight}/>
                    </div>
                </Resizable>
                )}
                {tabstate == 1 && editor=="md" &&(
                <Resizable style={{backgroundColor:color}} className="resizeable-component" handleClasses={handleClasses} defaultSize={{width:"80vw"}} onResize={(...e)=>{setHeights()}} minHeight={minHeight+"px"} onClick={colorPickerFn} >
                    <div style={{minHeight:"1vh", padding:"5px", display:"flex",width:"100%",justifyContent:"center",alignItems:"center", maxHeight:`100%`}} ref={heightRef}>
                        <CodeSnippet value={md} language="markdown" maxHeight={maxHeight}/>
                    </div>
                </Resizable>
                )}

                </div>
            </div>
</>
    );
}

export default memo( ModalComponent );