import mongoose from "mongoose";

const playerSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  nickname: { type: String, required: true },
  avatar: { type: String, required: true, maxlength: 2 },
  position: { type: String, required: true },
  team: { type: String },
  stats: {
    goals: { type: Number, default: 0 },
    assists: { type: Number, default: 0 },
    played: { type: Number, default: 0 },
    wins: { type: Number, default: 0 },
    losses: { type: Number, default: 0 },
  },
});

export default mongoose.model("Player", playerSchema);
