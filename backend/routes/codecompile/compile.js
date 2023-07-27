const express = require("express");
const router = express.Router();
const { v4: uuid } = require("uuid");
const createAndWriteFile = require("../../runcode/createAndWriteFile");
const runCpp = require("../../runcode/runCpp");
const runPy = require("../../runcode/runPy");
const runC = require("../../runcode/runC");
router.use(express.urlencoded({ extended: true })); // for urlencoded format
router.use(express.json()); // handling default axios post request which send data in json format
router.post("/", async (req, res) => {
  try {
    const { lang, code, username, input } = req.body;
    const c = `${username}-${uuid()}.${lang}`;
    const i = `${username}-${uuid()}.txt`;
    const o = `${username}-${uuid()}.txt`;
    const codeFile = "backend/runcode/user_input_code/" + c;
    const inputFile = "backend/runcode/user_input_test_case/" + i;
    const outputFile = "backend/runcode/user_output/" + o;
    await createAndWriteFile(codeFile, code);
    await createAndWriteFile(inputFile, input);
    let output;
    if (lang === "cpp") output = await runCpp(codeFile, inputFile);
    else if (lang === "py") output = await runPy(codeFile, inputFile);
    else if (lang === "c") output = await runC(codeFile, inputFile);
    await createAndWriteFile(outputFile, output);

    res.status(200).send(output);
  } catch (err) {
    res.status(400).send(err);
    console.log("error respond send");
  }
});

// testing

// createAndWriteFile();
// createAndWriteFile(
//   "backend/runcode/user_input_code",
//   "test.cpp",
//   "somsinghlodhi"
// );
module.exports = router;
