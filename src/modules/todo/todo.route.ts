import express from 'express';
import { todoController } from './todo.controller';

const router = express.Router();

router.post('/', todoController.createTodo);

router.get('/', todoController.getTodo);

router.get('/:id', todoController.getSingleTodo);

router.put('/:id', todoController.UpdateTodo);

router.delete('/:id', todoController.deleteTodo);

export const todoRoutes = router;