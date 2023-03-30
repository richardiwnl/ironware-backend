import { Router } from "express";

import RelatorioController from "../controllers/Relatorio";

const router = new Router();

router.get('/', RelatorioController.show);

export default router;
