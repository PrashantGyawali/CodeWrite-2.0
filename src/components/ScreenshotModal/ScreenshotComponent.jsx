import { memo,useRef,useState,useCallback} from "react";
import { ProjectCodeContext, SettingsContext } from '../../App';
import { useContext,useEffect} from "react";
import { Button, CloseButton,Dropdown } from "react-bootstrap";

import CodeSnippet from "./CodeSnippet";

import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image';

import screenshotIcon from "../../assets/screenshotIcon.svg"

import { Resizable } from 're-resizable';


import { useAtom, useAtomValue } from "jotai";
import { scFontSizeAtom, scLineHeightAtom, scTitleBarAtom,scTitleBarTypeAtom,scBgColorAtom,scBgTypeAtom, scBgImageAtom, scFontStyleAtom } from "../../Store/ScreenshotStore";

import SnippetSettings from "./SnippetSettings" ;
import BgSelect from "./BgSelect";

import settingsIcon from "../../assets/settingsIcon.svg";
import language from "react-syntax-highlighter/dist/esm/languages/hljs/1c";

const ModalComponent = (props) => {

    const titleBarPresence=useAtomValue(scTitleBarAtom);
    const titleBarType=useAtomValue(scTitleBarTypeAtom);
    const [settingsOpen,setSettingsOpen]=useState(false);

    const fontSize=useAtomValue(scFontSizeAtom);
    const lineHeight=useAtomValue(scLineHeightAtom)
    const fontStyle=useAtomValue(scFontStyleAtom)

    useEffect(() => {setHeights()},[titleBarPresence,titleBarType]);

    const code = useContext(ProjectCodeContext);
    const {editor}=useContext(SettingsContext);
    const [tabstate, setTabstate] = useState(1);

    const { handleClose } = props;

    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {document.body.style.overflow = "unset";}}, [])

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
        document.querySelector(".titlebar").style.width=document.querySelector(".codesnippet-div").getBoundingClientRect().width+"px";
        setMinHeight(heightRef.current.querySelector(".codesnippet-div").getBoundingClientRect().height+39*titleBarPresence);
        setMaxHeight(document.querySelector(".resizeable-component").getBoundingClientRect().height-39*titleBarPresence);
    }
    useEffect(() => {
        setTimeout(()=>{
            document.querySelector(".resizeable-component").style.height=document.querySelector(".codesnippet-div").getBoundingClientRect().height+39*titleBarPresence +
            (document.querySelector(".resizeable-component").getBoundingClientRect().width- document.querySelector(".codesnippet-div").getBoundingClientRect().width)*0.8+"px";
        },0);
    }, [fontSize])

    useEffect(() => {
        document.querySelector(".resizeable-component").style.height=document.querySelector(".resizeable-component").getBoundingClientRect().height+
        (document.querySelector(".resizeable-component").getBoundingClientRect().width- document.querySelector(".codesnippet-div").getBoundingClientRect().width)*0.8+"px";
        setTimeout(()=>{setHeights();},0) 
    }, [tabstate,fontSize,lineHeight,fontStyle])


    const downloadImage = useCallback((format) => {
        let node=document.querySelector(".resizeable-component");
        if (!node) {
            return
        }

        if(format=="png"){
            toPng(node, { cacheBust:false })
                .then((dataUrl) => {
                const link = document.createElement('a')
                link.download = 'code-snippet.png'
                link.href = dataUrl
                link.click();
                })
                .catch((err) => {
                console.log(err)
                })}
        if(format=="jpg"){
            toJpeg(node, { cacheBust:false })
                .then((dataUrl) => {
                const link = document.createElement('a')
                link.download = 'code-snippet.jpg'
                link.href = dataUrl
                link.click();
                })
                .catch((err) => {
                console.log(err)
                }
            )}
        if(format=="svg"){
            toSvg(node, { cacheBust:false })
                .then((dataUrl) => {
                const link = document.createElement('a')
                link.download = 'code-snippet.svg'
                link.href = dataUrl
                link.click();
                })
                .catch((err) => {
                console.log(err)
                })
            }
    })

    const [color,setColor]=useAtom(scBgColorAtom);
    const [bgType,setBgType]=useAtom(scBgTypeAtom);
    const [bgImage,setBgImage]=useAtom(scBgImageAtom);
    const [bgStyle,setBgStyle]=useState({});//{backgroundImage:`url(${bgImage})`}


    
    const colorPickerRef=useRef(null);
    const colorPickerFn=useCallback((e)=>{
        if(bgType=="color"){
        const colorPicker=colorPickerRef.current;
        colorPicker.click();}
        else{
            const imagePicker=document.querySelector("#bgImage");
            imagePicker.click();
        }      
    },[bgType])

    const onColorChange=(e)=>{
        setColor(e.target.value);
        setBgType("color")
    }

    const onImageChange=(e)=>{
        e.stopPropagation()
        setBgType("image");
        const imageFile=e.target.files[0];
        if(!imageFile){
            return;
        }
        const src = URL.createObjectURL(imageFile);
        setBgImage(src);
    }

    useEffect(()=>{
        if(bgType=="color"){
            setBgStyle({backgroundColor:color});
        }
        else{
            setBgStyle({
                backgroundRepeat: "no-repeat",
                backgroundSize: "100% 100%",
                backgroundImage:`url(${bgImage})`});
        }
    },[bgType,color,bgImage])




    return (
        <>
            <div className="codesnippet-modal " >
            
            <div style={{height:"1vh",minWidth:"270px !important",padding:"15px",display:"flex",flexDirection:"column",alignItems:"center"}} ref={editorContainerRef}  >
                
                <div data-bs-theme="dark" className="w-100 "  style={{position:"relative",zIndex:500}}>
                    <div className="d-flex w-100 justify-content-start container-fluid" >
                        
                        {editor=="web" && 
                        <div className="d-flex align-items-end ">
                            <div
                                onClick={() => setTabstate(1)}
                                className={`xml px-1 px-md-2 cursor-pointer py-1 ${tabstate==1?"selected":"not-selected"}`}>
                                HTML
                            </div>
                            <div
                                onClick={() => setTabstate(2)}
                                className={`css px-1 px-md-2 py-1 cursor-pointer  ${tabstate==2?"selected":"not-selected"}`}
                            >
                                CSS
                            </div>
                            <div
                                onClick={() => setTabstate(3)}
                                className={`javascript px-1 px-sm-2 py-1 cursor-pointer ${tabstate==3?"selected":"not-selected"}`}
                            >
                                JS
                            </div>
                        </div>
                        }
                        {editor=="md" &&
                        <div className="d-flex align-items-end ">
                            <div
                                eventKey="link-1"
                                className="markdown px-2 py-1 cursor-pointer selected">
                                Markdown
                            </div>
                        </div>
                        }   
                        {editor=="other-language" &&
                        <div className="d-flex align-items-end ">
                            <div
                                eventKey="link-1"
                                className="markdown px-2 py-1 cursor-pointer selected">
                                {code.language}
                            </div>
                        </div>
                        }   

                        <div className="ms-auto d-flex align-items-center ">
                        <BgSelect  {...{bgType,color,onColorChange,bgStyle,downloadImage,setBgType,bgImage,onImageChange,colorPickerRef,handleClose}}/>
                        <Button variant="dark" onClick={()=>{setSettingsOpen(!settingsOpen)}} className="p-1 p-md-2"><img src={settingsIcon}></img></Button>
                        <Button variant="dark" onClick={()=>downloadImage("png")} title="Download Image" className="p-1 p-md-2"><img src={screenshotIcon}></img></Button>
                        <CloseButton onClick={handleClose}></CloseButton>
                        </div>
                        

                    </div>
                    {settingsOpen && <SnippetSettings {...{bgType,color,onColorChange,bgStyle,setBgType,bgImage,onImageChange,colorPickerRef,handleClose,settingsOpen,setSettingsOpen,downloadImage}} />}
                </div>



                {tabstate == 1 && editor=="web" && (
                <Resizable style={bgStyle} className="resizeable-component" handleClasses={handleClasses} defaultSize={{width:"80vw"}} onResize={(...e)=>{setHeights( )}} minHeight={minHeight+"px"} onClick={colorPickerFn} >
                        <div style={{minHeight:"100%", display:"flex",width:"100%", flexDirection:"column",justifyContent:"center",alignItems:"center", height:"max-content",maxHeight:`100%`}} ref={heightRef}>
                            <CodeSnippet value={code.html} language="xml" maxHeight={maxHeight}/>
                        </div>
                </Resizable>
                )}
                {tabstate == 2 && (
                <Resizable style={bgStyle} className="resizeable-component" handleClasses={handleClasses} defaultSize={{width:"80vw"}} onResize={(...e)=>{setHeights()}} minHeight={minHeight+"px"} onClick={colorPickerFn} >
                        <div style={{minHeight:"100%", display:"flex",width:"100%", flexDirection:"column",justifyContent:"center",alignItems:"center", height:"max-content",maxHeight:`100%`}} ref={heightRef}>
                        <CodeSnippet value={code.css} language="css" maxHeight={maxHeight}/>
                    </div>
                </Resizable>
                )}
                {tabstate == 3 && (
                <Resizable style={bgStyle} className="resizeable-component" handleClasses={handleClasses} defaultSize={{width:"80vw"}} onResize={(...e)=>{setHeights()}} minHeight={minHeight+"px"} onClick={colorPickerFn} >
                        <div style={{minHeight:"100%", display:"flex",width:"100%", flexDirection:"column",justifyContent:"center",alignItems:"center", height:"max-content",maxHeight:`100%`}} ref={heightRef}>
                        <CodeSnippet value={code.js} language="javascript" maxHeight={maxHeight}/>
                    </div>
                </Resizable>
                )}


                {tabstate == 1 && editor=="md" &&(
                <Resizable style={bgStyle} className="resizeable-component" handleClasses={handleClasses} defaultSize={{width:"80vw"}} onResize={(...e)=>{setHeights()}} minHeight={minHeight+"px"} onClick={colorPickerFn} >
                        <div style={{minHeight:"100%", display:"flex",width:"100%", flexDirection:"column",justifyContent:"center",alignItems:"center", height:"max-content",maxHeight:`100%`}} ref={heightRef}>
                        <CodeSnippet value={code.md} language="markdown" maxHeight={maxHeight}/>
                    </div>
                </Resizable>
                )}

                {tabstate == 1 && editor=="other-language" &&(
                <Resizable style={bgStyle} className="resizeable-component" handleClasses={handleClasses} defaultSize={{width:"80vw"}} onResize={(...e)=>{setHeights()}} minHeight={minHeight+"px"} onClick={colorPickerFn} >
                        <div style={{minHeight:"100%", display:"flex",width:"100%", flexDirection:"column",justifyContent:"center",alignItems:"center", height:"max-content",maxHeight:`100%`}} ref={heightRef}>
                        <CodeSnippet value={code["other-code"]} language={code["language"]=="c"?"clike":code["language"]} maxHeight={maxHeight} name={code.name}/>
                    </div>
                </Resizable>
                )}

                </div>
            </div>
</>
    );
}

export default memo( ModalComponent );