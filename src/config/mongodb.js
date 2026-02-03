import dotenv from "dotenv";
dotenv.config(); 

import { connect } from "mongoose";

const URI_DB = process.env.URI_DB;

const conectDb = async () => {
  try {
    await connect(URI_DB);
    console.log("✅ Conectado con éxito a MongoDB");
  } catch (error) {
    console.log("❌ No se pudo conectar con la base de datos", error);
  }
};

export { conectDb };
