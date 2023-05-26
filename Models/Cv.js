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
          required: true,
        },
        description: {
          type: String,
          required: true,
        },
        technologies: {
          type: String,
          required: true,
        },
        nom_societe: {
          type: String,
          required: true,
        },
        type_exp: {
          type: String,
          required: true,
          enum: ["PFE", "PFA","STAGE D'ETE","Vie Associative"],
        },
        emplacement: {
          type: String,
          required: true,
        },
        dateDebut: {
          type: Date,
          required: true,
        },
        dateFin: {
          type: Date,
          required: true,
        },
      },
    ],
    Education: [
      {
        titre_univ: {
          type: String,
          required: true,
        },
        titre_diplome: {
          type: String,
          required: true,
        },
        mention: {
          type: String,
          required: true,
          enum: ["Très bien", "Bien","Assez bien","Passable"],
        },
        description: {
          type: String,
          required: true,
        },
        dateDebut: {
          type: Date,
          required: true,
        },
        dateFin: {
          type: Date,
          required: true,
        },
      },
    ],
    certifications: [
      {
        titre_certif: {
          type: String,
          required: true,
        },
        source_certif: {
          type: String,
          required: true,
        },
        description: {
          type: String,
          required: true,
        },
        emplacement: {
          type: String,
          required: true,
        },
        dateDebut: {
          type: Date,
          required: true,
        },
        dateFin: {
          type: Date,
          required: true,
        },
      },
    ],
    languages: [
      {
        lang: {
          type: String,
          required: true,
        },
        level: {
          type: String,
          required: true,
        },
      },
    ],
    hard_skills: [
      {
        type: String,
        required: true,
      },
    ],
    soft_skills: [
      {
        type: String,
        required: true,
      },
    ],
    hobbys: [
      {
        type: String,
        required: true,
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.models.Cv || mongoose.model("Cv", CvSchema);
