import {Router} from 'express';
import {HomeController } from '@controllers/home.controller';

const router = Router(); 
const homeCtrl = new HomeController(); 

router.get("/",homeCtrl.home);
router.get("/contacto", homeCtrl.contacto);
router.post("/contacto", homeCtrl.contactoPost);  // ← NUEVA RUTA POST
export default router;