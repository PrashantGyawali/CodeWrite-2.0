import React from 'react'
import DropdownItem from '../DropdownItem';
import { Dropdown } from 'react-bootstrap';
import ShareModal from '../ShareModal';
import DeployModal from '../DeployModal';
import useUrl from '../../hooks/UrlClassify';

function SharingSettings() {
    const editor=useUrl();
  return (
    <Dropdown >
    <Dropdown.Toggle variant="dark" id="dropdown-basic">
        Sharing Settings
    </Dropdown.Toggle>

    <Dropdown.Menu variant="dark" className="p-0">
        <DropdownItem className="p-0">
            <ShareModal/>
        </DropdownItem>
        {editor=="web" && <DropdownItem className="p-0">
            <DeployModal/>
        </DropdownItem> }               
    </Dropdown.Menu>
</Dropdown>
)
}

export default React.memo(SharingSettings)
