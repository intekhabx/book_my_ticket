import jwt from 'jsonwebtoken';

const genereateAccessToken = async (payload)=>{
  return jwt.sign(payload, process.env.JWT_ACCESS_TOKEN, {
    expiresIn: process.env.JWT_ACCESS_EXPIRES_IN,
  })
}

const verifyAccessToken = async (token)=>{
  return jwt.verify(token, process.env.JWT_ACCESS_TOKEN);
}


const genereateRefreshToken = async (payload)=>{
  return jwt.sign(payload, process.env.JWT_REFRESH_TOKEN, {
    expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
  })
}

const verifyRefreshToken = async (token)=>{
  return jwt.verify(token, process.env.JWT_REFRESH_TOKEN);
}


export {genereateAccessToken, verifyAccessToken, genereateRefreshToken, verifyRefreshToken};
