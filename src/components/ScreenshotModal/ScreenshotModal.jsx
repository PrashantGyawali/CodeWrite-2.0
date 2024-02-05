import { memo, useCallback, useState } from 'react';
import screenshotIcon from "../../assets/screenshotIcon.svg"

import ModalComponent from "./ScreenshotComponent"



function ScreenshotModal() {
    const [show, setShow] = useState(false);


    const handleClose = useCallback(() => setShow(false));
    const handleShow = useCallback(() => setShow(true));

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