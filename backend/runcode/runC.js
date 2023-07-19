const child_process = require("child_process");
const runC = async (codePath, inputPath) => {
  const compileAndRunCommand = `gcc ${codePath} -o test && test <${inputPath} && rm test`;
  return new Promise((resolve, reject) => {
    child_process.exec(compileAndRunCommand, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error.message}`);
        reject(error.message);
      }
      if (stderr) {
        console.error(`stderr: ${stderr}`);
        reject(stderr);
      }
      resolve(stdout);
    });
  });
};

module.exports = runC;
