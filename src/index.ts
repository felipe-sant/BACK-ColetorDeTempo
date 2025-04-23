import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import databaseRouters from './routes/database.routes';

require('dotenv').config();

console.clear()

// Iniciando Conexão com o MongoDB

const MONGODB_URI = process.env.MONGODB_URI || "";

if (MONGODB_URI == "") {
    console.error("MongoDB URI is not defined in the environment variables.");
    process.exit(1);
}

mongoose.connect(MONGODB_URI)
    .then(() => console.log("MongoDB Connected!"))
    .catch(err => console.log("Error: ", err))

// Iniciando Rotas

const port = process.env.PORT || 3001;
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', databaseRouters)

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});