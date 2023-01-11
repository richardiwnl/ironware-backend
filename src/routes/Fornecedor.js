import { Router } from 'express';

import auxRequired from '../middlewares/auxRequired';
import Fornecedor from '../controllers/Fornecedor';

const router = new Router();

router.post('/', auxRequired, Fornecedor.store);
router.get('/:id', auxRequired, Fornecedor.show);
router.put('/:id', auxRequired, Fornecedor.update);
router.delete('/:id', auxRequired, Fornecedor.delete);

export default router;
