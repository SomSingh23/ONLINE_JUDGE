const { error } = require("console");
const fs = require("fs");
let createAndWriteFile = async (name, content) => {
  try {
    await fs.mkdirSync("backend/runcode/user_input_code", { recursive: true });
    await fs.mkdirSync("backend/runcode/user_input_test_case", {
      recursive: true,
    });
    await fs.mkdirSync("backend/runcode/user_output", { recursive: true });
    await fs.writeFileSync(name, content);
    console.log("sucessfully created file and written");
  } catch (e) {
    console.log(e.message);
    console.log("error");
  }
  //   console.log("working");
};
module.exports = createAndWriteFile;
