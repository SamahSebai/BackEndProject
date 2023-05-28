const mongoose = require("mongoose");
const { Schema } = mongoose;
mongoose.Promise = global.Promise;

const PFASchema = new Schema(
  {
    Titre: { type: String, required: [true, "titre obligatoire!"] },
    Description: { type: String, required: [true, "description obligatoire!"] },
    Technologie: { type: String, required: [true, "technologie obligatoire!"] },
    Disponibilite: { type: Boolean, default: true },
    statue: {
      type: String,
      default: false,
      enum: ["accepted", "refused", "pending"],
    },
    etudiantId: { type: String },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Account",
    },
    students: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Account",
      },
    ],

    studentNumber: {
      type: Number,
      required: [true, "studentNumber obligatoire!"],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.models.PFA || mongoose.model("PFA", PFASchema);
