import express from 'express'
import * as controller from './auth.controller.js';
import validateReqData from '../../common/middleware/validate.middleware.js'
import RegisterDto from './dto/register.dto.js';
import LoginDto from './dto/login.dto.js'
import { isLoggedIn } from './auth.middleware.js';
const router = express.Router();


router.post('/register', validateReqData(RegisterDto), controller.register);
router.post('/login', validateReqData(LoginDto), controller.login);
router.post('/logout', isLoggedIn, controller.logout);
router.post('/refresh-token', controller.refresh);



export default router;
