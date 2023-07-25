const child_process = require("child_process");
const handleError = async () => {
  await child_process.exec("rm test.exe");
  console.log("handle error called");
  return true;
};

const runCpp = async (codePath, inputPath) => {
  const compileAndRunCommand = `g++ ${codePath} -o test && test <${inputPath} && rm test`;

  return new Promise((resolve, reject) => {
    let timeOutId = setTimeout(() => {
      console.log("Checking for INF loops or File handing");
      reject("");
      handleError();
    }, 4000);
    child_process.exec(compileAndRunCommand, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error.message}`);
        handleError();
        clearTimeout(timeOutId);
        reject(error.message);
      }
      if (stderr) {
        console.error(`stderr: ${stderr}`);
        handleError();
        clearTimeout(timeOutId);
        reject(stderr);
      }
      resolve(stdout, clearTimeout(timeOutId));
    });
  });
};

module.exports = runCpp;
