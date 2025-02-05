import "dotenv/config";
import express from "express";
import connectToDatabase from "./config/database.js";
import playerRoutes from "./routes/playerRoutes.js";

const app = express();

app.use(express.json());
app.use("/players", playerRoutes);

connectToDatabase();

try {
  const PORT = process.env.SERVER_PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Servidor iniciado en el puerto ${PORT}`);
  });
} catch (error) {
  console.log(error);
}
