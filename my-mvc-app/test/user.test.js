const assert = require("assert");
const UserModel = require("../models/userModel");

describe("User Model", () => {
  it("should return all users", () => {
    const users = UserModel.getAllUsers();
    assert.strictEqual(users.length, 2);
  });

  it("should find user by ID", () => {
    const user = UserModel.getUserById(1);
    assert.strictEqual(user.name, "Alie");
  });
});
