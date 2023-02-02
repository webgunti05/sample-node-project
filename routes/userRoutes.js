import express from 'express';
const router = express.Router();
import { getUsers, createUser, deleteUserById, getUserById,updateUser } from '../controllers/userController.js';

router.get('/get-users', getUsers);
router.get('/get-user-details/:id', getUserById);
router.post('/create-user', createUser);
router.patch('/update-user/:id', updateUser)
router.delete('/delete-user/:id', deleteUserById);

export default router;