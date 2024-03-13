// Import the necessary modules here

import { sendPasswordResetEmail } from "../../../utils/emails/passwordReset.js";
import { sendWelcomeEmail } from "../../../utils/emails/welcomeMail.js";
import { ErrorHandler } from "../../../utils/errorHandler.js";
import { sendToken } from "../../../utils/sendToken.js";
import {
  createNewUserRepo,
  deleteUserRepo,
  findUserForPasswordResetRepo,
  findUserRepo,
  getAllUsersRepo,
  updateUserProfileRepo,
  updateUserRoleAndProfileRepo,
} from "../models/user.repository.js";
import crypto from "crypto";

//Create new user controller function....
export const createNewUser = async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    const newUser = await createNewUserRepo(req.body);
    await sendToken(newUser, res, 200);
    await sendWelcomeEmail(newUser);
  } catch (err) {
    return next(new ErrorHandler(400, err));
  }
};

//User login controller function...
export const userLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    console.log("Email:", email);
    console.log("Password:", password);
    if (!email || !password) {
      return next(new ErrorHandler(400, "please enter email/password"));
    }
    const user = await findUserRepo({ email }, true);
    console.log("User:", user);
    if (!user) {
      return next(
        new ErrorHandler(401, "user not found! register yourself now!!")
      );
    }
    const passwordMatch = await user.comparePassword(password);
    console.log("Password Match:", passwordMatch);
    if (!passwordMatch) {
      return next(new ErrorHandler(401, "Invalid email or password!"));
    }
    await sendToken(user, res, 200);
    console.log("Token Sent Successfully");
  } catch (error) {
    return next(new ErrorHandler(400, error));
  }
};

//logout User controller function...
export const logoutUser = async (req, res, next) => {
  res
    .status(200)
    .cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    })
    .json({ success: true, msg: "logout successful" });
};

//forget password controller function...
export const forgetPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await findUserRepo({ email });

    if (!user) {
      return next(
        new ErrorHandler(404, "User not found with the provided email")
      );
    }
    const resetToken = user.getResetPasswordToken();
    await user.save();
    await sendPasswordResetEmail(user, resetToken);

    res
      .status(200)
      .json({ success: true, msg: "Password reset email sent successfully" });
  } catch (error) {
    return next(new ErrorHandler(500, error));
  }
};

//Reset user password controller function...
export const resetUserPassword = async (req, res, next) => {
  try {
    const hashedToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");
    const userForPasswordReset = await findUserForPasswordResetRepo(
      hashedToken
    );
    if (!userForPasswordReset) {
      return next(new ErrorHandler(400, "Invalid token or token has expired"));
    }
    userForPasswordReset.password = req.body.password;
    userForPasswordReset.resetPasswordToken = undefined;
    userForPasswordReset.resetPasswordExpire = undefined;

    await userForPasswordReset.save();
    res.status(200).json({ success: true, msg: "Password reset successfully" });
  } catch (error) {
    return next(new ErrorHandler(500, error));
  }
};

//Get user Details controller function...
export const getUserDetails = async (req, res, next) => {
  try {
    const userDetails = await findUserRepo({ _id: req.user._id });
    res.status(200).json({ success: true, userDetails });
  } catch (error) {
    return next(new ErrorHandler(500, error));
  }
};

//Update Password controller function....
export const updatePassword = async (req, res, next) => {
  const { currentPassword, newPassword, confirmPassword } = req.body;
  try {
    if (!currentPassword) {
      return next(new ErrorHandler(401, "please enter current password"));
    }

    const userToUpdatePassword = await findUserRepo(
      { _id: req.user._id },
      true
    );
    const passwordMatch = await userToUpdatePassword.comparePassword(
      currentPassword
    );
    if (!passwordMatch) {
      return next(new ErrorHandler(401, "Incorrect current password!"));
    }

    if (!newPassword || newPassword !== confirmPassword) {
      return next(
        new ErrorHandler(401, "mismatch new password and confirm password!")
      );
    }

    userToUpdatePassword.password = newPassword;
    await userToUpdatePassword.save();
    await sendToken(userToUpdatePassword, res, 200);
  } catch (error) {
    return next(new ErrorHandler(400, error));
  }
};

//Update user profile controller function...
export const updateUserProfile = async (req, res, next) => {
  const { name, email } = req.body;
  try {
    const updatedUserDetails = await updateUserProfileRepo(req.user._id, {
      name,
      email,
    });
    res.status(201).json({ success: true, updatedUserDetails });
  } catch (error) {
    return next(new ErrorHandler(400, error));
  }
};

//Get all users controller function (admin controllers)
export const getAllUsers = async (req, res, next) => {
  try {
    const allUsers = await getAllUsersRepo();
    res.status(200).json({ success: true, allUsers });
  } catch (error) {
    return next(new ErrorHandler(500, error));
  }
};

//Get user details  by id controller function...
export const getUserDetailsForAdmin = async (req, res, next) => {
  try {
    const userDetails = await findUserRepo({ _id: req.params.id });
    if (!userDetails) {
      return res
        .status(400)
        .json({ success: false, msg: "no user found with provided id" });
    }
    res.status(200).json({ success: true, userDetails });
  } catch (error) {
    return next(new ErrorHandler(500, error));
  }
};

//Delete user by id controller function....
export const deleteUser = async (req, res, next) => {
  try {
    const deletedUser = await deleteUserRepo(req.params.id);
    if (!deletedUser) {
      return res
        .status(400)
        .json({ success: false, msg: "no user found with provided id" });
    }

    res
      .status(200)
      .json({ success: true, msg: "user deleted successfully", deletedUser });
  } catch (error) {
    return next(new ErrorHandler(400, error));
  }
};

//update user profile and role controller function.
export const updateUserProfileAndRole = async (req, res, next) => {
  const { name, userEmail, userRole } = req.body;
  try {
    const updatedUserDetails = await updateUserRoleAndProfileRepo(
      req.params.id,
      {
        name,
        email: userEmail,
        role: userRole,
      }
    );

    if (!updatedUserDetails) {
      return res
        .status(400)
        .json({ success: false, msg: "No user found with provided id" });
    }

    res.status(201).json({ success: true, updatedUserDetails });
  } catch (error) {
    return next(new ErrorHandler(400, error));
  }
};
