import mongoose from "mongoose";

async function connectToDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_CONN_STR, {
      dbName: "haxstats",
    });
    console.log("Conectado a la base de datos");
  } catch (error) {
    console.error("Error conectando a la base de datos:", error);
    process.exit(1);
  }
}

export default connectToDatabase;
