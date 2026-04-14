import jwt from 'jsonwebtoken';

const genereateAccessToken = (payload)=>{
  return jwt.sign(payload, process.env.JWT_ACCESS_TOKEN, {
    expiresIn: process.env.JWT_ACCESS_EXPIRES_IN,
  })
}

const verifyAccessToken = (token)=>{
  return jwt.verify(token, process.env.JWT_ACCESS_TOKEN);
}


const genereateRefreshToken = (payload)=>{
  return jwt.sign(payload, process.env.JWT_REFRESH_TOKEN, {
    expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
  })
}

const verifyRefreshToken = (token)=>{
  return jwt.verify(token, process.env.JWT_REFRESH_TOKEN);
}


export {genereateAccessToken, verifyAccessToken, genereateRefreshToken, verifyRefreshToken};
