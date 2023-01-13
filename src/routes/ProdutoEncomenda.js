import { Router } from 'express';
import ProdutoEncomenda from '../controllers/ProdutoEncomenda';

const router = new Router();

router.post('/', ProdutoEncomenda.store);

export default router;
