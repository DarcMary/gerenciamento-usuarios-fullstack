import express from 'express';
import Prisma from '@prisma/client';
import userRoutes from './routes/user.routes.js'; 
import cors from 'cors';

const { PrismaClient } = Prisma;
const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.use('/users', userRoutes); 

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});