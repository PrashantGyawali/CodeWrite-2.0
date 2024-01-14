import React from 'react'
import { Dropdown,Form } from 'react-bootstrap'
import DropdownItem from '../DropdownItem';


//handling themes
const themeMapping={
    "material":"Material",
    "cobalt":"Cobalt",
    "xq-dark":"XQ-dark",
    "the-matrix":"Matrix",
    "night":"Night",
    "3024-day":"Light"
}

function ThemeSettings(props) {
const {
    theme,
    allowTryTheme,
    setAllowTryTheme,
    themeDropdownRef,
    updateTheme,
    tryTheme} = props;

    const themes=["material","cobalt","xq-dark","the-matrix","night","3024-day"];

  return (
<Dropdown >
<Dropdown.Toggle variant="dark" id="dropdown-basic">
    Theme: {themeMapping[theme]}
</Dropdown.Toggle>
<Dropdown.Menu >
    <Form.Check type="switch" label="Try Themes"  defaultChecked={allowTryTheme} className="mx-2" onChange={() => setAllowTryTheme(!allowTryTheme)} onClick={(e)=>{e.stopPropagation()}} title="Hover to try out themes on desktop, slide over to try on smartphones"/>
    <div ref={themeDropdownRef} >
        {themes.map((themeName,index)=>{
            return <DropdownItem key={themeName} onClick={() => updateTheme(themeName)} onMouseOver={()=>tryTheme(themeName)} onTouchStart={()=>{tryTheme(themeName);}} >{themeMapping[themeName]}</DropdownItem>
        })}
    </div>
</Dropdown.Menu>
</Dropdown>
)
}

export default ThemeSettings ;
