import { Router } from 'express';

import Foto from '../controllers/Foto';

const router = new Router();

router.post('/', Foto.store);

export default router;
