const mongoose = require("mongoose");
const { Schema } = mongoose;
mongoose.Promise = global.Promise;

const CvSchema = new Schema(
  {
    firstName: { type: String, required: [true, "Prénom obligatoire!"] },
    lastName: { type: String, required: [true, "Nom de famille obligatoire!"] },
    email: { type: String, required: [true, "E-mail obligatoire!"] },
    address: { type: String, required: [true, "Adresse obligatoire!"] },
    Specialite: { type: String },
    stages: { type: String, required: [true, "stages obligatoire!"] },
    formations: { type: String, required: [true, "formations obligatoire!"] },
    compétences: {
      type: String,
      required: [true, " compétences obligatoire!"],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.models.Cv || mongoose.model("Cv", CvSchema);
