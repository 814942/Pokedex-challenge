import express, { Express, Request, Response } from 'express';
import 'dotenv/config'

const app: Express = express();
const port = process.env.PORT || 4000;

app.get('/', (req: Request, res: Response)=>{
  res.send('Hello, Natural Tech House');
});

app.listen(port, ()=> {
  console.log(`[Server]: I am running at https://localhost:${port}`);
});