const express = require('express');

const app = express();
app.use(express.json());

// Datos en memoria de ejemplo
let cafes = [
  { id: 1, nombre: 'Espresso' },
  { id: 2, nombre: 'Americano' },
];

// GET /cafes - devuelve todos los cafés
app.get('/cafes', (req, res) => {
  res.status(200).json(cafes);
});

// DELETE /cafes/:id - elimina un café por id
app.delete('/cafes/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = cafes.findIndex((cafe) => cafe.id === id);

  if (index === -1) {
    return res.sendStatus(404);
  }

  cafes.splice(index, 1);
  return res.sendStatus(200);
});

// POST /cafes - agrega un nuevo café
app.post('/cafes', (req, res) => {
  const nuevoCafe = req.body;

  cafes.push(nuevoCafe);

  return res.status(201).json(nuevoCafe);
});

// PUT /cafes/:id - actualiza un café, valida que id de params == id del payload
app.put('/cafes/:id', (req, res) => {
  const idParams = Number(req.params.id);
  const cafePayload = req.body;

  if (idParams !== cafePayload.id) {
    return res.sendStatus(400);
  }

  const index = cafes.findIndex((cafe) => cafe.id === idParams);
  if (index === -1) {
    return res.sendStatus(404);
  }

  cafes[index] = cafePayload;
  return res.status(200).json(cafePayload);
});

// Exportamos app para testing
module.exports = app;

// Si se ejecuta directamente, levantamos el servidor
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Servidor escuchando en puerto ${PORT}`);
  });
}
