import express from "express";
import { getAllPersonagens, getById, creatPersonagem, deletePersonagem, updatePersonagem } from "../controllers/personagemController.js";

const router = express.Router();

router.get("/", getAllPersonagens);
router.get("/:id", getById);
router.post("/", creatPersonagem);
router.delete("/:id", deletePersonagem);
router.put("/:id", updatePersonagem)

export default router;