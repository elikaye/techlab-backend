import { Router } from 'express';
import { productsController } from '../controllers/products.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = Router();

router.get('/', productsController.getAll);
router.get('/:id', productsController.getById);
router.post('/create', authMiddleware, productsController.create);
router.delete('/:id', authMiddleware, productsController.remove);
router.put('/:id', authMiddleware, productsController.update);

export default router;
