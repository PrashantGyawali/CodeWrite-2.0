import { Accordion, Form, Dropdown, Button} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.css';
import {memo, useState} from "react";
import BgSelect from "./BgSelect";
import DropdownItem from '../DropdownItem';

import svgIcon from "../../assets/svgIcon.svg";
import imageSelectIcon from "../../assets/imageSelectIcon.svg";


function SnippetSettings(props) {

    const [shadows, setAutorun] = useState(true);
    const [lineNumbers, setLineNumbers] = useState(true);

    return (
        <Accordion activeKey={props.isSettingsOpen ? "0" : null} data-bs-theme="dark" variant="dark" flush className="position-absolute w-100 top-100 " >
            <Accordion.Item eventKey="0" className="rounded" style={{border:"1px solid rgb(100,100,100)",borderTop:"0px", borderRight:"0px"}}>
                <Accordion.Body  >
                    <Form className="d-flex flex-wrap  justify-content-md-between align-items-center ">
                            <div className="p-1 btn d-flex align-items-center">
                            <Dropdown autoClose="outside" >
                                <Dropdown.Toggle variant="dark" id="dropdown-basic">
                                    Background Settings
                                </Dropdown.Toggle>

                                <Dropdown.Menu variant="dark" className="p-1 bg-dark">
                                    <div className="d-flex align-items-center btn btn-dark justify-content-between pe-1">
                                        <div className="pe-3">Background: </div> <BgSelect {...props} />
                                    </div>
                                    <DropdownItem>
                                        <Form.Check type="switch" label="Show Shadow" defaultChecked={shadows} onChange={() => setAutorun(!shadows)} onClick={(e)=>{e.stopPropagation()}} />
                                    </DropdownItem>
                                </Dropdown.Menu>
                            </Dropdown>  
                                
                            </div>
                            <div className="p-1 btn d-flex align-items-center">
                            <Dropdown autoClose="outside" >
                                <Dropdown.Toggle variant="dark" id="dropdown-basic">
                                    Editor Settings
                                </Dropdown.Toggle>

                                <Dropdown.Menu variant="dark" className="p-1 bg-dark">
                                    <DropdownItem>
                                        <Form.Check type="switch" label="Line Numbers" defaultChecked={lineNumbers} onChange={() => {setLineNumbers(!lineNumbers)}} onClick={(e)=>{e.stopPropagation()}} />
                                    </DropdownItem>

                                    <DropdownItem>
                                        Font:
                                    </DropdownItem>

                                    <DropdownItem>
                                        Font Size:
                                    </DropdownItem>
                                </Dropdown.Menu>
                            </Dropdown>  
                                
                            </div>

                            <div className="p-1 btn d-flex align-items-center">
                                <Dropdown autoClose="outside" >
                                    <Dropdown.Toggle variant="dark" id="dropdown-basic">
                                        Titlebar Settings
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu variant="dark" className="p-1 bg-dark">
                                        <DropdownItem>
                                            <Form.Check type="switch" label="TitleBar" defaultChecked={lineNumbers} onChange={() => {setLineNumbers(!lineNumbers)}} onClick={(e)=>{e.stopPropagation()}} />
                                        </DropdownItem>

                                        <DropdownItem>
                                            <Form.Check type="switch" label="TitleBar" defaultChecked={lineNumbers} onChange={() => {setLineNumbers(!lineNumbers)}} onClick={(e)=>{e.stopPropagation()}} />
                                        </DropdownItem>

                                        <DropdownItem>
                                            <Form.Check type="switch" label="TitleBar" defaultChecked={lineNumbers} onChange={() => {setLineNumbers(!lineNumbers)}} onClick={(e)=>{e.stopPropagation()}} />
                                        </DropdownItem>
                                    </Dropdown.Menu>
                                </Dropdown>   
                            </div>


                            <div className="p-1 btn d-flex align-items-center">
                                <Dropdown >
                                    <Dropdown.Toggle variant="dark" id="dropdown-basic">
                                        Export
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu variant="dark" className="p-1 bg-dark">
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