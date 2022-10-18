const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const { readdirSync } = require("fs");
const { log } = require("console");
const app = express();
app.use(express.json());
app.use(cors());
//routes

readdirSync("./routes").map((r) => app.use("/", require("./routes/" + r)));
//database
mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("database connected succesfully");
  })
  .catch((err) => {
    console.log("connection error", err);
  });
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server is listening.... on ${PORT}`);
});
