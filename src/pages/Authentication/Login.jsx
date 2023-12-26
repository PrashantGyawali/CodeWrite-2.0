import React from "react";
import "./Auth.css";
import { isValidEmail } from "../../utils/Emailvalidator";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ErrorMessagesElement = ({errorMessage}) => {

    
    return (
        <>
        {(errorMessage && <div className='error-text'>{errorMessage}</div>) || <div className="user-select-none">&nbsp;</div>}
        </>
    );
}


export default function Login() {

    const [errors,setErrors]=useState("");

    const navigate=useNavigate();
    const handleErrors = (newErrors) => {
        setErrors(newErrors);
        setTimeout(()=>{
            setErrors("");
        },3000);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData=new FormData(e.currentTarget);

        const email=formData.get("email");
        const password=formData.get("password");
        
        if(!isValidEmail(email)){
            handleErrors( "Invalid Email");
            return
        }
        if(password.length<4)
        {
            handleErrors("Incorrect Password");
        }
    };


  return (
    <section className="auth-section">
      <div className="auth login">
        <div className="content">
          <div className="tab-row">
            <div className="tab  selected">Login</div>
            <div className="tab " onClick={()=>navigate("/auth/register")}>Register</div>
          </div>

          <h2>LOGIN</h2>

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="inputBox">
              <input type="email" className="auth-input" name="email" placeholder="" required />{" "}
              <i className="floating-label">Email</i>
            </div>

            <div className="inputBox">
              <input type="password" className="auth-input" name="password" required />{" "}
              <i className="floating-label">Password</i>
            </div>

            <div> 
                <ErrorMessagesElement errorMessage={errors} /> 
            </div>
            <div className="forgot-pass-div">
              <a href="#" className="forgot-pass-link">
                Forgot Password ?
              </a>
            </div>

            <div className="inputBox">
              <input type="submit" value="Login" className="auth-input" />
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
