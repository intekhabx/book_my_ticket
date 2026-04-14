import pool from "../../common/config/db.config.js";
import ApiError from "../../common/utils/api-error.utils.js";
import { verifyAccessToken } from "../../common/utils/jwt.utils.js";


const isLoggedIn = async (req, res, next)=>{
  let token;
  if(req.headers.authorization?.startsWith("Bearer")){
    token = req.headers.authorization.split(" ")[1];
  }

  if(!token) throw ApiError.unAuthorize("Not Authenticated");

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
}


// const authorize = async(...roles)=>{
//   return (req, res, next)=>{
//     if(!roles.includes(req.user.role)){
//       throw ApiError.forbidden("You do not have permission to perform this action")
//     }
//     next();
//   }
// }


export {isLoggedIn}