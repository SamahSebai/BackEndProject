const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const demandeSchema = new Schema({
  student_id:{
    type: Schema.Types.ObjectId,
    ref: 'student'
  },
  title: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
    enum: ["vacation", "expert"],
  },
  starting_date: {
    type: Date,
    default: new Date(),
  },
  ending_date: {
    type: Date,
    default: new Date(),
  },
  area_of_expertise: [
    {
      type: String,
    },
  ],
});

module.exports = mongoose.model("demande", demandeSchema, "demandes");
