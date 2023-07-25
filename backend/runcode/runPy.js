const child_process = require("child_process");
const runPy = async (filePath, inputPath) => {
  const runPython = `python ${filePath}<${inputPath}`;
  return new Promise((resolve, reject) => {
    let timeOutId = setTimeout(() => {
      console.log("Checking for INF loops or File handing -> python");
      reject("");
    }, 4000);
    child_process.exec(runPython, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error.message}`);
        clearTimeout(timeOutId);
        reject(error.message);
      }
      if (stderr) {
        console.error(`stderr: ${stderr}`);
        clearTimeout(timeOutId);
        reject(stderr);
      }
      resolve(stdout, clearTimeout(timeOutId));
    });
  });
};
// runPython("test.py").then((p) => console.log(p));
module.exports = runPy;
