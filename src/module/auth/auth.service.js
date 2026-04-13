import pool from "../../common/config/db.config.js";
import ApiError from '../../common/utils/api-error.utils.js';
import bcrypt from 'bcrypt';



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

  // now we create access_token and refresh_token later


  return {user};
}


const logout = async (userId)=>{
  return await pool.query(
    `UPDATE users SET refresh_token = NULL WHERE id = $1`,
    [userId]
  );
}


export default {register, login, logout};
