import mongoose from "mongoose";

const playerSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  country: { type: String, required: true, maxlength: 2 },
  nickname: { type: String, required: true },
  avatar: { type: String, required: true, maxlength: 2 },
  stats: {
    goals: { type: Number, default: 0 },
    assists: { type: Number, default: 0 },
    wins: { type: Number, default: 0 },
    losses: { type: Number, default: 0 },
    mvp: { type: Number, default: 0 },
    shutouts: { type: Number, default: 0 },
    ownGoals: { type: Number, default: 0 },
  },
});

export default mongoose.model("Player", playerSchema);
