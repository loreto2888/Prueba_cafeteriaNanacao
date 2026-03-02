const request = require('supertest');
// Ajusta esta ruta según dónde exportes tu app de Express
// Por ejemplo: const app = require('../src/app');
const app = require('../index');

describe('API Cafetería Nanacao - /cafes', () => {
  // 1. GET /cafes
  test('GET /cafes devuelve 200 y un arreglo con al menos 1 objeto', async () => {
    const { statusCode, body } = await request(app).get('/cafes');

    expect(statusCode).toBe(200);
    expect(Array.isArray(body)).toBe(true);
    expect(body.length).toBeGreaterThan(0);
    expect(typeof body[0]).toBe('object');
  });

  // 2. DELETE /cafes/:id con id que no existe
  test('DELETE /cafes/:id con id inexistente devuelve 404', async () => {
    const idInexistente = 9999;

    const { statusCode } = await request(app).delete(`/cafes/${idInexistente}`);

    expect(statusCode).toBe(404);
  });

  // 3. POST /cafes agrega un nuevo café y devuelve 201
  test('POST /cafes agrega un nuevo café y devuelve 201', async () => {
    const nuevoCafe = { id: 5, nombre: 'Latte' }; // ajusta si tu API espera otras propiedades

    const { statusCode/*, body*/ } = await request(app)
      .post('/cafes')
      .send(nuevoCafe);

    expect(statusCode).toBe(201);
    // Si tu API devuelve el arreglo actualizado o el objeto creado, puedes agregar asserts extra, por ejemplo:
    // expect(body).toEqual(expect.objectContaining(nuevoCafe));
  });

  // 4. PUT /cafes/:id devuelve 400 si el id del path es distinto al del payload
  test('PUT /cafes/:id devuelve 400 si id de params es distinto al id del payload', async () => {
    const idParams = 1;
    const cafePayload = { id: 2, nombre: 'Mocha' }; // id distinto al de params

    const { statusCode } = await request(app)
      .put(`/cafes/${idParams}`)
      .send(cafePayload);

    expect(statusCode).toBe(400);
  });
});
