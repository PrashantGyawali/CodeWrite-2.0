import { memo, useCallback, useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import checkIcon from  "../../assets/checkIcon.svg"
import copyButton from "../../assets/copyButton.svg"
import shareIcon from "../../assets/shareIcon.svg"
import screenshotIcon from "../../assets/screenshotIcon.svg"

import ModalComponent from "./ScreenshotComponent"





function ScreenshotModal() {
    const [show, setShow] = useState(false);


    const handleClose = useCallback(() => setShow(false));
    const handleShow = useCallback(() => setShow(true));

    const [copied, setCopied] = useState(false);



    const copyToClipboard = () => {
        navigator.clipboard.writeText(`https://codewrite-2.vercel.app/shared/${code.type}/${code.sharedURL}`);
        setCopied(true);
    }


    useEffect(() => {
        if (copied) {
            setTimeout(() => { setCopied(false) }, 2000);
        }
    }, [copied]);


    return (
        <>

            <div className={`text-light px-2 py-1 cursor-pointer rounded`} onClick={handleShow}>
                <img src={screenshotIcon} alt="settings"  />
            </div>

            {show && <ModalComponent handleClose={handleClose} />}

        </>
    );
}

export default memo(ScreenshotModal);