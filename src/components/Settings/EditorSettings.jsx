import React from 'react'
import DropdownItem from '../DropdownItem';
import { Form,Dropdown } from 'react-bootstrap';

export default function EditorSettings(props) {

const {
    tabornot,
    setTabornot,
    autoCloseTags,
    setAutoCloseTags,
    allowResize,
    setAllowResize,
    maxHeightOptions,
    maxHeightInSmallScreen,
    setMaxHeightInSmallScreen,
} = props;

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
    <Form.Check type="switch" label="Autoclose Tags" defaultChecked={autoCloseTags} onChange={() => setAutoCloseTags(!autoCloseTags)} onClick={(e)=>{e.stopPropagation()}}/>
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
