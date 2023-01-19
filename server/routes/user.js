import express from 'express'
import { getOneUser, deleteUser } from '../controllers/users.js'
import { checkUser } from '../utils/verifyToken.js'
import { verify } from '../controllers/auth.js'
// import { forgotpassword } from '../controllers/auth.js'

const router = express.Router()

router.route('/:Id').get(checkUser, getOneUser).delete(checkUser, deleteUser)
router.route("/verifyuser/:id").get(verify);
// router.route("/forgorPassword").get(forgotpassword);
// router.route("/resetpassword/:resetToken").post(resetPassword);

export default router;
