const mongoose = require("mongoose");
const { Schema } = mongoose;
mongoose.Promise = global.Promise;

const AccountSchema = new Schema(
  {
    firstName: { type: String, required: [true, "Prénom obligatoire!"] },
    lastName: { type: String, required: [true, "Nom de famille obligatoire!"] },
    email: { type: String, required: [true, "E-mail obligatoire!"] },
    password: { type: String, required: [true, "Mot de passe obligatoire!"] },
    passwordHashed: { type: String, required: true },
    address: { type: String },
    pays: { type: String },
    société: { type: String },
    promotion: { type: String },
    Specialite: { type: String },
    niveau: { type: String },
    datedeNaissance: { type: String },
    categorie: { type: String },
    classe: { type: String },
    visibilite: { type: Boolean, default: false },
    etat: { type: Boolean, default: null },
    role: {
      type: String,
      enum: ["ADMIN", "Etudiant", "Enseignant", "ALumni"],
      default: "ADMIN",
    },
    saisonUV: {
      type: Schema.Types.ObjectId,
      ref: "Saison",
    },
    diplome: {
      type: Boolean,
      default: false,
    },
    dateDiplome:{type : Date},
    dateEmbouche:{type : Date},

  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports =
  mongoose.models.Account || mongoose.model("Account", AccountSchema);
