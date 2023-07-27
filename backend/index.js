require("dotenv").config();
const compileCode = require("./routes/codecompile/compile");
const express = require("express");
const cors = require("cors"); //Cross-Origin Resource Sharing
const app = express();
app.use(cors()); // Allow requests from all origins need to changed later on
app.use("/compilecode", compileCode);
app.listen(process.env.port, () => {
  console.log("Listening ...");
});
app.get("/", (req, res) => {
  res.status(200).send("Root!");
});
