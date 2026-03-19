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
  res.status(404).json({ success: false, error: "Ruta no válida o inexistente<" })
})

const PORT = process.env.PORT

serverHttp.listen(PORT, () => {
  console.log(`✅ Servidor http en escucha para el puerto http://127.0.0.1:${PORT}`)

  conectDb()
})
