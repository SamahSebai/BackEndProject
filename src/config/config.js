require('dotenv').config();
module.exports = {
    DB_HOST: process.env.DB_HOST,
    TOKEN_SECRET:process.env.TOKEN_SECRET,
    EMAIL:process.env.EMAIL,
    EMAIL_PASS:process.env.EMAIL_PASS
};