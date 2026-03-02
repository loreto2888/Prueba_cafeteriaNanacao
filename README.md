# Prueba - Cafetería Nanacao

Este proyecto implementa una pequeña API REST para la Cafetería Nanacao y los tests solicitados con Jest y supertest.

## API

La API está definida en `index.js` y expone las siguientes rutas sobre la colección de cafés:

- `GET /cafes`
  - Devuelve status **200**.
  - El cuerpo de la respuesta es un **arreglo** de cafés con al menos **1 objeto**.

- `DELETE /cafes/:id`
  - Si el `id` enviado **no existe** en la colección, devuelve status **404**.

- `POST /cafes`
  - Recibe un objeto café en el body (por ejemplo: `{ "id": 5, "nombre": "Latte" }`).
  - Agrega el nuevo café a la colección.
  - Devuelve status **201**.

- `PUT /cafes/:id`
  - Recibe un objeto café en el body.
  - Si el `id` de la URL es **distinto** al `id` del payload, devuelve status **400**.
  - Si coinciden y el café existe, actualiza y devuelve status **200**.

## Tests (Jest + supertest)

Los tests se encuentran en `tests/cafes.test.js` y cubren los requerimientos de la prueba:

1. **GET /cafes**
   - Verifica que la ruta devuelve status **200**.
   - Verifica que el tipo de dato recibido es un **arreglo** con al menos **1 objeto**.

2. **DELETE /cafes/:id** con `id` inexistente
   - Verifica que se obtiene status **404** al intentar eliminar un café con un `id` que no existe.

3. **POST /cafes**
   - Verifica que al agregar un nuevo café la ruta devuelve status **201**.

4. **PUT /cafes/:id**
   - Verifica que si se intenta actualizar un café enviando un `id` en los parámetros **diferente** al `id` dentro del payload, la ruta devuelve status **400**.

## Cómo ejecutar el proyecto

1. Instalar dependencias:

```bash
npm install
```

2. Ejecutar los tests:

```bash
npm test
```

3. (Opcional) Levantar el servidor para probar manualmente:

```bash
npm start
```
