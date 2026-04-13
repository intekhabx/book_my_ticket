import Joi from "joi";
import BaseDto from "../../../common/dto/base.dto.js";

class RegisterDto extends BaseDto{
  static schema = Joi.object({
    first_name: Joi.string().min(2).max(55).required().trim().message("first name is required"),
    last_name: Joi.string().max(55).trim(),
    email: Joi.string().email().max(322).required().trim().lowercase().message("email is required"),
    password: Joi.string().min(8).max(66).required().trim().pattern(/(?=.*[A-Z])(?=.*\d)/).message("Password is required field with min 8 character"),
    role: Joi.string().valid('user', 'admin').default("user")
  })
}


export default RegisterDto;
