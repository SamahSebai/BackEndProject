const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const statisticPfeSchema = new Schema({
  pfe_name:{
    type: Number,
    required: true,
  },
  pfe_count: {
    type: Number,
    default:1
  }
});

module.exports = mongoose.model("statisticPfe", statisticPfeSchema, "statisticPfes");
