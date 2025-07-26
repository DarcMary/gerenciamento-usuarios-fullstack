import express from 'express';
import userRoutes from './routes/user.routes.js'; 
import cors from 'cors';

const app = express

if (process.env.NODE_ENV === 'production') {
  app.use(cors({
    origin: 'https://gerenciamento-usuarios-fullstack.vercel.app',
    optionsSuccessStatus: 200
  }));
} else {
  app.use(cors()); 
}
app.use(express.json());

app.use('/users', userRoutes); 

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});