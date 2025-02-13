import express from "express";
import playerController from "../controllers/playerController.js";

const router = express.Router();

router.get("/", playerController.getPlayers);
router.get("/:id", playerController.getPlayer);
router.put("/:id", playerController.updatePlayer);
router.delete("/:id", playerController.deletePlayer);

export default router;
