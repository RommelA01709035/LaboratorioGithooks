const animals = [];

exports.getAll = () => animals;

exports.getBySpecies = (species) =>
  animals.filter((a) => a.species.toLowerCase() === species.toLowerCase());

exports.addAnimal = (animal) => {
  const newAnimal = { id: Date.now(), ...animal };
  animals.push(newAnimal);
  return newAnimal;
};

exports.updateAnimal = (id, updates) => {
  const index = animals.findIndex((a) => a.id === id);
  if (index === -1) return null;
  animals[index] = { ...animals[index], ...updates };
  return animals[index];
};

exports.deleteAnimal = (id) => {
  const index = animals.findIndex((a) => a.id === id);
  if (index === -1) return null;
  return animals.splice(index, 1)[0];
};
