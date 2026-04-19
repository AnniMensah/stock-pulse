import { Router } from 'express';
import * as stockCtrl from '../controllers/stock.controller.js';

const router = Router();

router.get('/', stockCtrl.getProducts);
router.post('/update', stockCtrl.updateStock);
router.get('/low-stock', stockCtrl.getLowStock);

export default router;
