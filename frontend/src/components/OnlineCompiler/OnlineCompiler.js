import React, { useState } from "react";
import axios from "axios";
import "./OnlineCompiler.css";

const OnlineCompiler = () => {
  const [selectedLanguage, setSelectedLanguage] = useState(``);
  const [_code, setCode] = useState(``);
  const [input, setInput] = useState(``);
  const [output, setOutput] = useState(``);
  const [compileing, setCompiling] = useState(false);

  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
  };

  const handleCodeChange = (event) => {
    setCode(event.target.value);
  };

  const handleInput = (event) => {
    setInput(event.target.value);
  };

  const handleCompile = async () => {
    console.log("Handle Compile Request");
    console.log(selectedLanguage);
    console.log(_code);
    let data = {
      lang: selectedLanguage,
      code: _code,
      input: input,
      username: "somlatestreact",
    };
    try {
      setCompiling(true);
      const response = await axios.post(
        `http://localhost:5000/compilecode`,
        data
      );
      console.log(response.data);
      setOutput(response.data);
      setCompiling(false);
    } catch (error) {
      setOutput(error.message);
      console.log("Error while compiling code", error.message);
      setCompiling(false);
    }
  };

  return (
    <div className="compiler-container">
      <h1>Online Compiler</h1>
      <div className="language-select">
        <label htmlFor="language">Select Language:</label>
        <select
          id="language"
          value={selectedLanguage}
          onChange={handleLanguageChange}
        >
          <option value="c">C</option>
          <option value="cpp">C++</option>
          <option value="py">Python</option>
        </select>
      </div>
      <div className="code-editor">
        <label htmlFor="code">Enter Your Code:</label>
        <textarea
          id="code"
          value={_code}
          onChange={handleCodeChange}
          placeholder={`Write your ${selectedLanguage} code here...`}
        />
      </div>
      <div className="custom-input">
        <label htmlFor="input">Custom Input:</label>
        <textarea
          id="input"
          value={input}
          onChange={handleInput}
          placeholder="Enter custom input here..."
        />
      </div>
      <button className="compile-button" onClick={handleCompile}>
        Compile
      </button>
      <div className="output">
        <label>Output:</label>
        <textarea
          id="output"
          value={compileing ? "compiling..." : output}
          readOnly
          placeholder="Output will be displayed here..."
        />
      </div>
    </div>
  );
};

export default OnlineCompiler;
