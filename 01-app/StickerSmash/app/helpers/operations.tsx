export default function Operations(
  firstNumber: string,
  secondNumber: string,
  result: number | string,
  setResult?: (result: number | string) => void,
) {
  const handlePlus = () => {
    setResult?.(Number(firstNumber) + Number(secondNumber));
  };

  const handleRest = () => {
    setResult?.(Number(firstNumber) - Number(secondNumber));
  };

  const handleMultiply = () => {
    setResult?.(Number(firstNumber) * Number(secondNumber));
  };

  const handleDivide = () => {
    if (Number(secondNumber) === 0) {
      setResult?.("Error: No se puede dividir entre cero");
      return;
    }
    setResult?.(Number(firstNumber) / Number(secondNumber));
  };

  return {
    handlePlus,
    handleRest,
    handleMultiply,
    handleDivide,
  };
}
