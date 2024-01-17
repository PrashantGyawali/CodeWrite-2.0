import {memo} from "react";
const ErrorMessagesElement = memo(({errorMessage}) => {
    
    return (
        <>
        {(errorMessage && <div className='error-text'>{errorMessage}</div>) || <div className="user-select-none">&nbsp;</div>}
        </>
    );
})

export default ErrorMessagesElement;