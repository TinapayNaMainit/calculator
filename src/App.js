import './index.css';
import React, { useState, useEffect } from 'react';

function Key({ label, clickHandler }) {
  return (
    <button onClick={() => clickHandler(label)} className="key">
      {label}
    </button>
  );
}

function Display({ value }) {
  return (
    <div className="display">
      {value}
    </div>
  );
}

function App() {
  const [displayValue, setDisplayValue] = useState('0');
  const [firstOperand, setFirstOperand] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false);
  const [error, setError] = useState(false); 
  const clickHandler = (label) => {
    if (error) return; 

    if (!isNaN(label)) {
      handleNumber(label);
    } else if (label === 'C') {
      clear();
    } else if (label === '=') {
      calculate();
    } else if (label === '.') {
      handleDecimal();
    } else if (label === 'Lumawig') { 
      displayFullName();
    } else {
      handleOperator(label);
    }
  };

  const handleNumber = (num) => {
    if (waitingForSecondOperand) {
      setDisplayValue(String(num));
      setWaitingForSecondOperand(false);
    } else {
      setDisplayValue(displayValue === '0' ? String(num) : displayValue + num);
    }
  };

  const handleDecimal = () => {
    if (!displayValue.includes('.')) {
      setDisplayValue(displayValue + '.');
    }
  };

  const handleOperator = (nextOperator) => {
    const inputValue = parseFloat(displayValue);

    if (firstOperand == null) {
      setFirstOperand(inputValue);
    } else if (operator) {
      const result = performCalculation[operator](firstOperand, inputValue);
      if (result === "Error") {
        setError(true);
        setDisplayValue("Error");
        return;
      }
      setDisplayValue(String(result));
      setFirstOperand(result);
    }

    setWaitingForSecondOperand(true);
    setOperator(nextOperator);
  };

  const performCalculation = {
    '+': (first, second) => first + second,
    '-': (first, second) => first - second,
    'x': (first, second) => first * second,
    '÷': (first, second) => second === 0 ? "Error" : first / second,
  };

  const calculate = () => {
    if (operator && firstOperand != null) {
      const secondOperand = parseFloat(displayValue);
      const result = performCalculation[operator](firstOperand, secondOperand);

      if (result === "Error") {
        setError(true);
        setDisplayValue("Error");
      } else {
        setDisplayValue(String(result));
        setFirstOperand(null);
        setOperator(null);
        setWaitingForSecondOperand(false);
      }
    }
  };

  const clear = () => {
    setDisplayValue('0');
    setFirstOperand(null);
    setOperator(null);
    setWaitingForSecondOperand(false);
    setError(false); 
  };

  const displayFullName = () => {
    setDisplayValue('Cedric James G. Lumawig'); 
  };

  const handleKeyPress = (event) => {
    const { key } = event;
    if (!isNaN(key)) {
      clickHandler(Number(key));
    } else if (key === 'Enter' || key === '=') {
      clickHandler('=');
    } else if (key === 'Escape') {
      clickHandler('C');
    } else if (key === '/' || key === '÷') {
      clickHandler('÷');
    } else if (key === '*') {
      clickHandler('x');
    } else if (key === '-') {
      clickHandler('-');
    } else if (key === '+') {
      clickHandler('+');
    } else if (key === '.') {
      clickHandler('.');
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [displayValue, firstOperand, operator, waitingForSecondOperand]);

  return (
    <div className="App">
      <h1>Calculator of Cedric James G. Lumawig - IT3A</h1> {}
      <div className="Calc">
        <div className="Disp">
          <Display value={displayValue} />
        </div>

        <div className="Buttons">
          <Key label={7} clickHandler={clickHandler} />
          <Key label={8} clickHandler={clickHandler} />
          <Key label={9} clickHandler={clickHandler} />
          <Key label={"÷"} clickHandler={clickHandler} />
          <Key label={4} clickHandler={clickHandler} />
          <Key label={5} clickHandler={clickHandler} />
          <Key label={6} clickHandler={clickHandler} />
          <Key label={"x"} clickHandler={clickHandler} />
          <Key label={1} clickHandler={clickHandler} />
          <Key label={2} clickHandler={clickHandler} />
          <Key label={3} clickHandler={clickHandler} />
          <Key label={"-"} clickHandler={clickHandler} />
          <Key label={"C"} clickHandler={clickHandler} />
          <Key label={0} clickHandler={clickHandler} />
          <Key label={"+"} clickHandler={clickHandler} />
          <Key label={"."} clickHandler={clickHandler} />
          <Key label={"="} clickHandler={clickHandler} />
          <Key label={"Lumawig"} clickHandler={clickHandler} /> {}
        </div>
      </div>
    </div>
  );
}

export default App;
