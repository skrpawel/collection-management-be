import express from "express";
import { getUsers, blockUser, unblockUser, deleteUser } from "../controllers/user.js";

const router = express.Router();

router.get('/', getUsers)
router.post('/block/:id', blockUser)
router.post('/unblock/:id', unblockUser)
router.delete('/delete/:id', deleteUser)


export default router;