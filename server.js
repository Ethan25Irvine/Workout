const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");

const PORT = process.env.PORT || 3000

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));
app.use(logger("dev"));


mongoose.connect(process.env.MONGODB_URI || "mongodb://user:password1@ds133086.mlab.com:33086/heroku_sj9nlsck", {
  useNewUrlParser: true,
  useFindAndModify: false
});

require("./public/routes/api-routes")(app);
require("./public/routes/html-routes")(app);

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
