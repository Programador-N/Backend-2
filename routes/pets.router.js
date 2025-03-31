const express = require('express');
const router = express.Router();

// Mock database
const pets = [];

// Middleware para validar parámetros
router.param('name', (req, res, next, name) => {
  if (!/^[a-zA-Z]+$/.test(name)) {
    return res.status(400).send({ error: 'El nombre de la mascota solo puede contener letras' });
  }

  const pet = pets.find(p => p.name === name);
  if (!pet) {
    return res.status(404).send({ error: 'Mascota no encontrada' });
  }

  req.pet = pet;
  next();
});

// POST: Insertar una mascota
router.post('/', (req, res) => {
  const { name, type } = req.body;
  if (!name || !type) {
    return res.status(400).send({ error: 'Faltan datos de la mascota' });
  }
  const newPet = { name, type, adopted: false };
  pets.push(newPet);
  res.status(201).send(newPet);
});

// GET: Obtener una mascota por nombre
router.get('/:name', (req, res) => {
  res.send(req.pet);
});

// PUT: Marcar una mascota como adoptada
router.put('/:name', (req, res) => {
  req.pet.adopted = true;
  res.send(req.pet);
});

module.exports = router;