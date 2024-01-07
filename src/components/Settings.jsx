import { Accordion, Form, Dropdown, Button} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.css';
import { useContext,useRef   } from "react";
import { SettingsContext } from "../App";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "../hooks/localstorage";
import exitIcon from "../assets/exitIcon.svg"
import cloudUpload from "../assets/cloudUpload.svg"
import cloudSavedIcon from "../assets/cloudSavedIcon.svg"
import DropdownItem from "./DropdownItem";
import ShareModal from "./ShareModal";

export default function Settingsbar(props) {

    const { editor, theme, setTheme, tabornot, setTabornot, autorun, setAutorun, autoCloseTags,setAutoCloseTags, allowResize, setAllowResize,showConsole,setShowConsole, showConsoleOnError,setShowConsoleOnError,allowTryTheme,setAllowTryTheme  } = useContext(SettingsContext);
    const [lastOpened, setLastOpened] = useLocalStorage("lastOpened", { web: "", md: "" });




    //Updating themes and trying themes
    const themeRef=useRef(theme);
    const themeDropdownRef=useRef(null);
    const tryTheme = (toTryTheme) => {
        if(!allowTryTheme) return;
        setTheme(toTryTheme);
        themeDropdownRef.current.addEventListener("mouseleave",()=>{setTheme(themeRef.current);}) 
        themeDropdownRef.current.addEventListener("touchend",()=>{setTheme(themeRef.current);}) 

    }
    const updateTheme = (newTheme) => {
        themeRef.current=newTheme;
        setTheme(newTheme);
    }
    
    //handling themes
    const themeMapping={
        "material":"Material",
        "cobalt":"Cobalt",
        "xq-dark":"XQ-dark",
        "the-matrix":"Matrix",
        "night":"Night",
        "3024-day":"Light"
    }



    //handle close button
    const navigate = useNavigate();

    const closeProject=()=>{
        setLastOpened({ ...lastOpened, [editor]: ""});
        setTimeout(() => {        navigate(`/projects/${editor}`); 
    },10)
    }




    return (
        <Accordion activeKey={props.isSettingsOpen ? "0" : null} data-bs-theme="dark" variant="dark" flush>
            <Accordion.Item eventKey="0">
                <Accordion.Body >
                    <Form className="d-md-flex justify-content-md-between align-items-center">
                        {editor=="web" && <>
                        <div className="p-1">
                            <Dropdown >
                                <Dropdown.Toggle variant="dark" id="dropdown-basic">
                                    Editor Settings
                                </Dropdown.Toggle>

                                <Dropdown.Menu variant="dark">
                                    <DropdownItem >
                                    <Form.Check type="switch" label="Show as Tabs"  defaultChecked={tabornot} onChange={() => setTabornot(!tabornot)} onClick={(e)=>{e.stopPropagation()}}/>
                                    </DropdownItem>
                                    <DropdownItem>
                                    <Form.Check type="switch" label="Autoclose Tags" defaultChecked={autoCloseTags} onChange={() => setAutoCloseTags(!autoCloseTags)} onClick={(e)=>{e.stopPropagation()}}/>
                                    </DropdownItem>
                                    <DropdownItem>
                                    <Form.Check type="switch" label="Advanced Resize" defaultChecked={allowResize} onChange={() => setAllowResize(!allowResize)} onClick={(e)=>{e.stopPropagation()}}/>
                                    </DropdownItem>
                                </Dropdown.Menu>
                            </Dropdown>
                            </div>
                            <div className="p-1">
                            <Dropdown >
                                <Dropdown.Toggle variant="dark" id="dropdown-basic">
                                    Output Settings
                                </Dropdown.Toggle>

                                <Dropdown.Menu variant="dark">
                                    <DropdownItem>
                                    <Form.Check type="switch" label="Run Manually" defaultChecked={!autorun} onChange={() => setAutorun(!autorun)} onClick={(e)=>{e.stopPropagation()}} />
                                    </DropdownItem>
                                    <DropdownItem>
                                    <Form.Check type="switch" label="Show Console" defaultChecked={showConsole} onChange={() => {setShowConsole(!showConsole)}} onClick={(e)=>{e.stopPropagation()}}/>
                                    </DropdownItem>
                                    {showConsole && <DropdownItem>
                                    <Form.Check type="switch" label="Show Console on Error" defaultChecked={showConsoleOnError} onChange={() => setShowConsoleOnError(!showConsoleOnError)} onClick={(e)=>{e.stopPropagation()}}/>
                                    </DropdownItem>}
                                </Dropdown.Menu>
                            </Dropdown>
                            </div>

                        </>
                        }
                        <div className="p-1">
                            <Dropdown >
                                <Dropdown.Toggle variant="dark" id="dropdown-basic">
                                    Project Settings
                                </Dropdown.Toggle>

                                <Dropdown.Menu variant="dark" className="p-0">
                                    <DropdownItem className="p-0">
                                    <Button className="w-100" variant="secondary" onClick={closeProject} ><img src={cloudUpload} /> Save to cloud</Button>
                                    </DropdownItem>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                        <div className="p-1" >
                            <Dropdown >
                                <Dropdown.Toggle variant="dark" id="dropdown-basic">
                                    Theme: {themeMapping[theme]}
                                </Dropdown.Toggle>
                                <Dropdown.Menu >
                                    <Form.Check type="switch" label="Try Themes"  defaultChecked={allowTryTheme} className="mx-2" onChange={() => setAllowTryTheme(!allowTryTheme)} onClick={(e)=>{e.stopPropagation()}} title="Hover to try out themes on desktop, slide over to try on smartphones"/>
                                    <div ref={themeDropdownRef} >
                                    <DropdownItem onClick={() => updateTheme("material")} onMouseOver={()=>tryTheme("material")} onTouchStart={(e)=>{tryTheme("material");}} >Material</DropdownItem>
                                    <DropdownItem onClick={() => updateTheme("cobalt")} onMouseOver={()=>tryTheme("cobalt")} onTouchStart={()=>tryTheme("cobalt")} >Cobalt</DropdownItem>
                                    <DropdownItem onClick={() => updateTheme("xq-dark")} onMouseOver={()=>tryTheme("xq-dark")} onTouchStart={()=>tryTheme("xq-dark")} >XQ-dark</DropdownItem>
                                    <DropdownItem onClick={() => updateTheme("the-matrix")} onMouseOver={()=>tryTheme("the-matrix")} onTouchStart={()=>tryTheme("the-matrix")} >Matrix</DropdownItem>
                                    <DropdownItem onClick={() => updateTheme("night")} onMouseOver={()=>tryTheme("night")} onTouchStart={()=>tryTheme("night")} >Night</DropdownItem>
                                    <DropdownItem onClick={() => updateTheme("3024-day")} onMouseOver={()=>tryTheme("3024-day")} onTouchStart={()=>tryTheme("3024-day")} >Light</DropdownItem>
                                    </div>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                        <div className="p-1">
                            <ShareModal/>
                        </div>
                        <div className="p-1">
                            <Button variant="secondary" onClick={closeProject} ><img src={exitIcon} />  Close</Button>
                        </div>
                    </Form>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    );
}
