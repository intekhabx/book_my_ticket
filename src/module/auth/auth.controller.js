import * as authService from './auth.service.js';
import ApiResponse from '../../common/utils/api-response.utils.js'

const register = async(req, res)=>{
  const user = await authService.register(req.body);
  ApiResponse.created(res, "user registered successfully", user);
}

const login = async (req, res)=>{
  const {user, newAccessToken, newRefreshToken} = await authService.login(req.body);
  res.cookie("refreshToken", newRefreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  })
  ApiResponse.ok(res, "user logged in successfully", {user, newAccessToken});
}

const refresh = async (req, res)=>{
  const {user, newAccessToken, newRefreshToken} = await authService.refresh(req.cookies?.refreshToken);
  res.cookie("refreshToken", newRefreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  })
  ApiResponse.ok(res, "token refreshed successfully", {user, newAccessToken});
}

const logout = async(req, res)=>{
  await authService.logout(req.user.id)
  res.clearCookie("refreshToken");
  ApiResponse.ok(res, "user logged out successfully");
}


export {register, login, logout, refresh};
