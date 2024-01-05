import { useState, useContext, useEffect} from 'react';
import "./Auth.css"
import { useNavigate } from 'react-router-dom';

import { SettingsContext } from '../../App';
import registerSchemaValidator from '../Validations/RegisterValidation';


const ErrorMessagesElement = ({errorMessage}) => {
    
    return (
        <>
        {(errorMessage && <div className='error-text'>{errorMessage}</div>) || <div className="user-select-none">&nbsp;</div>}
        </>
    );
}




export default function Register() {

  const {user,setUser}= useContext(SettingsContext);

  const [passwordVisibility,setPasswordVisibility]=useState("password");


  const showPassword=()=>{
    if(passwordVisibility=="password")
    { setPasswordVisibility("text");
      setTimeout(()=>{setPasswordVisibility("password")},4000);
    }
    }

  const hidePassword=()=>{
    setPasswordVisibility("password");
  }

  useEffect(()=>{
    if(user.isAuth)
    {
      navigate("/projects");
    }
  },[user])


    const [errors,setErrors]=useState("");
    const navigate=useNavigate();

    const handleErrors = (errMsg) => {
        setErrors(errMsg);
        setTimeout(()=>{
            setErrors("");
        },3000);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData=new FormData(e.currentTarget);

        const email=formData.get("email");
        const username=formData.get("username");
        const password=formData.get("password");
        
        registerSchemaValidator(username.trim(),email.trim(), password).then(async(data)=>
          {
            let res = await setUser("register", data);
            if(res && res.isAuth)
            {   navigate("/projects");  }
            else{ handleErrors(res.error);  }
          })
          .catch(async (error) => {
            if (error) {
              handleErrors(error.message);
            }
          })


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
                <input type="text" className="auth-input" name="username" required autoComplete='true'/>{" "}
                <i className="floating-label">Username</i>
              </div>

              <div className="inputBox">
                <input type="email" className="auth-input" name="email" placeholder="" required autoComplete='true'/>{" "}
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
