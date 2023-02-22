const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const countrySchema = new Schema({
    country_name:{
        type: Number,
        required: true,
      },
      student_count: {
        type: Number,
        default:1
      }
  
});

module.exports = mongoose.model("country", countrySchema, "countrys");
