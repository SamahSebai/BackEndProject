const mongoose = require("mongoose");
const { Schema } = mongoose;
mongoose.Promise = global.Promise;

const CvSchema = new Schema(
  {
    compte: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Account",
    },
    description: {
      type: String,
    },
    linkedInUrl: {
      type: String,
    },
    githubUrl: {
      type: String,
    },
    type_cv: {
      type: Number,
      default: 1,
    },
    experiences: [
      {
        titre: {
          type: String,
        },
        description: {
          type: String,
        },
        technologies: {
          type: String,
        },
        nom_societe: {
          type: String,
        },
        type_exp: {
          type: String,
          enum: ["PFE", "PFA", "STAGE D'ETE", "Vie professionnelle"],
        },
        emplacement: {
          type: String,
        },
        dateDebut: {
          type: Date,
        },
        dateFin: {
          type: Date,
        },
      },
    ],
    Education: [
      {
        titre_univ: {
          type: String,
        },
        titre_diplome: {
          type: String,
        },
        mention: {
          type: String,
          enum: ["Très bien", "Bien", "Assez bien", "Passable"],
        },
        description: {
          type: String,
        },
        dateDebut: {
          type: Date,
        },
        dateFin: {
          type: Date,
        },
      },
    ],
    certifications: [
      {
        titre_certif: {
          type: String,
        },
        source_certif: {
          type: String,
        },
        description: {
          type: String,
        },
        emplacement: {
          type: String,
        },
        dateDebut: {
          type: Date,
        },
        dateFin: {
          type: Date,
        },
      },
    ],
    languages: [
      {
        lang: {
          type: String,
        },
        level: {
          type: String,
        },
      },
    ],
    hard_skills: [
      {
        type: String,
      },
    ],
    soft_skills: [
      {
        type: String,
      },
    ],
    hobbys: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.models.Cv || mongoose.model("Cv", CvSchema);
