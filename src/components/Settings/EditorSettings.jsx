import React,{useEffect} from 'react'
import DropdownItem from '../DropdownItem';
import { Form,Dropdown } from 'react-bootstrap';
import {tabornotAtom,autoCloseTagsAtom,allowResizeAtom,maxHeightInSmallScreenAtom,maxHeightOptionsAtom} from '../../Store/EditorSettingsStore';

import { useAtom } from 'jotai';

function EditorSettings() {

    const [tabornot, setTabornot] = useAtom(tabornotAtom);
    const [autoclosetags, setAutoCloseTags] = useAtom(autoCloseTagsAtom);
    const [allowResize, setAllowResize] = useAtom(allowResizeAtom);
    const [maxHeightInSmallScreen, setMaxHeightInSmallScreen] = useAtom(maxHeightInSmallScreenAtom);
    const [maxHeightOptions, setMaxHeightOptions] = useAtom(maxHeightOptionsAtom);


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


return (
<Dropdown >
<Dropdown.Toggle variant="dark" id="dropdown-basic">
    Editor Settings
</Dropdown.Toggle>

<Dropdown.Menu variant="dark">
    <DropdownItem >
    <Form.Check type="switch" label="Show as Tabs"  defaultChecked={tabornot} onChange={() => setTabornot(!tabornot)} onClick={(e)=>{e.stopPropagation()}}/>
    </DropdownItem>
    <DropdownItem>
    <Form.Check type="switch" label="Autoclose Tags" defaultChecked={autoclosetags} onChange={() => setAutoCloseTags(!autoclosetags)} onClick={(e)=>{e.stopPropagation()}}/>
    </DropdownItem>
    <DropdownItem>
    <Form.Check type="switch" label="Advanced Resize" defaultChecked={allowResize} onChange={() => setAllowResize(!allowResize)} onClick={(e)=>{e.stopPropagation()}}/>
    </DropdownItem>
    {maxHeightOptions && <DropdownItem>
    <Form.Check type="switch" label="Full Height" defaultChecked={maxHeightInSmallScreen} onChange={() => setMaxHeightInSmallScreen(!maxHeightInSmallScreen)} onClick={(e)=>{e.stopPropagation()}}/>
    </DropdownItem>}
</Dropdown.Menu>
</Dropdown>
);
}


export default React.memo(EditorSettings)