exports.renderUsers = (users) => {
  return users.map(user => `- ${user.name}`).join("\n");
};
