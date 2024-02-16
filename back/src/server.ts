import express, { Express } from 'express';
import swaggerUi from "swagger-ui-express";
import swaggerSpec from './swagger';
import cors from "cors";
import 'dotenv/config'

import verifyToken from './middlewares/verifyToken';
import router from "./router";
import login from './controllers/login';
const { PORT } = process.env

const server: Express = express();
const port = PORT || 4000;
const corsOptions = {
  "origin": "http://localhost:3000",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "allowedHeaders": "Origin, X-Requested-With, Content-Type, Accept",
  "credentials": true
}

// Middlewares
server.use(cors(corsOptions));
server.use(express.urlencoded({ extended: true }));
server.use(express.json());

// router
server.post("/login", login);
server.use('/protected', verifyToken, router);
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