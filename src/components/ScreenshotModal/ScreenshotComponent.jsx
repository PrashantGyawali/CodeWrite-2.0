import { memo,useRef,useState,useCallback} from "react";
import { ProjectCodeContext, SettingsContext } from '../../App';
import { useContext,useEffect} from "react";
import { Button, CloseButton } from "react-bootstrap";

import imageSelectIcon from "../../assets/imageSelectIcon.svg"
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

    toPng(node, { cacheBust:false })
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
    const [bgType,setBgType]=useState("color");
    const [bgImage,setBgImage]=useState(null);
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
                
                <div data-bs-theme="dark" className="w-100 ">
                    <div className="d-flex w-100 justify-content-start container-fluid">
                        
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
                        <div className="ms-auto d-flex align-items-center ">
                            <input type="color" id="colorPicker" value={color} onChange={onColorChange} ref={colorPickerRef} title="Choose Background Color"></input>

                            <Button variant="dark" title="Upload Background Image ">
                                <label htmlFor="bgImage">
                                    <img src={imageSelectIcon} className="cursor-pointer"></img>
                                </label>
                            </Button>
                            <input type="file" name="bgImage" id="bgImage" className="d-none" accept="image/*" onChange={onImageChange} />


                            <Button variant="dark" onClick={downloadImage} title="Download Image"><img src={screenshotIcon}></img></Button>
                            <CloseButton  onClick={handleClose}></CloseButton>
                        </div>
                    </div>
                </div>



                {tabstate == 1 && editor=="web" && (
                <Resizable style={bgStyle} className="resizeable-component" handleClasses={handleClasses} defaultSize={{width:"80vw"}} onResize={(...e)=>{setHeights( )}} minHeight={minHeight+"px"} onClick={colorPickerFn} >
                        <div style={{minHeight:"1vh", display:"flex",width:"100%",justifyContent:"center",alignItems:"center", maxHeight:`100%`}} ref={heightRef}>
                            <CodeSnippet value={html} language="xml" maxHeight={maxHeight}/>
                        </div>
                </Resizable>
                )}
                {tabstate == 2 && (
                <Resizable style={bgStyle} className="resizeable-component" handleClasses={handleClasses} defaultSize={{width:"80vw"}} onResize={(...e)=>{setHeights()}} minHeight={minHeight+"px"} onClick={colorPickerFn} >
                    <div style={{minHeight:"1vh",  display:"flex",width:"100%",justifyContent:"center",alignItems:"center", maxHeight:`100%`}} ref={heightRef}>
                        <CodeSnippet value={css} language="css" maxHeight={maxHeight}/>
                    </div>
                </Resizable>
                )}
                {tabstate == 3 && (
                <Resizable style={bgStyle} className="resizeable-component" handleClasses={handleClasses} defaultSize={{width:"80vw"}} onResize={(...e)=>{setHeights()}} minHeight={minHeight+"px"} onClick={colorPickerFn} >
                    <div style={{minHeight:"1vh", display:"flex",width:"100%",justifyContent:"center",alignItems:"center", maxHeight:`100%`}} ref={heightRef}>
                        <CodeSnippet value={js} language="javascript" maxHeight={maxHeight}/>
                    </div>
                </Resizable>
                )}
                {tabstate == 1 && editor=="md" &&(
                <Resizable style={bgStyle} className="resizeable-component" handleClasses={handleClasses} defaultSize={{width:"80vw"}} onResize={(...e)=>{setHeights()}} minHeight={minHeight+"px"} onClick={colorPickerFn} >
                    <div style={{minHeight:"1vh", display:"flex",width:"100%",justifyContent:"center",alignItems:"center", maxHeight:`100%`}} ref={heightRef}>
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