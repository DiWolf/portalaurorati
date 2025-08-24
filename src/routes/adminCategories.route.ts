import { Router } from "express";
import { AdminCategoriesController } from "@controllers/adminCategories.controller";

const router = Router();
const ctrl = new AdminCategoriesController(); 

router.get('/', ctrl.list);
router.post('/', ctrl.create); // ← para el modal
router.post('/:id', ctrl.update);      // editar (POST simple)
// src/routes/admin.categories.routes.ts
router.post('/:id/eliminar', ctrl.remove);

export default router;