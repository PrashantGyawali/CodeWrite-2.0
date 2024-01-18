import {useRef,memo, useCallback, useMemo} from 'react'
import { Dropdown,Form } from 'react-bootstrap'
import DropdownItem from '../DropdownItem';
import { useAtom } from 'jotai';
import { themeAtom,allowTryThemeAtom} from '../../Store/ThemeSettingsStore';


//handling themes
const themeMapping={
    "material":"Material",
    "cobalt":"Cobalt",
    "xq-dark":"XQ-dark",
    "the-matrix":"Matrix",
    "night":"Night",
    "3024-day":"Light"
}

const DropdownList=memo(({themes,tryTheme,updateTheme})=>{

    return (
    <>
    {
    themes.map(
        (theme)=>
            <DropdownItem key={theme} onClick={() => updateTheme(theme)} onMouseEnter={()=>tryTheme(theme)} onTouchStart={()=>{tryTheme(theme);}} >
                {themeMapping[theme]}
            </DropdownItem>
        )
    }
    </>
    );
})



function ThemeSettings() {

    const [theme, setTheme] = useAtom(themeAtom);
    const [allowTryTheme, setAllowTryTheme] = useAtom(allowTryThemeAtom);

        //Updating themes and trying themes
        const themeRef=useRef(theme);
        const themeDropdownRef=useRef(null);
    
    
        const tryTheme = useCallback((toTryTheme) => {
            if(!allowTryTheme){
                return;
            }
            else{
                setTheme(toTryTheme);
                themeDropdownRef.current.addEventListener("mouseleave",()=>{setTheme(themeRef.current);}) 
                themeDropdownRef.current.addEventListener("touchend",()=>{setTheme(themeRef.current);}) 
            }
        },[allowTryTheme]);
    
        const updateTheme = useCallback((newTheme) => {
            themeRef.current=newTheme;
            setTheme(newTheme);
        },[])


    const themes=useMemo(()=>["material","cobalt","xq-dark","the-matrix","night","3024-day"],[]);

return (
<Dropdown >
<Dropdown.Toggle variant="dark" id="dropdown-basic">
    Theme: {themeMapping[theme]}
</Dropdown.Toggle>
<Dropdown.Menu >
    <Form.Check type="switch" label="Try Themes"  defaultChecked={allowTryTheme} className="mx-2" onChange={() => setAllowTryTheme(!allowTryTheme)} onClick={(e)=>{e.stopPropagation()}} title="Hover to try out themes on desktop, slide over to try on smartphones"/>
    <div ref={themeDropdownRef} >
        <DropdownList themes={themes} tryTheme={tryTheme} updateTheme={updateTheme}/>
    </div>
</Dropdown.Menu>
</Dropdown>
)
}

export default memo(ThemeSettings) ;
