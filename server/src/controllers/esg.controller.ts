import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware.js";
import { saveESGResult, getESGHistory } from "../services/esg.service.js";

export const submitESG = async (req: AuthRequest, res: Response) => {
  try {
    const result = await saveESGResult(req.user!.userId, req.body);
    res.status(201).json(result);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const fetchESGHistory = async (req: AuthRequest, res: Response) => {
  try {
    const data = await getESGHistory(req.user!.userId);
    res.json(data);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};
