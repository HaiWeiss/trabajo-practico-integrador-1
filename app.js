import cookieParser from 'cookie-parser';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './src/config/connectDB.js';

dotenv.config();

// Config
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());

const PORT = process.env.PORT || 3312;

app.get('/', (req, res) => {
  res.send('La ruta esta funcionando ᗜˬᗜ')
})

app.listen(PORT, async () => {
    await connectDB();
    console.log(`(ᵔ ᗜ ᵔ) El servidor se esta ejecutando en el purto ${PORT}`);
});