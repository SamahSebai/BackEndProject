const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const express = require("express");
const app = express();
const cors = require("cors");
const config = require("./config/config");
const mongoose = require("mongoose");
const {swaggersch, student} = require('./models/swaggerSchema')
const schedule = require('node-schedule');
const services = require('./services/services')
app.use(express.json()); //or use body-parser middleware to parse the JSON
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: "Analytics Project",
    version: "1.0.0",
    description: "Analytics API swagger documentation",
  },
  components: {
    schemas: student,
    securitySchemes: {
        bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
        }
    }
  },
  security: [{
      bearerAuth: []
  }]
};
const options = {
  swaggerDefinition,
  apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJsDoc(options);

// Connect to DB
const db = config.DB_HOST;
mongoose.connect(
  db,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  function (err) {
    if (err) {
      console.error("Error! " + err);
    } else {
      console.log("Connected to mongodb");
    }
  }
);

// Import Routes
// const testRoute = require('./routes/test');

// const eventRoute = require('./routes/event');
// const internshipRoute = require('./routes/internship')

const studentRoute = require("./routes/student");
// const pfaRoute = require("./routes/pfa");
const userRoute = require("./routes/user");
const statisticsRoute = require("./routes/statistics");
// const pfeRoute = require("./routes/pfe");
// const offerRoute = require("./routes/offer");
// const demandeRoute = require("./routes/demande");

// Route Middlewares
// app.use("/test", testRoute);

app.use("/student", studentRoute);
// app.use("/teacher", teacherRoute);
// app.use("/pfa", pfaRoute);
// app.use("/offer", offerRoute);
// app.use("/demande", demandeRoute);
// app.use('/event', eventRoute);
// app.use('/test', testRoute);
// app.use('/internship', internshipRoute);
app.use('/statistics', statisticsRoute);

// app.use("/pfe", pfeRoute);


const generalRoute=require("./routes/route");
app.use('/',generalRoute);
app.use("/user", userRoute);

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
  })
);

const port = 3000;
app.use("/doc", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

app.listen(port, function () {
  console.log("Servers running on localhost:" + port);
  schedule.scheduleJob('*/400 * * * * *', services.sendEmails);
});