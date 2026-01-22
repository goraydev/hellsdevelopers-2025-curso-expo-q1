export default function Operations(firstNumber: string, secondNumber: string) {
  const handlePlus = () => {
    return Number(firstNumber) + Number(secondNumber);
  };

  const handleRest = () => {
    return Number(firstNumber) - Number(secondNumber);
  };

  const handleMultiply = () => {
    return Number(firstNumber) * Number(secondNumber);
  };

  const handleDivide = () => {
    if (Number(secondNumber) === 0) {
      return "Error: No se puede dividir entre cero";
    }
    return (Number(firstNumber) / Number(secondNumber)).toFixed(2);
  };

  return {
    handlePlus,
    handleRest,
    handleMultiply,
    handleDivide,
  };
}
