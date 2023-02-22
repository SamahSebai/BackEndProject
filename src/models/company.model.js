const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const companySchema = new Schema({
    
    company_name:{
        type: Number,
        required: true,
      },
      company_count: {
        type: Number,
        default:1
      }
    
});

module.exports = mongoose.model("company", companySchema, "companys");
