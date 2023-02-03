import express from 'express';
const router = express.Router();
import { getUsers, createUser, deleteUserById, getUserById,updateUser, loginUser } from '../controllers/userController.js';
import { verifyUserLoggedIn } from '../auth/verifyUser.js';
router.get('/get-users', verifyUserLoggedIn, getUsers);
router.get('/get-user-details/:id', verifyUserLoggedIn, getUserById);
router.post('/create-user', createUser);
router.patch('/update-user/:id', verifyUserLoggedIn, updateUser)
router.delete('/delete-user/:id', verifyUserLoggedIn,  deleteUserById);
router.post('/login-user', loginUser)

export default router;