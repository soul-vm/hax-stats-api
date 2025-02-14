import bcrypt from "bcryptjs";

import Player from "../models/player.js";

const register = async (req, res) => {
  try {
    const { email, password, country, nickname, avatar } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const player = new Player({
      email,
      password: hashedPassword,
      country,
      nickname,
      avatar,
    });
    await player.save();
    res.status(201).json(player);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const player = await Player.findOne({ email: req.body.email });
    if (!player)
      return res.status(404).json({ message: "Usuario no encontrado" });

    const isMatch = await bcrypt.compare(req.body.password, player.password);
    if (!isMatch)
      return res.status(401).json({ message: "Credenciales incorrectas" });

    res.status(200).json(player._id);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default { register, login };
