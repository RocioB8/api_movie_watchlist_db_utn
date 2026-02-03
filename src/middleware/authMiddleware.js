import jwt from "jsonwebtoken"

const authMiddleware = (req, res, next) => {
  const header = req.headers.authorization

  if (!header) {
    return res.status(401).json({ success: false, error: "El token es requerido" })
  }

  if (!header.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, error: "El token debe tener formato Bearer" })
  }

  const token = header.split(" ")[1]

  try {
    const verifyToken = jwt.verify(token, process.env.JWT_SECRET)
    req.user = verifyToken 
    next()
  } catch (error) {
    res.status(401).json({ success: false, error: "Token inválido o expirado" })
  }
}

export { authMiddleware }
