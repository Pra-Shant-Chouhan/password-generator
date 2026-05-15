import { useEffect, useRef, useState } from "react";

/**
 * Move constants outside component
 * Prevents recreation on every render
 */
const LETTERS =
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

const NUMBERS = "0123456789";

const SPECIAL_CHARS =
  "!@#$%^&*()_+~`|}{[]:;?><,./-=";

function App() {

  /**
   * Better default value
   */
  const [length, setLength] = useState(8);
  const [copied, setCopied] = useState(false);

  /**
   * Generated password state
   */
  const [password, setPassword] = useState("");
  const passwordRef = useRef<HTMLInputElement | null>(null);

  /**
   * Toggle states
   */
  const [numAllowed, setNumAllowed] = useState(false);

  const [specialCharAllowed, setSpecialCharAllowed] =
    useState(false);

  /**
   * Password generator function
   */
  const generatePassword = () => {

    let allowedChars = LETTERS;

    if (numAllowed) {
      allowedChars += NUMBERS;
    }

    if (specialCharAllowed) {
      allowedChars += SPECIAL_CHARS;
    }

    let generatedPassword = "";

    for (let i = 0; i < length; i++) {

      const randomIndex = Math.floor(
        Math.random() * allowedChars.length
      );

      generatedPassword += allowedChars[randomIndex];
    }

    setPassword(generatedPassword);
  };

  /**
   * Auto-generate password
   * whenever dependencies change
   */
  useEffect(() => {
    generatePassword();
  }, [length, numAllowed, specialCharAllowed]);

  /**
   * Copy password
   */
  //   useEffect(() => {
  //     if(password) {
  //       navigator.clipboard.writeText(password);
  //       passwordRef.current?.select();
  //     } 
  // }, [password]);
  const copyPassword = async () => {
    await navigator.clipboard.writeText(password);
    setCopied((prev) => !prev);
    // select input text
    // passwordRef.current?.select();
    // // if(copied) 

    // focus input
    passwordRef.current?.select();
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (

    <div className="flex justify-center mt-24 bg-gray-900 rounded-2xl max-w-2xl mx-auto p-4 text-gray-50 shadow-2xl">

      <div className="w-full space-y-4">

        <h1 className="text-2xl font-bold">
          Password Generator
        </h1>

        {/* Password Field */}
        <div className="flex gap-4 items-end">

          <input
            type="text"
            value={password}
            ref={passwordRef}
            readOnly
            className="w-full p-2 rounded-lg bg-gray-800"
          />

          <button
            onClick={copyPassword}
            className="p-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition"
          >
            {copied ? "Copied!" : "Copy"}
          </button>

        </div>

        {/* Controls */}
        <div className="flex flex-wrap gap-4 justify-between">

          {/* Length */}
          <div className="flex items-center px-4 py-2 bg-gray-800 rounded-lg">

            <label htmlFor="length">
              Length - {length}
            </label>

            <input
              id="length"
              type="range"
              min={4}
              max={32}
              value={length}
              onChange={(e) =>
                setLength(Number(e.target.value))
              }
              className="ml-4"
            />
          </div>

          {/* Numbers */}
          <div className="flex items-center px-4 py-2 bg-gray-800 rounded-lg">

            <label htmlFor="numAllowed">
              Include Numbers - {numAllowed ? "Yes" : "No"}
            </label>

            <input
              id="numAllowed"
              type="checkbox"
              checked={numAllowed}
              onChange={(e) =>
                setNumAllowed(e.target.checked)
              }
              className="ml-4"
            />
          </div>

          {/* Special Characters */}
          <div className="flex items-center px-4 py-2 bg-gray-800 rounded-lg">

            <label htmlFor="specialCharAllowed">
              Include Special Characters -
              {specialCharAllowed ? " Yes" : " No"}
            </label>

            <input
              id="specialCharAllowed"
              type="checkbox"
              checked={specialCharAllowed}
              onChange={(e) =>
                setSpecialCharAllowed(e.target.checked)
              }
              className="ml-4"
            />
          </div>

        </div>
      </div>
    </div>
  );
}

export default App;