const UserModel = require("../models/userModel");

exports.getAll = (req, res) => {
  res.json(UserModel.getAll());
};

exports.create = (req, res) => {
  const user = UserModel.create(req.body);
  res.status(201).json(user);
};

exports.update = (req, res) => {
  const updated = UserModel.update(Number(req.params.id), req.body);
  if (!updated) return res.status(404).json({ message: "Not found" });
  res.json(updated);
};

exports.remove = (req, res) => {
  const deleted = UserModel.delete(Number(req.params.id));
  if (!deleted) return res.status(404).json({ message: "Not found" });
  res.json(deleted);
};
