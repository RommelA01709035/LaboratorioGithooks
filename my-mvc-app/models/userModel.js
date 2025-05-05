const users = [];

exports.getAll = () => users;

exports.create = (data) => {
  const newUser = { id: Date.now(), ...data };
  users.push(newUser);
  return newUser;
};

exports.update = (id, data) => {
  const index = users.findIndex(u => u.id === id);
  if (index === -1) return null;
  users[index] = { ...users[index], ...data };
  return users[index];
};

exports.delete = (id) => {
  const index = users.findIndex(u => u.id === id);
  if (index === -1) return null;
  return users.splice(index, 1)[0];
};
