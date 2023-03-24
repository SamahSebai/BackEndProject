const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
mongoose.connect("mongodb+srv://samehsebai0104:aY23QVpW1WgXiyPh@cluster0.dfvbix0.mongodb.net/?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    
    useUnifiedTopology: true,
  })
  .then(() => console.log("connected to database"))
  .catch((err) => console.log(err));