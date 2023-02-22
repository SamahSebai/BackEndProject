const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const offerSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
    enum: ["job", "opportunity", "advice"],
  },
  posted_at: {
    type: Date,
    default: new Date(),
  },
  description: {
    type: String,
    required: true,
  },
  student_id:{
    type: Schema.Types.ObjectId,
    ref: 'student'
  },
});

module.exports = mongoose.model("offer", offerSchema, "offers");
