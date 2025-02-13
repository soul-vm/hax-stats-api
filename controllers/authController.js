import Player from "../models/player.js";

const register = async (req, res) => {
  try {
    const player = new Player(req.body);
    await player.save();
    res.status(201).json(player);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const player = await Player.findOne({
      email: req.body.email,
      password: req.body.password,
    });
    if (!player) {
      res.status(404).json({ message: "Usuario no encontrado" });
    } else {
      res.status(200).json(player._id);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default { register, login };
