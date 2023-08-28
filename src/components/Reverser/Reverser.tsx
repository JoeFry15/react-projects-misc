import { useState } from "react";
import "./Reverser.css";
import { palindromeChecker, stringReverser } from "../../clients/reverser";

export function Reverser() {
  const [inputValue, setInputValue] = useState("");
  const [sentence, setSentence] = useState("");
  const [charCount, setCharCount] = useState(0);
  const [palindromeCheck, setPalindromeCheck] = useState(false);
  const [validationError, setValidationError] = useState("");
  const [inputHistory, setInputHistory] = useState<string[]>([]);

  const handleSubmit = (event: any) => {
    event.preventDefault();

    if (/[^a-zA-Z\s]/.test(inputValue)) {
      setValidationError("Input should include only letters and spaces.");
    } else {
      setValidationError("");
      setSentence(stringReverser(inputValue));
      setPalindromeCheck(palindromeChecker(inputValue));
      setInputHistory((prevInputHistory) => [...prevInputHistory, inputValue]);
    }
  };

  const handleChange = (event: any) => {
    setInputValue(event.target.value);
    setCharCount(event.target.value.length);
  };

  return (
    <>
      <h1>String Reverser</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Enter your sentence:
          <input type="text" value={inputValue} onChange={handleChange} />
        </label>
        <input type="submit" />
      </form>
      {validationError && <p className="error">{validationError}</p>}
      <p className="char-count">Character count: {charCount}</p>
      <p>Reversed sentence: {sentence}</p>
      <p>
        Is the submitted sentence a palindrome:{" "}
        {palindromeCheck ? "Yes!" : "No"}
      </p>
      <h2>History:</h2>
      {inputHistory.map((l, i) => (
        <p key={i}>{l}</p>
      ))}
    </>
  );
}
