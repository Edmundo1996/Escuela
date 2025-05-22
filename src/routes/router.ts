import { Router } from "express";
import { login, getTimeToken } from "../controllers/auth.controller";

const router = Router();

router.post("/login", login); // POST /api/auth/login
router.post("/getTimeToken", getTimeToken); // POST /api/auth/getTimeToken
export default router;