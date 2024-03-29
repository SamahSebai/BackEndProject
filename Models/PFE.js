const mongoose = require("mongoose");
const { Schema } = mongoose;
mongoose.Promise = global.Promise;

const PFESchema = new Schema(
  {
    Specialite: { type: String, required: [true, "specialite obligatoire!"] },
    Societe: { type: String, required: [true, "societe obligatoire!"] },
    Titre: { type: String, required: [true, "titre obligatoire!"] },
    Sujet: { type: String, required: [true, "sujet obligatoire!"] },
    Technologie: { type: String, required: [true, "technologie obligatoire!"] },
    Pays: { type: String, enum: ["Tunisie", "Ailleurs"] },
    Encadrant: {
      type: Schema.Types.ObjectId,
      ref: "Account",
    },
    Etudiant: {
      type: Schema.Types.ObjectId,
      ref: "Account",
    },
    DateDebut: {
      type: String,
    },
    DateFin: {
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.models.PFE || mongoose.model("PFE", PFESchema);
