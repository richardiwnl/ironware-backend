import { Router } from 'express';

import auxRequired from '../middlewares/auxRequired';
import Categoria from '../controllers/Categoria';

const router = new Router();

router.post('/', auxRequired, Categoria.store);
router.get('/', auxRequired, Categoria.index);

export default router;
