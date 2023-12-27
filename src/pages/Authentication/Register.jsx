import React, { useState} from 'react';
import "./Auth.css"
import { isValidEmail } from '../../utils/Emailvalidator';
import { useNavigate } from 'react-router-dom';


const ErrorMessagesElement = ({errorMessage}) => {

    
    return (
        <>
        {(errorMessage && <div className='error-text'>{errorMessage}</div>) || <div className="user-select-none">&nbsp;</div>}
        </>
    );
}




export default function Register() {

  const [passwordVisibility,setPasswordVisibility]=useState("password");
  const showPassword=()=>{
    if(passwordVisibility=="password")
    {
      setPasswordVisibility("text");
      setTimeout(()=>{setPasswordVisibility("password")},4000);
    }
    }

  const hidePassword=()=>{
    setPasswordVisibility("password");
  }



    const [errors,setErrors]=useState("");
    const navigate=useNavigate();

    const handleErrors = (errMsg) => {
        setErrors(errMsg);
        setTimeout(()=>{
            setErrors("");
        },3000);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData=new FormData(e.currentTarget);

        const email=formData.get("email");
        const username=formData.get("username");
        const password=formData.get("password");
        
        if(username.length<4)
        {
            handleErrors("Username must be atleast 3 characters long");
        }
        if(!isValidEmail(email)){
            handleErrors("Invalid Email");
        }
        if(password.length<4)
        {
            handleErrors("Password must be atleast 4 characters long");
        }
    };


    
    return (
        <section className="auth-section">
        <div className="auth register">
          <div className="content">
            <div className="tab-row">
              <div className="tab" onClick={()=>navigate("/auth/login")}>Login</div>
              <div className="tab   selected" >Register</div>
            </div>
  
            <h2>REGISTER</h2>
  
            <form className="auth-form" onSubmit={handleSubmit}>
            <div className="inputBox">
                <input type="text" className="auth-input" name="username" required />{" "}
                <i className="floating-label">Username</i>
              </div>

              <div className="inputBox">
                <input type="email" className="auth-input" name="email" placeholder="" required />{" "}
                <i className="floating-label">Email</i>
              </div>
  
              <div className="inputBox">
                <input type={passwordVisibility} className="auth-input" name="password" required />{" "}
                <i className="floating-label">Password</i>
                <i className="show-password" onMouseDown={showPassword} onTouchStart={showPassword} onMouseUp={hidePassword} onTouchEnd={hidePassword}>&#128065;</i>
              </div>
  
              <div> 
                  <ErrorMessagesElement errorMessage={errors} /> 
              </div>
  
              <div className="inputBox">
                <input type="submit" value="Register" className="auth-input" />
              </div>
            </form>
          </div>
        </div>
      </section>
    );
}
