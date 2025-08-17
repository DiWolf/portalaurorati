import {Router} from 'express';
import {HomeController } from '@controllers/home.controller';

const router = Router(); 
const homeCtrl = new HomeController(); 

router.get("/",homeCtrl.home);

export default router;