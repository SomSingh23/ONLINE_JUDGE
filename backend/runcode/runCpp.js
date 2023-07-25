const child_process = require("child_process");

const handleError = async () => {
  try {
    await child_process.exec("rm test");
    console.log("handle error called");
    return true;
  } catch (error) {
    console.error(`Error in handleError: ${error.message}`);
    return false;
  }
};

const runCpp = async (codePath, inputPath) => {
  const compileAndRunCommand = `g++ ${codePath} -o test && test < ${inputPath} && rm test`;

  return new Promise((resolve, reject) => {
    let timeOutId = setTimeout(() => {
      console.log("Checking for INF loops or File handling -> C++");
      handleError()
        .then(() => reject(""))
        .catch((err) => reject(err));
    }, 4000);

    child_process.exec(compileAndRunCommand, (error, stdout, stderr) => {
      clearTimeout(timeOutId);
      if (error) {
        console.error(`Error: ${error.message}`);
        handleError().then(() => reject(error.message));
      } else if (stderr) {
        console.error(`stderr: ${stderr}`);
        handleError().then(() => reject(stderr));
      } else {
        resolve(stdout);
      }
    });
  });
};

module.exports = runCpp;
