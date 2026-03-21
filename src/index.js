import dotenv from "dotenv"
dotenv.config()

import express from "express"
import cors from "cors"
import { conectDb } from "./config/mongodb.js"
import { authRouter } from "./routes/authRouter.js"
import { movieRouter } from "./routes/movieRouter.js"
import { authMiddleware } from "./middleware/authMiddleware.js"

const serverHttp = express()

serverHttp.use(cors())
serverHttp.use(express.json())

serverHttp.use("/api/movies", authMiddleware, movieRouter)
serverHttp.use("/api/auth", authRouter)

serverHttp.use((req, res) => {
  res.status(404).json({ success: false, error: "Ruta no válida o inexistente" })
})

const PORT = process.env.PORT || 3000

const startServer = async () => {
  try {
    await conectDb()

    serverHttp.listen(PORT, () => {
      console.log(`✅ Servidor corriendo en puerto ${PORT}`)
    })

  } catch (error) {
    console.error("❌ Error al iniciar el servidor:", error)
  }
}

startServer()