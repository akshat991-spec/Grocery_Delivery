import express from 'express';
import { isAuth, login, logout, register } from '../controllers/userController.js';
import authUser from '../middlewares/authUser.js';


const userRouter = express.Router();

userRouter.post('/register', register)
userRouter.post('/login', login)
userRouter.get('/is-auth', authUser, isAuth)      //middleware is executed before executing the isAuth controller (find it in userController.js)
userRouter.get('/logout', authUser, logout)


export default userRouter