import { Router } from 'express';
import salesRouter from './sales.js';
import stockRouter from './stock.routes.js';

const router = Router();

router.use('/sales', salesRouter);
router.use('/stock', stockRouter);

export default router;
