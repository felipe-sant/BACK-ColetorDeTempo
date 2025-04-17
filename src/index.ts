import express from 'express';
import cors from 'cors';
import databaseRouters from './routes/database.routes';

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001
const dbUrl = process.env.API || "nao funcionou"

console.log(dbUrl)

// app.use(cors());
// app.use(express.json());

// app.use('/api', databaseRouters)

// app.listen(port, () => {
//     console.log(`Server is running on http://localhost:${port}`);
// });