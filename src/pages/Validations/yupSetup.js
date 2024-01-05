import * as Yup from "yup";
import { isValidEmail } from "../../utils/Emailvalidator";

export default function yupExtender()
{

Yup.addMethod(Yup.string, "validEmail", function (errorMessage) {
    return this.test(`test-email`, errorMessage, function (value) {
      const { path, createError } = this;
  
      return (
        isValidEmail(value) ||
        createError({ path, message: errorMessage })
      );
    });
  });

}