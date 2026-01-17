import express from 'express'
import verifyJWT from '../middlewares/verifyJwt.js'
import { changeUserStatus, getUsers } from '../controllers/adminController.js'
import checkBlocked from '../middlewares/verifyIsBlocked.js'
const router = express.Router()


router.get('/users' , verifyJWT , checkBlocked, getUsers)
router.post('/users/statusChange/:id' , verifyJWT  , checkBlocked , changeUserStatus)

export default router