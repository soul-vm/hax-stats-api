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

    const topPlayed = await Player.find()
      .sort({ "stats.played": -1 })
      .limit(10)
      .select("country nickname avatar stats.played");

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
      topPlayed: transformData(topPlayed),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default { getStats };
