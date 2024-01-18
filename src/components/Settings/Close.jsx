import { memo } from 'react'
import { useContext } from 'react';
import { SettingsContext } from '../../App';
import { useNavigate } from 'react-router-dom';
import useLocalStorage from '../../hooks/localstorage';
import { Button } from 'react-bootstrap';
import exitIcon from "../../assets/exitIcon.svg"

function Close() {
    
    const [lastOpened, setLastOpened] = useLocalStorage("lastOpened", { web: "", md: "" });

    //handle close button
    const navigate = useNavigate();

    const { editor } = useContext(SettingsContext);

    const closeProject=()=>{
        setLastOpened({ ...lastOpened, [editor]: ""});
        setTimeout(() => {
            navigate(`/projects/${editor}`); 
    },10)
    }


return (
    <Button variant="secondary" onClick={closeProject} ><img src={exitIcon}  className="icon-images"/>  Close</Button>
    )
}


export default memo(Close);