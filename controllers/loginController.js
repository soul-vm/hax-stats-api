import Player from "../models/player.js";

const login = async (req, res) => {
  try {
    const player = await Player.findOne({
      email: req.body.email,
      password: req.body.password,
    });
    if (!player) {
      res.status(404).json({ message: "Player not found" });
    } else {
      res.status(200).json(player._id);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default { login };
