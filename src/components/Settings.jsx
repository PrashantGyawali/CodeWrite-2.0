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
import DeployModal from "./DeployModal";

import { ProjectContext } from "../pages/Web/Webeditor";

export default function Settingsbar(props) {

    const { editor, theme, setTheme, tabornot, setTabornot, autorun, setAutorun, autoCloseTags,setAutoCloseTags, allowResize, setAllowResize,showConsole,setShowConsole, showConsoleOnError,setShowConsoleOnError,allowTryTheme,setAllowTryTheme ,user, setUser } = useContext(SettingsContext);
    const [lastOpened, setLastOpened] = useLocalStorage("lastOpened", { web: "", md: "" });


    const {code,setCode}=useContext(ProjectContext);

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

    const  saveToCloud=async()=>{
        if(user?.isAuth)
        {
            const url="https://codewrite-server.onrender.com";
            let res= await fetch(url+"/save",
            {
                method:"POST",
                mode: "cors",
                headers:{
                  "Content-Type":"application/json",
                  "Access-Control-Allow-Credentials":true,
                  "Access-Control-Allow-Origin":"*",
                  "Access-Control-Allow-Methods":"GET,PUT,POST,DELETE,PATCH,OPTIONS",
                },
                cache: "no-cache",
                credentials: "include", 
                body:JSON.stringify({
                    ...code, type:editor
                })
            })
            let resjson=await res.json();
            console.log(resjson);

        }
    }



    return (
        <Accordion activeKey={props.isSettingsOpen ? "0" : null} data-bs-theme="dark" variant="dark" flush className="position-absolute w-100 ">
            <Accordion.Item eventKey="0">
                <Accordion.Body >
                    <Form className="d-nav-flex justify-content-md-between align-items-center">
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
                            </>
                        }
                            <div className="p-1" >
                            <Dropdown >
                                <Dropdown.Toggle variant="dark" id="dropdown-basic">
                                    Theme: {themeMapping[theme]}
                                </Dropdown.Toggle>
                                <Dropdown.Menu >
                                    <Form.Check type="switch" label="Try Themes"  defaultChecked={allowTryTheme} className="mx-2" onChange={() => setAllowTryTheme(!allowTryTheme)} onClick={(e)=>{e.stopPropagation()}} title="Hover to try out themes on desktop, slide over to try on smartphones"/>
                                    <div ref={themeDropdownRef} >
                                    <DropdownItem onClick={() => updateTheme("material")} onMouseOver={()=>tryTheme("material")} onTouchStart={()=>{tryTheme("material");}} >Material</DropdownItem>
                                    <DropdownItem onClick={() => updateTheme("cobalt")} onMouseOver={()=>tryTheme("cobalt")} onTouchStart={()=>tryTheme("cobalt")} >Cobalt</DropdownItem>
                                    <DropdownItem onClick={() => updateTheme("xq-dark")} onMouseOver={()=>tryTheme("xq-dark")} onTouchStart={()=>tryTheme("xq-dark")} >XQ-dark</DropdownItem>
                                    <DropdownItem onClick={() => updateTheme("the-matrix")} onMouseOver={()=>tryTheme("the-matrix")} onTouchStart={()=>tryTheme("the-matrix")} >Matrix</DropdownItem>
                                    <DropdownItem onClick={() => updateTheme("night")} onMouseOver={()=>tryTheme("night")} onTouchStart={()=>tryTheme("night")} >Night</DropdownItem>
                                    <DropdownItem onClick={() => updateTheme("3024-day")} onMouseOver={()=>tryTheme("3024-day")} onTouchStart={()=>tryTheme("3024-day")} >Light</DropdownItem>
                                    </div>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                        {editor=="web" && 
                        <>
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
                                    Sharing Settings
                                </Dropdown.Toggle>

                                <Dropdown.Menu variant="dark" className="p-0">
                                    <DropdownItem className="p-0">
                                        <ShareModal/>
                                    </DropdownItem>
                                    <DropdownItem className="p-0">
                                        <DeployModal/>
                                    </DropdownItem>                
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                        
                        <div className="p-1">
                        <Button className="w-nav-100" variant="secondary" onClick={saveToCloud} ><img src={cloudUpload} /> Save to cloud</Button>
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
