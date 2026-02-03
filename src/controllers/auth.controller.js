import dotenv from "dotenv"
dotenv.config()

import { User } from "../models/user.model.js"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET
const JWT_EXPIRES = process.env.JWT_EXPIRES
const register = async (req, res) => {
  try {
    const data = req.body
    const { email, password, username } = data

    if (!username) {
      return res.status(400).json({
        success: false,
        error: "El username es obligatorio."
      })
    }

    if (!email) {
      return res.status(400).json({ success: false, error: "No se pudo crear el usuario. El email es obligatorio." })
    } else if (!password) {
      return res.status(400).json({
        success: false, error: "No se pudo crear el usuario. La contraseña es obligatoria."
      })
    } else if (
      !email.includes("@") ||
      (!email.endsWith(".com") && !email.endsWith(".net"))
    ) {
      return res.status(400).json({
        success: false,
        error: "El email no es válido."
      })
    }
    else if (password.length < 4) {
      return res.status(400).json({
        success: false, error: "La contraseña debe tener al menos 4 caracteres."
      })
    }

    const hash = await bcryptjs.hash(password, 10)
    const newDataUser = {
      email: email,
      password: hash,
      username
    }

    const newUser = await User.create(newDataUser)


    const payload = {
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email
    }

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES })

    res.status(201).json({
      success: true,
      data: token
    })

  } catch (error) {

    if (error.code === 11000) {

      return res.status(400).json({ success: false, error: "❌ El email ya existe" })
    }

    res.status(500).json({ success: false, error: error.message })
  }
}

const login = async (req, res) => {
  try {
    const body = req.body
    const { email, password } = body

    if (!email || !password) {
      return res.status(400).json({ success: false, error: "Datos inválidos, ingrese los datos requeridos." })
    }
    const foundUser = await User.findOne({ email })
    if (!foundUser) {
      return res.status(404).json({ success: false, error: "Desautorizado" })
    }

    const validatePassword = await bcryptjs.compare(password, foundUser.password)

    if (!validatePassword) {
      return res.status(401).json({ success: false, error: "Desautorizado" })
    }

    const payload = { _id: foundUser._id, username: foundUser.username, email: foundUser.email }
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES })

    res.json({ success: true, data: token })

  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
}
export { register, login } 