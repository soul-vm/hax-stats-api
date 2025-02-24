import "dotenv/config";
import express from "express";
import cors from "cors";
import connectToDatabase from "./config/database.js";
import playerRoutes from "./routes/playerRoutes.js";
import statsRoutes from "./routes/statsRoutes.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/auth", authRoutes);
app.use("/players", playerRoutes);
app.use("/stats", statsRoutes);

connectToDatabase();

try {
  const PORT = process.env.SERVER_PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Servidor iniciado en el puerto ${PORT}`);
  });
} catch (error) {
  console.log(error);
}
