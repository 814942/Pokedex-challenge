import express, { Express, Request, Response } from 'express';
import cors from "cors";
import 'dotenv/config'

import verifyToken from './auth/verifyToken';
import routes from "./routes";
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

server.use(cors(corsOptions));
server.use(express.urlencoded({ extended: true }));
server.use(express.json());

// Routes
server.post("/login", login);

server.use('/protected', verifyToken, routes);

// Error catching endware.
server.use((err: Error, req: Request, res: Response) => {
  const message = err.message || err;
  console.error("Server error: ", err);
  res.status(500).send(message);
});

server.listen(port, () => {
  console.log(`[Server]: I am running at https://localhost:${port}`);
});