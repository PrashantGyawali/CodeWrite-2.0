import { Accordion, Form, Dropdown, Button} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.css';
import { useContext,useEffect,useState,memo} from "react";
import { SettingsContext } from "../../App";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "../../hooks/localstorage";
import exitIcon from "../../assets/exitIcon.svg"

import EditorSettings from "./EditorSettings";
import ThemeSettings from "./ThemeSettings";
import OutputSettings from "./OutputSettings";
import SharingSettings from "./SharingSettings";
import SaveProjectSettings from "./SaveProjectSettings";
import Close from "./Close";



function Settingsbar(props) {

    const { editor} = useContext(SettingsContext);

    return (
        <Accordion activeKey={props.isSettingsOpen ? "0" : null} data-bs-theme="dark" variant="dark" flush className="position-absolute w-100 ">
            <Accordion.Item eventKey="0">
                <Accordion.Body >
                    <Form className="d-nav-flex justify-content-md-between align-items-center">
                        {editor=="web" && <>
                            <div className="p-1">
                                <EditorSettings/>
                            </div>
                            </>
                        }

                        <div className="p-1" >
                            <ThemeSettings /> 
                        </div>

                        {editor=="web" && 
                        <>
                            <div className="p-1">
                                <OutputSettings/>
                            </div>
                        </>
                        }
                        <div className="p-1">
                            <SharingSettings/>
                        </div>
                        
                        <div className="p-1">
                            <SaveProjectSettings/>
                        </div>
                        <div className="p-1">
                            <Close/>
                        </div>
                    </Form>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    );
}


export default memo(Settingsbar);