import { Router } from 'express';

import auxLoginRequired from '../middlewares/auxRequired';
import AuxiliarAdm from '../controllers/AuxiliarAdm';

const router = new Router();

router.post('/', AuxiliarAdm.store);
router.get('/:id', auxLoginRequired, AuxiliarAdm.show);
router.put('/:id', auxLoginRequired, AuxiliarAdm.update);
router.delete('/:id', auxLoginRequired, AuxiliarAdm.delete);

export default router;
