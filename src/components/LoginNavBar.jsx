import React, { useState, useContext, useCallback } from "react";
import Button from "react-bootstrap/Button";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.css';
import { SettingsContext } from "../App";
import { useNavigate} from "react-router-dom";
import '../App.css'
import profileIcon from "../assets/profileIcon.svg"
import userIcon from "../assets/userIcon.svg"

import BrandName from "./NavBar/BrandName";
import WebEditorTab from "./NavBar/WebEditorTab";
import MarkdownTab from "./NavBar/MdEditorTab";

function LoginNavComponent() {
  const { editor,user} = useContext(SettingsContext);
  const [navbarExpanded, setNavbarExpanded] = useState(false);
  
  const handleProfileClick = useCallback(() => {
    if(user.isAuth)
    {
      navigate("/profile")
    }
    else{
      navigate("/auth")
    }
  },[user])

  const handleToggle=useCallback(()=>{
    setNavbarExpanded(!navbarExpanded);
  },[navbarExpanded])

  
  const navigate = useNavigate();
  return (
    <>
      <Navbar expand="md" className="bg-body-tertiary" data-bs-theme="dark" expanded={navbarExpanded} onToggle={handleToggle}>
        <BrandName />
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav"  >
          <div className="ms-0  justify-content-start w-100">
            <Nav variant="tabs"  data-bs-theme="dark" className="ms-0" defaultActiveKey={editor=="markdown"?"link-2":"link1"}>
              <div className="d-md-flex ms-0">
                <WebEditorTab/>
                <MarkdownTab/>
              </div>
              <Nav.Item className="ms-3 ms-md-auto ">
                <Button variant="dark" className="text-light border-radius-50 "  data-bs-theme="dark" onClick={handleProfileClick} >
                  <img src={user.isAuth?userIcon:profileIcon} title={user.username||"Login/Register"}/>
                </Button>
              </Nav.Item>
            </Nav>
          </div>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}

export default LoginNavComponent;