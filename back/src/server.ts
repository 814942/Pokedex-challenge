import express, { Express, Request, Response } from 'express';
import swaggerUi from "swagger-ui-express";
import swaggerSpec from './swagger';
import cors from "cors";
import 'dotenv/config'

import router from './router';
const { PORT } = process.env

const server: Express = express();
const port = PORT || 4000;
const corsOptions = {
  "origin": ["http://localhost:3000", "https://pokedex-back-zeta.vercel.app/"],
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "allowedHeaders": "Origin, X-Requested-With, Content-Type, Accept, Authorization",
  "credentials": true
}

// Middlewares
server.use(cors(corsOptions));
server.use(express.urlencoded({ extended: true }));
server.use(express.json());

// welcome
server.get('/', (req: Request, res: Response) => {
  res.send("Welcome to my pokedex")
});

// router
server.use('/', router);
server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Error catching endware.
// TODO: implementar error handling
// server.use((err: Error, req: Request, res: Response) => {
//   const message = err.message || err;
//   console.error("Server error: ", err);
//   res.status(500).send(message);
// });

server.listen(port, () => {
  console.log(`[Server]: I am running at https://localhost:${port}`);
});

export default server