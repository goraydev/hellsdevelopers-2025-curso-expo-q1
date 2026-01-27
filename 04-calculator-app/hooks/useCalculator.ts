import { useEffect, useRef, useState } from "react";

enum Operator {
  add = "+",
  substract = "-",
  multiply = "x",
  divide = "/",
}

export const useCalculator = () => {
  const [formula, setFormula] = useState("0");
  const [number, setNumber] = useState("0");
  const [prevNumber, setPrevNumber] = useState("0");
  const lastOperation = useRef<Operator | undefined>(undefined);

  useEffect(() => {
    if (lastOperation.current) {
      const firstFormulaPart = formula.split(" ").at(0);
      setFormula(`${firstFormulaPart} ${lastOperation.current} ${number}`);
    } else {
      setFormula(number);
    }
    console.log(lastOperation.current);
  }, [number]);

  useEffect(() => {
    //caluclar subresultado
    const subesult = calculateSubResult();
    setPrevNumber(subesult.toString());
  }, [formula]);

  const setLastNumber = () => {
    calculateResult();
    if (number.endsWith(".")) {
      setPrevNumber(number.slice(0, -1));
    }

    setPrevNumber(number);
    setNumber("0");
  };

  const divideOperation = () => {
    setLastNumber();
    lastOperation.current = Operator.divide;
  };

  const multiplyOperation = () => {
    setLastNumber();
    lastOperation.current = Operator.multiply;
  };

  const substractOperation = () => {
    setLastNumber();
    lastOperation.current = Operator.substract;
  };

  const addOperation = () => {
    setLastNumber();
    lastOperation.current = Operator.add;
  };

  const calculateSubResult = () => {
    const [firstValue, operator, secondValue] = formula.split(" ");

    const num1 = Number(firstValue);
    const num2 = Number(secondValue);

    if (isNaN(num2)) return num1;

    switch (operator) {
      case Operator.add:
        return num1 + num2;
      case Operator.substract:
        return num1 - num2;
      case Operator.multiply:
        return num1 * num2;
      case Operator.divide:
        return num1 / num2;
      default:
        throw new Error("Operator not found");
    }
  };

  const calculateResult = () => {
    const results = calculateSubResult();

    setFormula(results.toString());
    lastOperation.current = undefined;
    setPrevNumber("0");
  };

  const buildNumber = (numberString: string) => {
    if (number.includes(".") && numberString === ".") return;

    if (number.startsWith("0") || number.startsWith("-0")) {
      if (numberString === ".") {
        return setNumber(number + numberString);
      }

      //evaluar si es otro 0 y no hay punto
      if (numberString === "0" && number.includes(".")) {
        return setNumber(number + numberString);
      }

      //evaluar si es diferente de 0 y no hay punto y es el primer numero
      if (numberString !== "0" && !number.includes(".")) {
        return setNumber(numberString);
      }

      //Evitar el 00000.000
      if (numberString === "0" && !number.includes(".")) {
        return setNumber(numberString);
      }
    }

    if (number.length === 0 && numberString === ".") {
      return setNumber("0" + numberString);
    }

    setNumber(number + numberString);
  };

  const clearButton = () => {
    setPrevNumber("0");
    setFormula("");
    setNumber("");
    lastOperation.current = undefined;
  };

  const toogleSign = () => {
    if (number.startsWith("-")) {
      setNumber(number.slice(1));
    } else {
      setNumber("-" + number);
    }
  };

  const delButton = () => {
    if (number.length === 0) {
      return;
    }
    setNumber(number.slice(0, -1));
  };

  return {
    formula,
    number,
    prevNumber,

    buildNumber,
    clearButton,
    delButton,
    toogleSign,
    divideOperation,
    multiplyOperation,
    substractOperation,
    addOperation,
    calculateSubResult,
    calculateResult,
  };
};
