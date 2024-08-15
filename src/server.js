import swaggerDocs from './swagger.js';
import express from 'express'

const app = require("./app");
const port = process.env.PORT || 3000;


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

