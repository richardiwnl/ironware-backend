import { Router } from 'express';

import test from '../controllers/test';

const router = new Router();

router.get('/', test.index);

export default router;
