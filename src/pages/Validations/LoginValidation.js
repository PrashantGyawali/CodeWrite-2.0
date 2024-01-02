import * as yup from "yup";
import { isValidEmail } from "../../utils/Emailvalidator";

yup.addMethod(yup.string, "validEmail", function (errorMessage) {
    return this.test(`test-email`, errorMessage, function (value) {
      const { path, createError } = this;
  
      return (
        isValidEmail(value) ||
        createError({ path, message: errorMessage })
      );
    });
  });

const loginSchema= yup.object().shape({
    password: yup.string("Incorrect Password").min(8,"Incorrect Password").max(32,"Incorrect Password").required(),
    email: yup.string().email().validEmail("Invalid Email").required("Invalid Email"),
})



const loginSchemaValidator=async(email,password)=>{
    return loginSchema.validate({email,password},{ abortEarly: true})
}



export default loginSchemaValidator;