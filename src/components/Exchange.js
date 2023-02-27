import React, { useState, useEffect, useRef } from "react";
import "./exchange.css";
function Exchange() {
  const apiUrl = "https://api.coingecko.com/api/v3/exchange_rates";

  const [cryptoOption, setCryptoOption] = useState([]);

  const inputValue = useRef(0);
  const inputCryptoOption = useRef("Bitcoin");
  const outputCryptoOption = useRef("Bitcoin");
  const [outputValue, setOutputValue] = useState(0);

  useEffect(() => {
    fetchInfo();
    console.log(cryptoOption);
  }, []);

  async function fetchInfo() {
    try {
      const response = await fetch(apiUrl);
      const jsonData = await response.json();
      setCryptoOption(jsonData.rates);
      console.log(cryptoOption);
    } catch (e) {
      console.log("error occured");
      console.log(e);
    }
  }

  function updateInputValue(event) {
    inputValue.current = event.target.value;
  }
  function calculateOutput() {
    let pairs = {};
    Object.keys(cryptoOption).forEach((key, index) => {
      pairs[cryptoOption[key]["name"]] = key;
    });

    var inp = pairs[inputCryptoOption.current];
    var out = pairs[outputCryptoOption.current];
    let val =
      (cryptoOption[out]["value"] / cryptoOption[inp]["value"]) *
      parseFloat(inputValue.current);
    setOutputValue(val);
  }
  function setInput(event) {
    inputCryptoOption.current = event.target.value;
    // console.log(inputCryptoOption.current)
  }
  function setOutput(event) {
    outputCryptoOption.current = event.target.value;
    // console.log(inputCryptoOption.current)
  }

  return (
    <div className="main">
      <h2 className="heading">Currency Exchange</h2>
      <div className="body">
        <div className="inputValue">
          <input placeholder="Enter amount" ref={inputValue} type="number" onChange={updateInputValue} />
        </div>
        <div className="coins">
          <select onChange={setInput} name="selectInput" id="inputCoinName">
            {Object.keys(cryptoOption).map((key, index) => (
              <option key={index}>{cryptoOption[key]["name"]}</option>
            ))}
          </select>
          <select onChange={setOutput} name="selectoutput" id="outputCoinName">
            {Object.keys(cryptoOption).map((key, index) => (
              <option key={index}>{cryptoOption[key]["name"]}</option>
            ))}
          </select>
        </div>
        <div className="convertButton">
          <button onClick={calculateOutput}>Convert</button>
          
        </div>
        <div className="outputValue">
          <input  placeholder="value" value={outputValue} type="text" />
        </div>
      </div>
    </div>
  );
}

export default Exchange;
