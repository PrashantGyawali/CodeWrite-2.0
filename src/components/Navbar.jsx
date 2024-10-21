import React, { useState, useContext, useCallback} from "react";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.css';
import { SettingsContext } from "../App";
import '../App.css'
import settingsIcon from "../assets/settingsIcon.svg"
import Settingsbar from "./Settings/DefaultSettings/Settings";
import BrandName from "./NavBar/BrandName"

import MarkdownTab from "./NavBar/MdEditorTab";
import WebEditorTab from "./NavBar/WebEditorTab";
import ScreenshotModal from "./ScreenshotModal/ScreenshotModal";
import SharedProjectSettings from "./Settings/SharedSettings/SharedProjectSettings";
import CustomLanguageTab from "./NavBar/CustomLanguageTab";


function NavComponent(props) {

  const [isSettingsOpen, setSettingsOpen] = useState(false);
  const { editor} = useContext(SettingsContext);
  const [navbarExpanded, setNavbarExpanded] = useState(false);

  const toggleNavbar = useCallback(() => { setNavbarExpanded(!navbarExpanded); setSettingsOpen(false) });

  return (
    <>
      <Navbar expand="md" className="bg-body-tertiary" data-bs-theme="dark" expanded={navbarExpanded} onToggle={toggleNavbar}>
        <BrandName />
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav"  >
          <div className="ms-0  justify-content-start w-100">
            <Nav variant="tabs" activeKey={editor == "web" ? "link-1" :editor == "md"?"link-2":editor=="other-language"?"link-3":""} data-bs-theme="dark" className="ms-0">
              <div className="d-md-flex ms-0">
                  <WebEditorTab/>
                  <MarkdownTab/>
                  <CustomLanguageTab/>
              </div>

              <Nav.Item className="ms-0 ms-md-auto d-flex">
                <ScreenshotModal/>
                <div className={`text-light px-2 py-1 cursor-pointer rounded ${isSettingsOpen?"bg-secondary":""}`} onClick={() => setSettingsOpen(!isSettingsOpen)}>
                  <img src={settingsIcon} alt="settings" className="settings-button" />
                </div>
              </Nav.Item>              
            </Nav>
          </div>
        </Navbar.Collapse>
      </Navbar>
      <div style={{position:"relative",zIndex:500}}>
      {props?.shared?<SharedProjectSettings isSettingsOpen={isSettingsOpen}/>:<Settingsbar isSettingsOpen={isSettingsOpen}/> }
      </div>
    </>
  );
}

export default React.memo(NavComponent);



