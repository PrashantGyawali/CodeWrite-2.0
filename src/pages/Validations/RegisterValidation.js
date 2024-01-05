import * as yup from "yup";
import yupExtender from "./yupSetup";

yupExtender();
const registerSchema=yup.object().shape({
username: yup.string("Invalid Username").required("Username cannot be empty").min(3,"Username too short").max(32,"Username too long"),
email: yup.string("Email must be string").required().email("Invalid Email").validEmail("Invalid Email"),
password: yup.string("Password must be string").required().min(4,"Password too short").max(32,"Password too long"),
})

const registerSchemaValidator=async(username,email,password)=>{
    return registerSchema.validate({username,email,password},{abortEarly:true})
}

export default registerSchemaValidator;