const users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" }
];

exports.getAllUsers = () => users;

exports.getUserById = id => users.find(user => user.id === id);
