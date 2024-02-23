import { useCallback, useEffect, useRef, useState } from "react";

import "./App.css";
import Navbar from "./components/Navbar";

function App() {
  const [length, SetLength] = useState(6);
  const [isNumber, SetIsNumber] = useState(false);
  const [isChar, SetIsChar] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  const generatePassword = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (isNumber) str += "0123456789";
    if (isChar) str += "!@#$%^&*()_-+={}[]|<>?";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, isChar, isNumber, setPassword]);

  const copiedToClipboard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
window.alert("Copied to clipboard!")
  }, [password]);

  useEffect(() => {
    generatePassword();
    
  }, [length, isNumber, isChar, generatePassword]);

  return (
    <>
      <Navbar />
      <div className="w-full max-w-md mx-auto shadow-lg rounded-lg px-4 py-5 my-24 bg-slate-200 text-black text-lg">
        Your Personalized Password
        <div className="flex shadow-md rounded-lg mb-3 my-3 border-slate-950 outline-2">
          <input
            className="w-full px-2 py-3"
            type="text"
            value={password}
            placeholder="password"
            ref={passwordRef}
          />
          <button
            className="outline-none bg-amber-700 px-4 py-2 shrink-0"
            onClick={copiedToClipboard}
          >
            Copy
          </button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1 text-orange-700">
            <input
              className="cursor-pointer"
              type="range"
              value={length}
              min={5}
              max={50}
              onChange={(e) => {
                SetLength(e.target.value);
              }}
            />
            <label>length: {length}</label>
          </div>
          <div className="flex items-center text-sm gap-x-1 text-orange-700">
            <input
            className="cursor-pointer"
              type="checkbox"
              defaultChecked={isNumber}
              onChange={() => {
                SetIsNumber((prev) => !prev);
              }}
            />
            <label htmlFor="numbers">Number</label>
          </div>

          <div className="flex items-center text-sm gap-x-1 text-orange-700 ">
            <input
            className="cursor-pointer"
              type="checkbox"
              defaultChecked={isNumber}
              onChange={() => {
                SetIsChar((prev) => !prev);
              }}
            />
            <label htmlFor="numbers">characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
