import express from 'express'
import { check} from 'express-validator'
import { login, registerUser, resendLink, logout, restLink, forgotpassword } from '../controllers/auth.js'
import {verifyToken} from '../utils/verifyToken.js'

const router = express.Router()

router
  .route('/register')
  .post(
    [
      check('email', 'Please include a valid email').isEmail(),
      check(
        'password',
        'Please enter a password with 8 or more characters',
      ).isLength({ min: 8 }),
    ],
    registerUser,
  )
router.route("/login").post(login);
router.route("/resendLink/:id").post(resendLink);
router.route("/restLink/:id/:token").post(verifyToken,restLink);
router.route("/logout/:Id").post(logout);
router.route("/forgotpassword/").post(forgotpassword);

export default router
