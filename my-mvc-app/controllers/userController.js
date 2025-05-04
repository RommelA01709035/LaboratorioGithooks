const UserModel = require("../models/userModel");

exports.listUsers = () => {
  return UserModel.getAllUsers();
};

exports.getUser = (id) => {
  return UserModel.getUserById(id);
};
