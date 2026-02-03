import mongoose from "mongoose";

const MovieSchema = new mongoose.Schema({

  name: { type: String, required: true },

  year: { type: Number, default: 0 },

  description: { type: String, default: "Sin descripción" },

  category: { type: String, default: "Sin categoría" },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }

}, {

  versionKey: false
})


const Movie = mongoose.model("Movie", MovieSchema)


export { Movie }