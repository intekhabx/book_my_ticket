import Joi from "joi";
import BaseDto from "../../../common/dto/base.dto.js";

class LoginDto extends BaseDto{
  static schema = Joi.object({
    email: Joi.string().email().max(322).required().trim().lowercase().message("email is required"),
    password: Joi.string().min(8).max(66).required().trim().pattern(/(?=.*[A-Z])(?=.*\d)/).message("Password is required field with min 8 character"),
  })
}


export default LoginDto;
