import { Router } from 'express';
import {
  createUser,
  getAllUsers,
  updateUser,
  deleteUser,
} from '../controllers/user.controller.js';

const router = Router();

router.post('/usuarios', createUser);

router.get('/usuarios', getAllUsers);

router.put('/usuarios/:id', updateUser);

router.delete('/usuarios/:id', deleteUser);

export default router;