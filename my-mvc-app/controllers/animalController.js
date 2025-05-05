const AnimalModel = require("../models/animalModel");

exports.listAll = (req, res) => {
  res.json(AnimalModel.getAll());
};

exports.findBySpecies = (req, res) => {
  const species = req.params.species;
  const found = AnimalModel.getBySpecies(species);
  res.json(found);
};

exports.create = (req, res) => {
  const animal = AnimalModel.addAnimal(req.body);
  res.status(201).json(animal);
};

exports.update = (req, res) => {
  const updated = AnimalModel.updateAnimal(Number(req.params.id), req.body);
  if (!updated) return res.status(404).json({ message: "Not found" });
  res.json(updated);
};

exports.remove = (req, res) => {
  const deleted = AnimalModel.deleteAnimal(Number(req.params.id));
  if (!deleted) return res.status(404).json({ message: "Not found" });
  res.json(deleted);
};
