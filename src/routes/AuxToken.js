import { Router } from 'express';
import auxTokenController from '../controllers/AuxToken';

const router = new Router();

router.post('/', auxTokenController.store);

export default router;
