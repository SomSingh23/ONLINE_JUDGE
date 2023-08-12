import React, { useState } from "react";
import axios from "axios";
import "./OnlineCompiler.css";

const OnlineCompiler = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("c");
  const [code, setCode] = useState("");

  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
  };

  const handleCodeChange = (event) => {
    setCode(event.target.value);
  };

  const handleCompile = async () => {
    let data = {
      lang: "py",
      code: "print('hello world')",
    };
    try {
      const response = await axios.post(
        `http://localhost:5000/compilecode`,
        data,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      console.log("Error while registering user", error.message);
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
          value={code}
          onChange={handleCodeChange}
          placeholder={`Write your ${selectedLanguage} code here...`}
        />
      </div>
      <button className="compile-button" onClick={handleCompile}>
        Compile
      </button>
    </div>
  );
};

export default OnlineCompiler;
