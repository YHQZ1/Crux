import { Request, Response } from "express";
import { saveContact } from "../services/contact.service.js";

export const submitContact = async (req: Request, res: Response) => {
  try {
    const result = await saveContact(req.body);
    res.status(201).json(result);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};
