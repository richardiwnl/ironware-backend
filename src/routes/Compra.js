import { Router } from 'express';

import loginRequired from '../middlewares/loginRequired';
import Compra from '../controllers/Compra';

const router = new Router();

router.post('/', loginRequired, Compra.store);
router.get('/:id', loginRequired, Compra.show);

export default router;
