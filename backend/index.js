require("dotenv").config();
const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const cors = require("cors");

//Security headers
const helmet = require("helmet");

app.use(helmet.contentSecurityPolicy({directives: {/* ... */},reportOnly: true,}));
app.use(helmet.crossOriginEmbedderPolicy());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(helmet.expectCt({maxAge: 63072000,}));
app.use(helmet.dnsPrefetchControl());
app.use(helmet.frameguard({ action: "SAMEORIGIN" }));
app.use(helmet.hsts({maxAge: 63072000,includeSubDomains: true,}));
app.use(helmet.ieNoOpen());
app.use(helmet.noSniff());
app.use(helmet.originAgentCluster());
app.use(helmet.permittedCrossDomainPolicies({permittedPolicies: "by-content-type",}));
app.use(helmet.referrerPolicy({ policy: "no-referrer", }));
app.use(helmet.xssFilter());


/*=================================
        Database
===================================*/
const mongoose = require("mongoose");
mongoose
  .connect("mongodb+srv://" + process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connection Successfull");
  })
  .catch((err) => {
    console.log(err);
  });
app.use(cors())
app.use('/', require('./routes/auth.js'))
app.use('/user', require('./routes/users.js'))
app.use('/movie', require('./routes/movies.js'))
app.use('/list', require('./routes/lists'))

/*============================
       listen process.env.PORT ||
=============================*/

app.listen(process.env.PORT || 8080);
