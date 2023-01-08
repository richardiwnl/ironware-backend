import { Router } from 'express';

import Usuario from '../controllers/Usuario';

const router = new Router();

router.post('/', Usuario.store);
router.put('/:id', Usuario.update);
router.get('/:id', Usuario.show);
router.delete('/:id', Usuario.delete);

export default router;
