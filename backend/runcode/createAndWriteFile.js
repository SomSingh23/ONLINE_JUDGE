const { error } = require("console");
const fs = require("fs");
let createAndWriteFile = async (name, content) => {
  try {
    await fs.mkdirSync("/runcode/user_input_code", { recursive: true });
    await fs.mkdirSync("/runcode/user_input_test_case", {
      recursive: true,
    });
    await fs.mkdirSync("/runcode/user_output", { recursive: true });
    await fs.writeFileSync(name, content);
    console.log("sucessfully created file and written");
  } catch (e) {
    console.log(e.message);
    throw new Error("Error while creating file");
  }
  //   console.log("working");
};
module.exports = createAndWriteFile;
