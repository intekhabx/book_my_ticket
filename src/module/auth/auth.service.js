import {genereateAccessToken, genereateRefreshToken, verifyAccessToken, verifyRefreshToken} from "../../common/utils/jwt.utils.js"
import pool from "../../common/config/db.config.js";
import ApiError from '../../common/utils/api-error.utils.js';
import bcrypt from 'bcrypt';
import crypto from 'crypto';


const makeTokenHashed = (token)=>{
  return crypto.createHash('sha256').update(token).digest('hex');
}


const register = async ({first_name, last_name, email, password})=>{
  //first we check - user already registered or not
  const userExists = await pool.query(
    "SELECT * FROM users WHERE email = $1",
    [email]
  );

  // if row count is greater than 0 then we throw error
  if(userExists.rowCount > 0){
    throw ApiError.conflict("user already registered");
  }

  // if user is null means - this is a new user so we hash their password to store
  const hashed = await bcrypt.hash(password, 10); //making hash

  const user = await pool.query(
    `INSERT INTO users(first_name, last_name, email, password)
    VALUES($1, $2, $3, $4) RETURNING *`,
    [first_name, last_name, email, hashed]
  )

  return user.rows[0];
}


const login = async ({email, password}) =>{
  // first we check users email is right and stored in db
  const result = await pool.query(
    `SELECT id, email, password FROM users WHERE email = $1`,
    [email]
  )

  // if user not found then 
  if(result.rowCount === 0){
    throw ApiError.unAuthorize("invalid email or password");
  }

  // now we check its password
  const user = result.rows[0];
  const match = await bcrypt.compare(password, user.password);
  if(!match){
    throw ApiError.unAuthorize("invalid email or password");
  }

  // now we create access_token and refresh_token
  const newAccessToken = genereateAccessToken({id: user.id, email: user.email});
  const newRefreshToken = genereateRefreshToken({id: user.id});
  // we store refresh token in our db in hased form
  const hashedRefreshToken = makeTokenHashed(newRefreshToken);
  await pool.query(
    `UPDATE users SET refresh_token = $1 WHERE id = $2`,
    [hashedRefreshToken, user.id]
  )

  return {user, newAccessToken, newRefreshToken};
}


const refresh = async (token)=>{
  if(!token){
    throw ApiError.unAuthorize("token not found - refresh token is missing");
  }

  // we check the token is created with our secret
  const decoded = verifyRefreshToken(token);

  //we find user on the basis of id that we gave in the token
  const result = await pool.query(
    `SELECT refresh_token, id, email FROM users WHERE id = $1`,
    [decoded.id]
  )

  if(result.rowCount === 0){
    throw ApiError.unAuthorize("user no longer exist")
  }

  // now we compare db stored token and that token came from user
  const user = result.rows[0];
  if(user.refresh_token !== makeTokenHashed(token)){
    throw ApiError.unAuthorize("Invalid refresh token — please log in again");
  }

  // now if the user is right then we update the access token and refresh token
  const newAccessToken = genereateAccessToken({id: user.id, email: user.email});
  const newRefreshToken = genereateRefreshToken({id: user.id});

  // we store newRefreshToken in db
  const hashedRefreshToken = makeTokenHashed(newRefreshToken);
  await pool.query(
    `UPDATE users SET refresh_token = $1 WHERE id = $2`,
    [hashedRefreshToken, user.id]
  )

  return {user, newAccessToken, newRefreshToken};
}


const logout = async (userId)=>{
  return await pool.query(
    `UPDATE users SET refresh_token = NULL WHERE id = $1`,
    [userId]
  );
}


export {register, login, logout, refresh};
