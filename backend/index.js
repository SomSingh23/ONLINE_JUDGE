require("dotenv").config();
const compileCode = require("./routes/codecompile/compile");
const express = require("express");
const app = express();
app.use("/compilecode", compileCode);
app.listen(process.env.port, () => {
  console.log("Listening ...");
});
app.get("/", (req, res) => {
  res.send("Root!");
});
