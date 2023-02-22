const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const statisticSchema = new Schema({
  promotion:{
    year:{
        type: Number,
        required: true,
      },
      promotion_count: {
        type: Number,
        default:0
      },
  },
  country:{
    country_name:{
        type: Number,
        required: true,
      },
      student_count: {
        type: Number,
        default:0
      },
  },
  company:{
    company_name:{
        type: Number,
        required: true,
      },
      company_count: {
        type: Number,
        default:0
      },
  },
  pfe:{
    pfe_name:{
        type: Number,
        required: true,
      },
      pfe_count: {
        type: Number,
        default:0
      },
  }
  
});

module.exports = mongoose.model("statistic", statisticSchema, "statistics");
