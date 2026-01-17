import express from 'express'
import verifyJWT from '../middlewares/verifyJwt.js'
import { changeUserStatus, getUsers } from '../controllers/adminController.js'
const router = express.Router()


router.get('/users' , verifyJWT , getUsers)
router.post('/users/statusChange/:id' , verifyJWT , changeUserStatus)

export default router