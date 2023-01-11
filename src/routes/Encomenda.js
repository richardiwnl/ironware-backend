import { Router } from 'express';

import auxRequired from '../middlewares/auxRequired';
import Encomenda from '../controllers/Encomenda';

const router = new Router();

router.post('/', auxRequired, Encomenda.store);
router.get('/:id', auxRequired, Encomenda.show);
router.put('/:id', auxRequired, Encomenda.update);
router.delete('/:id', auxRequired, Encomenda.delete);

export default router;
