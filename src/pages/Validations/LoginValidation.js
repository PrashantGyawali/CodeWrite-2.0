import * as yup from "yup";
import yupExtender from "./yupSetup";

yupExtender();

const loginSchema= yup.object().shape({
    password: yup.string("Incorrect Password").min(4,"Incorrect Password").max(32,"Incorrect Password").required(),
    email: yup.string().validEmail("Invalid Email").required("Invalid Email"),
})



const loginSchemaValidator=async(email,password)=>{
  return loginSchema.validate({email,password},{ abortEarly: true})
}



export default loginSchemaValidator;