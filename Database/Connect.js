const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
mongoose
  .connect(
    "mongodb+srv://reactisamm2023:reactisamm@clusterreact.woxc9mp.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,

      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("connected to database"))
  .catch((err) => console.log(err));
