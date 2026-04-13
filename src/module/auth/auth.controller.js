import * as authService from './auth.service.js';
import ApiResponse from '../../common/utils/api-response.utils.js'

const register = async(req, res)=>{
  const user = await authService.register(req.body);
  ApiResponse.created(res, "user registered successfully", user);
}

const login = async (req, res)=>{
  const user = await authService.login(req.body);
  ApiResponse.ok(res, "user logged in successfully", user);
}

const logout = async(req, res)=>{
  
}


export {register, login, logout};
