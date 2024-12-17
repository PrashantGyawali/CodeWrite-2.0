import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function CookieNotice() {
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

    useEffect(() => {
        if (!navigator.cookieEnabled) {
            handleShow();
        }
        else if(!localStorage.getItem("cookie-notice") || (new Date().getTime()-localStorage.getItem("cookie-notice-time"))>86400000*2 || (parseInt(localStorage.getItem("cookie-notice-count")||"1")%4==1))    
        {
            if(parseInt(localStorage.getItem("cookie-notice-count")||"1")>13)
            {
                return;
            }
            handleShow();
            localStorage.setItem("cookie-notice",true);
            localStorage.setItem("cookie-notice-time",new Date().getTime());
            localStorage.setItem("cookie-notice-count",parseInt(localStorage.getItem("cookie-notice-count")||"0")+1);
        }
        else{
            localStorage.setItem("cookie-notice-count",parseInt(localStorage.getItem("cookie-notice-count")||"0")+1);
        }
    }, []);

	return (
		<>
			<Button variant="dark" onClick={handleShow} style={{opacity:0,visibility:"hidden",position:"absolute"}}>
				Cookie Notice
			</Button>

			<Modal show={show} onHide={handleClose} animation={false}>
				<Modal.Header style={{color:"red",backgroundColor:"black"}}>
					<Modal.Title >!!🍪Cookie Notice !!</Modal.Title>
				</Modal.Header>
				<Modal.Body data-bs-theme="dark"  style={{backgroundColor:"black"}}>
					This site uses <i>third party cookies</i>. Features may not work without cookies enabled. Please enable cookies for this site.
				</Modal.Body>
				<Modal.Footer style={{color:"red",backgroundColor:"black"}}>
					<Button variant="secondary" onClick={handleClose}>
						Close
					</Button>
					<Button variant="primary" onClick={handleClose}>
						OK
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}

export default CookieNotice;
