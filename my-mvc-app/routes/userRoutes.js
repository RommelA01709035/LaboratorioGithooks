const UserController = require("../controllers/userController");
const View = require("../views/render");

exports.showAllUsers = () => {
  const users = UserController.listUsers();
  return View.renderUsers(users);
};

exports.showUserById = (id) => {
  const user = UserController.getUser(id);
  return user ? `User: ${user.name}` : "User not found";
};
