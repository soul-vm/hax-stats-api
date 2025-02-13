import express from "express";
import playerController from "../controllers/playerController.js";

const router = express.Router();

router.get("/", playerController.getPlayers);
router.get("/:id", playerController.getPlayer);
router.post("/", playerController.createPlayer);
router.put("/:id", playerController.updatePlayer);
router.delete("/:id", playerController.deletePlayer);

// Sumar goles y asistencias
router.patch("/:id/goals", playerController.updatePlayerGoals);
router.patch("/:id/assists", playerController.updatePlayerAssists);

// Sumar victorias y derrotas
router.patch("/:id/wins", playerController.updatePlayerWins);
router.patch("/:id/losses", playerController.updatePlayerLosses);

export default router;
