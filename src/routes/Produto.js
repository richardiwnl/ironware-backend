import { Router } from 'express';

import auxRequired from '../middlewares/auxRequired';
import Produto from '../controllers/Produto';

const router = new Router();

router.post('/', auxRequired, Produto.store);
router.get('/', Produto.index);
router.get('/:id', Produto.show);
router.put('/:id', auxRequired, Produto.update);
router.delete('/:id', auxRequired, Produto.delete);

export default router;
