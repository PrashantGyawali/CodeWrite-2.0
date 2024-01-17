import "./Auth.css";
import { useState,useRef, useEffect,memo } from "react";
import { useNavigate } from "react-router-dom";
import { useContext} from "react"; 
import { SettingsContext } from "../../App";
import loginSchemaValidator from "../Validations/LoginValidation";

import ErrorMessagesElement from "./ErrorMessage";

function Login() {

    const [passwordVisibility,setPasswordVisibility]=useState("password");
    const {user,setUser}= useContext(SettingsContext);
    const timerRef = useRef(null);

    const [isDisabled,setIsDisabled]=useState(false);

    useEffect(()=>{
      if(user.isAuth)
      {
        navigate("/projects");
      }
    },[user]);
    


    const showPassword=()=>{
      if(passwordVisibility=="password")
      {
        setPasswordVisibility("text");
        timerRef.current=setTimeout(()=>{setPasswordVisibility("password")},10000);
      }
      }




    const hidePassword=()=>{
      setPasswordVisibility("password");
      clearTimeout(timerRef.current);
    }





    const [errors,setErrors]=useState("");

    const navigate=useNavigate();
    const handleErrors = (newErrors) => {
        setIsDisabled(false);
        setErrors(newErrors);
        setTimeout(()=>{
            if(timerRef)
            {
              setErrors("");
            }
        },5000);
    }

    const handleSubmit = async(e) => {
      e.preventDefault();
      if(!isDisabled)
      {
        const formData=new FormData(e.currentTarget);

        const email=formData.get("email");
        const password=formData.get("password");
        setIsDisabled(true);

        loginSchemaValidator(email, password).then(async(data)=>
          {
            let res = await setUser("login", data);
            if(res && res.isAuth)
            {   setIsDisabled(false);
                navigate("/");  }
            else{ handleErrors(res.error);  }
          })
          .catch(async (error) => {
            if (error) {
              handleErrors(error.message);
              setIsDisabled
            }
          })
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
              <input type="email" className="auth-input" name="email" placeholder="" required autoComplete="true"/>{" "}
              <i className="floating-label">Email</i>
            </div>

            <div className="inputBox">
              <input type={passwordVisibility} className="auth-input"  name="password" required />{" "}
              <i className="floating-label">Password</i>
              <i className="show-password" onMouseDown={showPassword} onTouchStart={showPassword} onMouseUp={hidePassword} onTouchEnd={hidePassword}>&#128065;</i>
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


export default memo(Login);