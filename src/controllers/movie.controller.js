import { Movie } from "../models/movies.model.js"

const getMovies = async (req, res) => {

  try {
    const movies = await Movie.find({ user: req.user._id }).sort({ _id: -1 })

    if (movies.length === 0) {
      return res.json({
        success: true,
        data: [],
        message: "🤷‍♂️ Todavía no agregaste ninguna película"
      })
    }

    res.json({ success: true, data: movies })
  } catch (error) {

    res.status(500).json({
      success: false, error: error.message

    })
  }
}

const createMovie = async (req, res) => {

  try {
    const body = req.body
    const { name,
      year,
      category,
      description,
    } = body

    if (!name) {
      return res.status(400).json({ success: false, error: "Data invalida, vuelve intentarlo." })
    }

    const createdMovie = await Movie.create({
      name,
      year,
      category,
      description,
      user: req.user._id
    })

    res.status(201).json({ success: true, message: "✅ Película creada con éxito", data: createdMovie })

  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }

}


const updateMovie = async (req, res) => {
  try {
    const id = req.params.id
    const updates = req.body

    const movie = await Movie.findById(id)
    if (!movie) {
      return res.status(404).json({ success: false, error: "⚠ No existe la película que querés actualizar." })
    }

    if (movie.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, error: "No autorizado para actualizar esta película" })
    }

    const updatedMovie = await Movie.findByIdAndUpdate(id, updates, { new: true })

    res.json({ success: true, message: "✅ Película actualizada con éxito", data: updatedMovie })

  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(400).json({ success: false, error: "ID incorrecto, ingresa un valor válido " })
    }
    res.status(500).json({ success: false, error: error.message })
  }
}


const deleteMovie = async (req, res) => {
  try {
    const id = req.params.id


    const movie = await Movie.findById(id)
    if (!movie) {
      return res.status(404).json({ success: false, error: "⚠ No existe la película que quieres eliminar." })
    }

    if (movie.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, error: "No autorizado para eliminar esta película" })
    }


    const deletedMovie = await Movie.findByIdAndDelete(id)
    res.status(201).json({ success: true, message: "✅ Película eliminada con éxito", data: deletedMovie })

  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(400).json({ success: false, error: "ID incorrecto, ingresa un valor válido " })
    }
    res.status(500).json({ success: false, error: error.message })
  }
}

export {
  getMovies,
  createMovie,
  updateMovie,
  deleteMovie
}
