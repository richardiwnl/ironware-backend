import { Router } from 'express';

import Usuario from '../controllers/Usuario';
import loginRequired from '../middlewares/loginRequired';

const router = new Router();

router.post('/', Usuario.store);
router.put('/:id', loginRequired, Usuario.update);
router.get('/', loginRequired, Usuario.show);
router.delete('/:id', loginRequired, Usuario.delete);

export default router;
