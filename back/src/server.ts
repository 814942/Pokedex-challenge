import express, { Express, Request, Response } from 'express';

require("dotenv").config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response)=>{
  res.send('Hello, Natural Tech House');
});

app.listen(port, ()=> {
  console.log(`[Server]: I am running at https://localhost:${port}`);
});