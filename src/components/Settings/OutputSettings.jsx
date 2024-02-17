import React from 'react'
import DropdownItem from '../DropdownItem';
import { Form,Dropdown } from 'react-bootstrap';
import informationIcon from '../../assets/informationIcon.svg';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

import { useAtom } from 'jotai';
import {autorunAtom, showConsoleAtom, showConsoleOnErrorAtom} from '../../Store/OutputSettings';

function OutputSettings() {

    const [autorun, setAutorun] = useAtom(autorunAtom);
    const [showConsole, setShowConsole] = useAtom(showConsoleAtom);
    const [showConsoleOnError, setShowConsoleOnError] = useAtom(showConsoleOnErrorAtom);

return (
<Dropdown >
<Dropdown.Toggle variant="dark" id="dropdown-basic">
    Output Settings
</Dropdown.Toggle>

<Dropdown.Menu variant="dark">
    <DropdownItem>
    <Form.Check type="switch" label="Run Manually" defaultChecked={!autorun} onChange={() => setAutorun(!autorun)} onClick={(e)=>{e.stopPropagation()}} />
    </DropdownItem>
    <DropdownItem>
        <div className='d-flex justify-content-between'>
        <Form.Check type="switch" label="Show Console" defaultChecked={showConsole} onChange={() => {setShowConsole(!showConsole)}} onClick={(e)=>{e.stopPropagation()}}/>
        
        <OverlayTrigger
            placement="bottom"
            overlay={<Tooltip>Console is still <strong>experimental</strong>. It may cause unexpected behavior with the css and the script.</Tooltip>}>
            <img src={informationIcon} alt="info" onClick={(e)=>e.stopPropagation()}/>
        </OverlayTrigger>
        </div>
    </DropdownItem>
    {showConsole && <DropdownItem>
    <Form.Check type="switch" label="Show Console on Error" defaultChecked={showConsoleOnError} onChange={() => setShowConsoleOnError(!showConsoleOnError)} onClick={(e)=>{e.stopPropagation()}}/>
    </DropdownItem>}
</Dropdown.Menu>
</Dropdown>  
                            
)
}

export default React.memo(OutputSettings)