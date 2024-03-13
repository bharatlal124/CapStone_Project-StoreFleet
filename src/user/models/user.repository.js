import UserModel from "./user.schema.js";

//New user repo..
export const createNewUserRepo = async (user) => {
  return await new UserModel(user).save();
};

//find user repo...
export const findUserRepo = async (factor, withPassword = false) => {
  if (withPassword) return await UserModel.findOne(factor).select("+password");
  else return await UserModel.findOne(factor);
};

//find user for password reset repo....
export const findUserForPasswordResetRepo = async (hashtoken) => {
  return await UserModel.findOne({
    resetPasswordToken: hashtoken,
    resetPasswordExpire: { $gt: Date.now() },
  });
};

//update user profile by id repo...
export const updateUserProfileRepo = async (_id, data) => {
  return await UserModel.findOneAndUpdate(_id, data, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
};

//Get all users repo..
export const getAllUsersRepo = async () => {
  return UserModel.find({});
};

//Delete User by id repo..
export const deleteUserRepo = async (_id) => {
  return await UserModel.findByIdAndDelete(_id);
};

//update user role and profile by id repo....
export const updateUserRoleAndProfileRepo = async (_id, data) => {
  return await UserModel.findByIdAndUpdate(_id, data, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
};
