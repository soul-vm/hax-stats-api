import Player from "../models/player.js";

const getStats = async (req, res) => {
  try {
    const topGoals = await Player.find()
      .sort({ "stats.goals": -1 })
      .limit(10)
      .select("country nickname avatar stats.goals");

    const topAssists = await Player.find()
      .sort({ "stats.assists": -1 })
      .limit(10)
      .select("country nickname avatar stats.assists");

    const topWins = await Player.find()
      .sort({ "stats.wins": -1 })
      .limit(10)
      .select("country nickname avatar stats.wins");

    const topLosses = await Player.find()
      .sort({ "stats.losses": -1 })
      .limit(10)
      .select("country nickname avatar stats.losses");

    const topPlayed = await Player.aggregate([
      {
        $addFields: {
          totalPlayed: { $add: ["$stats.wins", "$stats.losses"] },
        },
      },
      {
        $sort: { totalPlayed: -1 },
      },
      {
        $limit: 10,
      },
      {
        $project: {
          country: 1,
          nickname: 1,
          avatar: 1,
          totalPlayed: 1,
        },
      },
    ]);

    const topMvp = await Player.find()
      .sort({ "stats.mvp": -1 })
      .limit(10)
      .select("country nickname avatar stats.mvp");

    const topShutouts = await Player.find()
      .sort({ "stats.shutouts": -1 })
      .limit(10)
      .select("country nickname avatar stats.shutouts");

    const topOwnGoals = await Player.find()
      .sort({ "stats.ownGoals": -1 })
      .limit(10)
      .select("country nickname avatar stats.ownGoals");

    const transformData = (data) => {
      return data.map((item) => {
        const obj = item.toObject();
        const { stats, ...rest } = obj;
        return { ...rest, ...stats };
      });
    };

    res.json({
      topGoals: transformData(topGoals),
      topAssists: transformData(topAssists),
      topWins: transformData(topWins),
      topLosses: transformData(topLosses),
      topPlayed: topPlayed.map((item) => ({ ...item })),
      topMvp: transformData(topMvp),
      topShutouts: transformData(topShutouts),
      topOwnGoals: transformData(topOwnGoals),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updatePlayerStat = async (req, res) => {
  try {
    const player = await Player.findByIdAndUpdate(
      req.params.id,
      { $inc: { [`stats.${req.params.stat}`]: 1 } }, // Incremento dinámico
      { new: true }
    );

    if (!player) {
      return res.status(404).json({ message: "Jugador no encontrado" });
    }

    res.status(200).json({ message: "Estadística actualizada" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default {
  getStats,
  updatePlayerStat,
};
