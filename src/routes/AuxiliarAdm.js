import { Router } from 'express';

import AuxiliarAdm from '../controllers/AuxiliarAdm';

const router = new Router();

router.post('/', AuxiliarAdm.store);
router.get('/:id', AuxiliarAdm.show);
router.put('/:id', AuxiliarAdm.update);
router.delete('/:id', AuxiliarAdm.delete);

export default router;
