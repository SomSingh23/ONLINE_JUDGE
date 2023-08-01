const child_process = require("child_process");
const { v4 } = require("uuid");
const uuid = v4;
const handleError = async (x) => {
  await child_process.exec(`rm ${x}.exe`);
  console.log("handle error called");
  return true;
};

const runCpp = async (codePath, inputPath) => {
  let constExe = uuid();
  const compileAndRunCommand = `g++ ${codePath} -o ${constExe} && ${constExe} <${inputPath} && rm ${constExe}.exe`;

  return new Promise((resolve, reject) => {
    let timeOutId = setTimeout(() => {
      console.log("Checking for INF loops or File handing -> Cpp");
      reject("Inf loop OR File handing OR Too many requests");
      handleError(constExe);
    }, 8000);
    child_process.exec(compileAndRunCommand, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error.message}`);
        handleError(constExe);
        clearTimeout(timeOutId);
        reject(error.message);
      }
      if (stderr) {
        console.error(`stderr: ${stderr}`);
        handleError(constExe);
        clearTimeout(timeOutId);
        reject(stderr);
      }
      resolve(stdout, clearTimeout(timeOutId));
    });
  });
};

module.exports = runCpp;
