import { Accordion, Form, Dropdown, Button} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.css';
import {memo, useEffect, useRef, useState} from "react";
import BgSelect from "./BgSelect";
import DropdownItem from '../DropdownItem';

import svgIcon from "../../assets/svgIcon.svg";
import imageSelectIcon from "../../assets/imageSelectIcon.svg";

import { useAtom } from "jotai";
import { scLineHeightAtom,scTitleBarAtom,scTitleBarTypeAtom,scFontSizeAtom,scLineNumberAtom,scShadowAtom,scFontStyleAtom } from "../../Store/ScreenshotStore";

import macIcon from "../../assets/mac.png"
import windowsIcon from "../../assets/windows.png"
import macwindowsIcon from "../../assets/macwindows.png"



const fonts=["Monospace","Ubuntu Mono","Fira Code","VT323","Source Code Pro","Press Start 2P","DynaPuff"]


function SnippetSettings(props) {

    const [shadows, setShadows] =useAtom(scShadowAtom);
    const [lineNumbers, setLineNumbers] = useAtom(scLineNumberAtom);
    const [fontSize, setFontSize] = useAtom(scFontSizeAtom);
    const [fontStyle, setFontStyle] = useAtom(scFontStyleAtom);
    const [titleBarPresence, setTitleBarPresence] = useAtom(scTitleBarAtom);
    const [lineHeight, setLineHeight] = useAtom(scLineHeightAtom);
    const [titleBarType, setTitleBarType] = useAtom(scTitleBarTypeAtom);

    const focusSelectedFontSize = (e) => {
        setTimeout(() => {document.getElementById(`fontsize-dropdown${fontSize}`).focus();}, 0)       
    }
    const focusSelectedFontStyle = (e) => {
        setTimeout(() => {document.getElementById(`fontstyle-dropdown${fontStyle}`)?.focus();}, 0)       
    }
    const focusSelectedLineHeight = (e) => {
        setTimeout(() => {document.getElementById(`lineheight-dropdown${lineHeight}`)?.focus();}, 0)       
    }
    const accordionRef=useRef(null);

    const checkAccordionClick=(e)=>{
        if(!accordionRef.current.contains(e.target))
        {
            props.setSettingsOpen(false);
        }
    }

    useEffect(()=>{

        setTimeout(() => {
        document.addEventListener("click",checkAccordionClick)
        },0);
        return ()=>{
            document.removeEventListener("click",checkAccordionClick)
        }
    },[])


    return (
        <Accordion activeKey={props.settingsOpen ? "0" : null} data-bs-theme="dark" variant="dark" flush className="position-absolute w-100 top-100" ref={accordionRef} >
            <Accordion.Item eventKey="0" className="rounded" style={{border:"1px solid rgb(100,100,100)",borderTop:"0px", borderRight:"0px"}}>
                <Accordion.Body  >
                    <Form className="d-flex flex-wrap  justify-content-md-between align-items-center ">
                            <div className="p-1 btn d-flex align-items-center">
                            <Dropdown autoClose="outside" className="position-relative">
                                <Dropdown.Toggle variant="dark" id="dropdown-basic">
                                    Background Settings
                                </Dropdown.Toggle>

                                <Dropdown.Menu variant="dark" className="p-1 bg-dark position-absolute ">
                                    <div className="d-flex align-items-center btn btn-dark justify-content-between pe-1">
                                        <div className="pe-3">Background: </div> <BgSelect {...props} />
                                    </div>
                                    <DropdownItem>
                                        <Form.Check type="switch" label="Show Shadow" defaultChecked={shadows} onChange={() => setShadows(!shadows)} onClick={(e)=>{e.stopPropagation()}} />
                                    </DropdownItem>
                                </Dropdown.Menu>
                            </Dropdown>  
                                
                            </div>
                            <div className="p-1 btn d-flex align-items-center">
                            <Dropdown autoClose="outside" className="position-relative">
                                <Dropdown.Toggle variant="dark" id="dropdown-basic">
                                    Editor Settings
                                </Dropdown.Toggle>

                                <Dropdown.Menu variant="dark" className="p-1 bg-dark position-absolute ">
                                    <DropdownItem>
                                        <Form.Check type="switch" label="Line Numbers" defaultChecked={lineNumbers} onChange={() => {setLineNumbers(!lineNumbers)}} onClick={(e)=>{e.stopPropagation()}} />
                                    </DropdownItem>

                                    <Dropdown onToggle={focusSelectedFontStyle} className="postiion-relative">
                                        <Dropdown.Toggle variant="dark" id="dropdown-basic" className="w-100 text-start ">
                                        Font: {fontStyle}
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu style={{height:"max(25vh,140px)",width:"100%",overflowY:"scroll"}} className="position-absolute">
                                            {fonts.map((e)=>{return <DropdownItem key={e} id={`fontstyle-dropdown${e}`} onClick={()=>{setFontStyle(e)}} active={e==fontSize}>{e}</DropdownItem>})}
                                        </Dropdown.Menu>
                                    </Dropdown>

                                    <Dropdown onToggle={focusSelectedFontSize} className="position-relative">
                                        <Dropdown.Toggle variant="dark" id="dropdown-basic" className="w-100 text-start ">
                                        Font Size: {fontSize}px
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu style={{height:"max(25vh,140px)",width:"100%",overflowY:"scroll"}} className="position-absolute">
                                            {Array.from({length: 33}, (_, i) => i + 8).map((e)=>{return <DropdownItem key={e} id={`fontsize-dropdown${e}`} onClick={()=>{setFontSize(e)}} active={e==fontSize}>{e}px</DropdownItem>})}
                                        </Dropdown.Menu>
                                    </Dropdown>

                                    <Dropdown onToggle={focusSelectedLineHeight} className="position-relative">
                                        <Dropdown.Toggle variant="dark" id="dropdown-basic" className="w-100 text-start ">
                                        Line Height: {lineHeight} em
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu style={{height:"max(25vh,140px)",width:"100%",overflowY:"scroll"}} className="position-absolute">
                                            {Array.from({length: 23}, (_, i) => (8+i)/10).map((e)=>{return <DropdownItem key={e} id={`lineheight-dropdown${e}`} onClick={()=>{setLineHeight(e)}} active={e==lineHeight}>{e} em</DropdownItem>})}
                                        </Dropdown.Menu>
                                    </Dropdown>

                                </Dropdown.Menu>
                            </Dropdown>  
                                
                            </div>

                            <div className="p-1 btn d-flex align-items-center">
                                <Dropdown autoClose="outside" className="position-relative">
                                    <Dropdown.Toggle variant="dark" id="dropdown-basic">
                                        Titlebar Settings
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu variant="dark" className="p-1 bg-dark position-absolute ">
                                        <DropdownItem>
                                            <Form.Check type="switch" label="TitleBar" defaultChecked={titleBarPresence} onChange={() => {setTitleBarPresence(!titleBarPresence)}} onClick={(e)=>{e.stopPropagation()}} />
                                        </DropdownItem>

                                        {titleBarPresence && 
                                        <><DropdownItem className="p-0" active={titleBarType=="mac"} onClick={()=>{setTitleBarType("mac")}}>
                                            <img src={macIcon} alt="Mac" width="100%" height="40px"/>
                                        </DropdownItem>

                                        <DropdownItem className="p-0" active={titleBarType=="windows"} onClick={()=>{setTitleBarType("windows")}}>
                                            <img src={windowsIcon} alt="Windows" width="100%" height="40px"/>
                                        </DropdownItem>

                                        <DropdownItem className="p-0" active={titleBarType=="macwindows"} onClick={()=>{setTitleBarType("macwindows")}}>
                                            <img src={macwindowsIcon} alt="Both" width="100%" height="40px"/>
                                        </DropdownItem>
                                        </>
                                        }
                                    </Dropdown.Menu>
                                </Dropdown>   
                            </div>


                            <div className="p-1 btn d-flex align-items-center">
                                <Dropdown className="position-relative">
                                    <Dropdown.Toggle variant="dark" id="dropdown-basic">
                                        Export
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu variant="dark" className="p-1 bg-dark position-absolute ">
                                        <DropdownItem>
                                            <img src={imageSelectIcon} alt="png" width="20px" />
                                            {"  "}PNG
                                        </DropdownItem>

                                        <DropdownItem>
                                            <img src={imageSelectIcon} alt="jpg" width="20px" />
                                            {"  "}JPG
                                        </DropdownItem>

                                        <DropdownItem>
                                            <img src={svgIcon} alt="svg" width="20px" />
                                            {"  "}SVG
                                        </DropdownItem>
                                    </Dropdown.Menu>
                                </Dropdown>   
                            </div>
                    </Form>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    );
}

export default memo(SnippetSettings);