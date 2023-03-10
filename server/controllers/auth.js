import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import User from "../model/user.js";
import { createError } from "../utils/error.js";
import sendEmail from "../utils/email.js";
import user from "../model/user.js";

export const registerUser = async (req, res, next) => {
  try {
    const { email } = req.body;
    User.findOne({ email }, async (err, user) => {
      if (err) return res.status(400);
      if (user) {
        return next(createError(400, { Message: "Email already in use" }));
      } else if (!user) {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const data = {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          password: hash,
        };
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return next(createError(400, { errors: errors.array() }));
        }
        const createUser = new User(data);

        const token = jwt.sign({ id: createUser._id }, process.env.JWT, {
          expiresIn: "3d",
        });

        createUser.token = token;

        const verifyUser = `${req.protocol}://${req.get(
          "host"
        )}/users/verifyuser/${createUser._id}`;

        const message = `Thank you for registering with us. Please click on this link ${verifyUser} to verify`;
        sendEmail({
          email: data.email,
          subject: "Kindly verify",
          message,
        });

        await createUser.save();

        return res.status(201).json({
          Message: "user created successfully!",
          data: createUser,
        });
      } else {
        return next();
      }
    });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return next(createError(404, "User not found"));
    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect)
      return next(createError(400, "Incorrect username or password"));
    const token = jwt.sign({ id: user._id }, process.env.JWT, {
      expiresIn: "3d",
    });

    user.token = token;
    user.save()

    const { password, ...otherDetails } = user._doc;
    console.log("cookies ", user);

    res.status(200).json({
      message: "User found and loggedIn successfully!!",
      data: {
        ...otherDetails,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  const user = await User.findById(req.params.Id);
  if (!user.token) {
    return next(createError(400, "Token Error"));
  }

  try {
    user.token = undefined;
    await user.save();
    res.json({ message: "Successfully logged out" });
  } catch (err) {
    next(err)
  }
};

export const verify = async (req, res, next) => {
  try {
    console.log("user._id");
    const user = await User.findOne({ _id: req.params.id });
    if (!user) return next(createError(400, "No user Found"));
    await User.findByIdAndUpdate(
      user._id,
      {
        verify: true,
      },
      { new: true }
    );
    await user.save();

    res
      .redirect(`http://localhost:3000/users/verifyuser/${user._id}`)
      .res.status(200)
      .json({
        message: "successfully verified",
      });
  } catch (error) {
    next(error);
  }
};

export const resendLink = async (req, res, next) => {
  try {
    const foundUser = await user.findOne({ _id: req.params.id });

    const verifyUser = `${req.protocol}://${req.get("host")}/users/verifyuser/${
      foundUser._id
    }`;
    const message = `Thank you for registering with us. Please click on this link ${verifyUser} to verify`;
    sendEmail({
      email: foundUser.email,
      subject: "Kindly verify",
      message,
    });
    return res.status(201).json({
      Message: "link sent successfully!",
    });
  } catch (err) {
    next(err);
  }
};

export const restLink = async (req, res, next) => {
  try{
    const id = req.params.id
    const token = req.params.token
   
  jwt.verify(token, process.env.JWT, async (err) => {
    if (err) {
      return next(createError(403, "Token not valid"));
    }
  });
  const userpaassword = await user.findById(id)
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(req.body.password, salt)
  userpaassword.password = hash
  userpaassword.save()
  res.send("you have successfuly change your password")

  }catch(err){next(err)}
}

export const forgotpassword = async (req, res, next) => { 
  try{
    const userEmail = await user.findOne({email: req.body.email})
    // console.log(userEmail)
  if (!userEmail) return next(createError(404, 'No user with that email'))
  const token = jwt.sign({ id: userEmail._id }, process.env.JWT, {
    expiresIn: "1m",
  });
  const resetURL = `${req.protocol}://${req.get(
        'host',
      )}/auth/restLink/${userEmail._id}/${token}`

  const message = `Forgot your password? Submit patch request with your new password to: ${resetURL}.
       \nIf you didnt make this request, simply ignore. Password expires in 10 minutes`
      sendEmail({
        email: userEmail.email,
        subject: 'Your password reset token is valid for 10 mins',
        message,
      })
      res.status(200).json({
        status: 'success',
        message: 'Token sent to email!',
      })

  }catch(err){
    next(err)
  }

}



// export const forgotpassword = async (req, res, next) => {
//   const user = await User.findOne({ username: req.body.email })
//   if (!user) return next(createError(404, 'No user with that email'))
//   const resetToken = user.createResetPassword()

//   await user.save({ validateBeforeSave: false })
//   const resetURL = `${req.protocol}://${req.get(
//     'host',
//   )}/users/resetpassword/${resetToken}`

//   try {
//     const message = `Forgot your password? Submit patch request with your new password to: ${resetURL}.
//      \nIf you didnt make this request, simply ignore. Password expires in 10 minutes`
//     sendEmail({
//       email: user.email,
//       subject: 'Your password reset token is valid for 10 mins',
//       message,
//     })
//     res.status(200).json({
//       status: 'success',
//       message: 'Token sent to email!',
//     })
//   } catch (err) {
//     user.resetPasswordToken = undefined
//     user.resetPasswordExpires = undefined
//     await user.save({ validateBeforeSave: false })
//     return next(
//       createError(
//         500,
//         'There was an error sending email, please try again later',
//       ),
//     )
//   }
// }
