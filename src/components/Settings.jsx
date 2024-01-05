import { Accordion, Form, Dropdown, Button} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.css';
import { useContext } from "react";
import { SettingsContext } from "../App";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "../hooks/localstorage";
import exitIcon from "../assets/exitIcon.svg"
import cloudUpload from "../assets/cloudUpload.svg"
import cloudSavedIcon from "../assets/cloudSavedIcon.svg"
import ShareModal from "./ShareModal";

export default function Settingsbar(props) {

    const { editor, theme, setTheme, tabornot, setTabornot, autorun, setAutorun, autoCloseTags,setAutoCloseTags, allowResize, setAllowResize,showConsole,setShowConsole, showConsoleOnError,setShowConsoleOnError  } = useContext(SettingsContext);
    const [lastOpened, setLastOpened] = useLocalStorage("lastOpened", { web: "", md: "" });

    const navigate = useNavigate();

    const closeProject=()=>{
        setLastOpened({ ...lastOpened, [editor]: ""});
        setTimeout(() => {        navigate(`/projects/${editor}`); 
    },10)
    }

    const themeMapping={
        "material":"Material",
        "cobalt":"Cobalt",
        "xq-dark":"XQ-dark",
        "the-matrix":"Matrix",
        "night":"Night",
        "3024-day":"Light"
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
                                    <Dropdown.Item >
                                    <Form.Check type="switch" label="Show as Tabs"  defaultChecked={tabornot} onChange={() => setTabornot(!tabornot)} onClick={(e)=>{e.stopPropagation()}}/>
                                    </Dropdown.Item>
                                    <Dropdown.Item>
                                    <Form.Check type="switch" label="Autoclose Tags" defaultChecked={autoCloseTags} onChange={() => setAutoCloseTags(!autoCloseTags)} onClick={(e)=>{e.stopPropagation()}}/>
                                    </Dropdown.Item>
                                    <Dropdown.Item>
                                    <Form.Check type="switch" label="Advanced Resize" defaultChecked={allowResize} onChange={() => setAllowResize(!allowResize)} onClick={(e)=>{e.stopPropagation()}}/>
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                            </div>
                            <div className="p-1">
                            <Dropdown >
                                <Dropdown.Toggle variant="dark" id="dropdown-basic">
                                    Output Settings
                                </Dropdown.Toggle>

                                <Dropdown.Menu variant="dark">
                                    <Dropdown.Item>
                                    <Form.Check type="switch" label="Run Manually" defaultChecked={!autorun} onChange={() => setAutorun(!autorun)} onClick={(e)=>{e.stopPropagation()}} />
                                    </Dropdown.Item>
                                    <Dropdown.Item>
                                    <Form.Check type="switch" label="Show Console" defaultChecked={showConsole} onChange={() => {setShowConsole(!showConsole)}} onClick={(e)=>{e.stopPropagation()}}/>
                                    </Dropdown.Item>
                                    {showConsole && <Dropdown.Item>
                                    <Form.Check type="switch" label="Show Console on Error" defaultChecked={showConsoleOnError} onChange={() => setShowConsoleOnError(!showConsoleOnError)} onClick={(e)=>{e.stopPropagation()}}/>
                                    </Dropdown.Item>}
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
                                    <Dropdown.Item className="p-0">
                                    <Button className="w-100" variant="secondary" onClick={closeProject} ><img src={cloudUpload} /> Save to cloud</Button>
                                    </Dropdown.Item>
                                    <Dropdown.Item>
                                    <Form.Check type="switch" label="Show Console" defaultChecked={showConsole} onChange={() => {setShowConsole(!showConsole)}} onClick={(e)=>{e.stopPropagation()}}/>
                                    </Dropdown.Item>
                                    {showConsole && <Dropdown.Item>
                                    <Form.Check type="switch" label="Show Console on Error" defaultChecked={showConsoleOnError} onChange={() => setShowConsoleOnError(!showConsoleOnError)} onClick={(e)=>{e.stopPropagation()}}/>
                                    </Dropdown.Item>}
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                        <div className="p-1">
                            <Dropdown>
                                <Dropdown.Toggle variant="dark" id="dropdown-basic">
                                    Theme: {themeMapping[theme]}
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={() => setTheme("material")}>Material</Dropdown.Item>
                                    <Dropdown.Item onClick={() => setTheme("cobalt")}>Cobalt</Dropdown.Item>
                                    <Dropdown.Item onClick={() => setTheme("xq-dark")}>XQ-dark</Dropdown.Item>
                                    <Dropdown.Item onClick={() => setTheme("the-matrix")}>Matrix</Dropdown.Item>
                                    <Dropdown.Item onClick={() => setTheme("night")}>Night</Dropdown.Item>
                                    <Dropdown.Item onClick={() => setTheme("3024-day")}>Light</Dropdown.Item>
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
