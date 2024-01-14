import { Accordion, Form, Dropdown, Button} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.css';
import { useContext,useRef,useEffect,useState} from "react";
import { SettingsContext } from "../../App";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "../../hooks/localstorage";
import exitIcon from "../../assets/exitIcon.svg"
import cloudUpload from "../../assets/cloudUpload.svg"
import cloudSavedIcon from "../../assets/cloudSavedIcon.svg"
import cloudErrorIcon from "../../assets/cloudErrorIcon.svg"

import DropdownItem from "../DropdownItem";
import ShareModal from "../ShareModal";
import DeployModal from "../DeployModal";

import { ProjectContext } from "../../pages/Web/Webeditor";
import EditorSettings from "./EditorSettings";
import ThemeSettings from "./ThemeSettings";

function Settingsbar(props) {

    const { editor, theme, setTheme, tabornot, setTabornot, autorun, setAutorun, autoCloseTags,setAutoCloseTags, allowResize, setAllowResize,showConsole,setShowConsole, showConsoleOnError,setShowConsoleOnError,allowTryTheme,setAllowTryTheme ,user, setUser,maxHeightOptions,setMaxHeightInSmallScreen,setMaxHeightOptions,maxHeightInSmallScreen } = useContext(SettingsContext);
    const [lastOpened, setLastOpened] = useLocalStorage("lastOpened", { web: "", md: "" });



    useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 770px)");

    const handleResize = (e) => {
    // e.matches will be true if the media query is satisfied
    setMaxHeightOptions(e.matches);
    };

    // Initial check
    handleResize(mediaQuery);

    // Listen for changes in media query matches
    mediaQuery.addEventListener("change", handleResize);
    // Clean up the event listener on component unmount
    return () => {
    mediaQuery.removeEventListener("change", handleResize);
    };
}, [setMaxHeightInSmallScreen]);

    const {code,setCode}=useContext(ProjectContext); 
    const [saved, setSaved] = useState(new Date(code?.dateSaved).getTime()>new Date(code?.dateModified).getTime());

    useEffect(()=>{
        if(new Date(code.dateSaved).getTime()<new Date(code.dateModified).getTime() || !code.dateSaved)
        {
            setSaved(false);
        }
        else
        {
            setSaved(true);
        }
    },[code.dateSaved,code.dateModified])

    //Updating themes and trying themes
    const themeRef=useRef(theme);
    const themeDropdownRef=useRef(null);


    const tryTheme = (toTryTheme) => {
        if(!allowTryTheme) return;
        setTheme(toTryTheme);
        themeDropdownRef.current.addEventListener("mouseleave",()=>{setTheme(themeRef.current);}) 
        themeDropdownRef.current.addEventListener("touchend",()=>{setTheme(themeRef.current);}) 

    };



    const updateTheme = (newTheme) => {
        themeRef.current=newTheme;
        setTheme(newTheme);
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
            const dateSaved=Date.now();
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
                    ...code, type:editor, dateSaved:dateSaved
                })
            })
            let resjson=await res.json();
            setCode({...code,dateSaved:dateSaved});
        }
    }



    


    return (
        <Accordion activeKey={props.isSettingsOpen ? "0" : null} data-bs-theme="dark" variant="dark" flush className="position-absolute w-100 ">
            <Accordion.Item eventKey="0">
                <Accordion.Body >
                    <Form className="d-nav-flex justify-content-md-between align-items-center">
                        {editor=="web" && <>
                            <div className="p-1">
                                <EditorSettings {...{tabornot,setTabornot,autoCloseTags,setAutoCloseTags,allowResize,setAllowResize,maxHeightOptions,setMaxHeightOptions,maxHeightInSmallScreen,setMaxHeightInSmallScreen}}/>
                            </div>
                            </>
                        }

                        <div className="p-1" >
                            <ThemeSettings {...{theme,allowTryTheme,setAllowTryTheme,themeDropdownRef,updateTheme,tryTheme}}/> 
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
                        <Button className="w-nav-100" variant="secondary" onClick={saveToCloud} ><img src={saved?cloudSavedIcon:cloudUpload} className="icon-images" /> Save to cloud</Button>
                        </div>
                        <div className="p-1">
                            <Button variant="secondary" onClick={closeProject} ><img src={exitIcon}  className="icon-images"/>  Close</Button>
                        </div>
                    </Form>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    );
}


export default Settingsbar;