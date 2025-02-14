import bcrypt from "bcryptjs";

import Player from "../models/player.js";

const register = async (req, res) => {
  try {
    const { email, password, country, nickname, avatar } = req.body;

    const playerExist = await Player.findOne({ email });
    if (playerExist)
      return res
        .status(409)
        .json({ message: "Ya existe un jugador registrado con ese email" });

    const hashedPassword = await bcrypt.hash(password, 4);
    const player = new Player({
      email,
      password: hashedPassword,
      country,
      nickname,
      avatar,
    });
    await player.save();
    res.status(201).json({
      message: "Jugador registrado correctamente",
      playerId: player._id,
      token: "acáVaElTokenJwt",
    });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const player = await Player.findOne({ email: req.body.email });
    if (!player)
      return res.status(404).json({
        message: "No se encontró un jugador registrado con ese email",
      });

    const isMatch = await bcrypt.compare(req.body.password, player.password);
    if (!isMatch)
      return res.status(401).json({ message: "Credenciales incorrectas" });

    res.status(200).json({
      message: "Login exitoso",
      playerId: player._id,
      token: "acáVaElTokenJwt",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default { register, login };
