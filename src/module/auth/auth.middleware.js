import pool from "../../common/config/db.config.js";
import ApiError from "../../common/utils/api-error.utils.js";
import { verifyAccessToken } from "../../common/utils/jwt.utils.js";


const isLoggedIn = async (req, res, next)=>{
  try {
    let token;
    if(req.headers.authorization?.startsWith("Bearer")){
      token = req.headers.authorization.split(" ")[1];
    }

    if(!token) {
      throw ApiError.unAuthorize("Not Authenticated");
    }

    const decoded = verifyAccessToken(token);
    
    const result = await pool.query(
      `SELECT id, email FROM users WHERE id = $1`,
      [decoded.id]
    );

    if(result.rowCount === 0){
      throw ApiError.unAuthorize("Not authorized user")
    }
    
    const user = result.rows[0];
    req.user = {
      id: user.id,
      email: user.email,
    }
    next();
  } catch (error) {
    console.error('isLoggedIn error:', error.message);
    next(error);
  }
}

// For EJS page routes - redirects to login instead of throwing error
const checkPageAuth = async (req, res, next) => {
  try {
    // Check token in Authorization header (for API calls)
    let token = req.headers.authorization?.startsWith("Bearer") 
      ? req.headers.authorization.split(" ")[1]
      : null;
    
    // If not in header, check in cookies (for page routes)
    if (!token) {
      token = req.cookies.accessToken;
    }

    if (!token) {
      // console.log('checkPageAuth: No token found');
      return res.redirect("/login");
    }

    const decoded = verifyAccessToken(token);
    
    const result = await pool.query(
      `SELECT id, email FROM users WHERE id = $1`,
      [decoded.id]
    );

    if(result.rowCount === 0){
      return res.redirect("/login");
    }
    
    const user = result.rows[0];
    req.user = {
      id: user.id,
      email: user.email,
    }
    next();
  } catch (error) {
    console.error('checkPageAuth error:', error.message);
    res.redirect("/login");
  }
}


// const authorize = async(...roles)=>{
//   return (req, res, next)=>{
//     if(!roles.includes(req.user.role)){
//       throw ApiError.forbidden("You do not have permission to perform this action")
//     }
//     next();
//   }
// }


export {isLoggedIn, checkPageAuth}