import { Router } from 'express';

import loginRequired from '../middlewares/loginRequired';
import enderecoController from '../controllers/Endereco';

const router = new Router();

router.post('/', loginRequired, enderecoController.store);
router.get('/', loginRequired, enderecoController.show);
router.put('/', loginRequired, enderecoController.update);
// router.delete('/', loginRequired, enderecoController.delete);

export default router;
