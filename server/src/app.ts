import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import contactRoutes from "./routes/contact.routes.js";
import esgRoutes from "./routes/esg.routes.js";

const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/esg", esgRoutes);

app.get("/health", (_, res) => res.json({ status: "Crux server running" }));

export default app;
