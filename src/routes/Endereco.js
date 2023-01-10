import { Router } from 'express';

import loginRequired from '../middlewares/loginRequired';
import auxLoginRequired from '../middlewares/auxRequired';

import enderecoController from '../controllers/Endereco';

const router = new Router();

router.post('/', loginRequired, auxLoginRequired, enderecoController.store);
router.get('/', loginRequired, auxLoginRequired, enderecoController.show);
router.put('/', loginRequired, auxLoginRequired, enderecoController.update);
// router.delete('/', loginRequired, enderecoController.delete);

export default router;
