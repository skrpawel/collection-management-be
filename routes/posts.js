import express from "express";
import { getPosts, getPost, addPost, updatePost, deletePost, getOwnPosts } from '../controllers/post.js'


const router = express.Router();

router.get('/', getPosts)
router.get('/:id', getPost)
router.post('/test', getOwnPosts)
router.post('/', addPost)
router.delete('/:id', deletePost)
router.put('/:id', updatePost)

export default router;