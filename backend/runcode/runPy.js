const child_process = require("child_process");
const runPy = async (filePath, inputPath) => {
  const runPython = `python ${filePath}<${inputPath}`;
  return new Promise((resolve, reject) => {
    child_process.exec(runPython, (error, stdout, stderr) => {
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
// runPython("test.py").then((p) => console.log(p));
module.exports = runPy;
