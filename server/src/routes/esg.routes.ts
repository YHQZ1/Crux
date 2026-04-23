import { Router } from "express";
import { protect } from "../middleware/auth.middleware.js";
import { submitESG, fetchESGHistory } from "../controllers/esg.controller.js";

const router = Router();

router.post("/", protect, submitESG);
router.get("/history", protect, fetchESGHistory);

export default router;
