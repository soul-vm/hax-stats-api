import Player from "../models/player.js";

const getPlayers = async (req, res) => {
  try {
    const players = await Player.find();
    res.status(200).json(players);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getPlayer = async (req, res) => {
  try {
    const player = await Player.findById(req.params.id);
    res.status(200).json(player);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const createPlayer = async (req, res) => {
  try {
    const player = new Player(req.body);
    await player.save();
    res.status(201).json(player);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

const updatePlayer = async (req, res) => {
  try {
    const player = await Player.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!player) {
      res.status(404).json({ message: "Jugador no encontrado" });
    } else {
      res.status(200).json(player);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deletePlayer = async (req, res) => {
  try {
    await Player.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Player deleted successfully" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export default {
  getPlayers,
  getPlayer,
  createPlayer,
  updatePlayer,
  deletePlayer,
};
