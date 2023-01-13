import { Router } from 'express';

import loginRequired from '../middlewares/loginRequired';
import ProdutoCompra from '../controllers/ProdutoCompra';

const router = new Router();

router.post('/', loginRequired, ProdutoCompra.store);

export default router;
