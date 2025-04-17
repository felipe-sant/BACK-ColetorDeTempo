import express from 'express';
import cors from 'cors';
import databaseRouters from './routes/database.routes';

const app = express();
const port = process.env.PORT || 3001

// app.use(cors());
// app.use(express.json());

// app.use('/api', databaseRouters)

// app.listen(port, () => {
//     console.log(`Server is running on http://localhost:${port}`);
// });

const apiSecret = process.env.API_SECRET;

if (!apiSecret) {
  throw new Error("API secret is not defined");
}

console.log(`O segredo da API é: ${apiSecret}`);