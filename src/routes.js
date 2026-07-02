import { Router } from "express";
import homeControllers from "../Controllers/homeControllers.js";
import authControllers from "../Controllers/authControllers.js";


const router = Router();
router.use(homeControllers);
router.use(authControllers)

export default router;



