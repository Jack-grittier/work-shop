export const removeTrailingZeroDecimal = (number) => {
    let num = typeof number == `string` ? parseFloat(number) : number;
    const wholeNumber = Math.trunc(num);
    const decimalPart = num - wholeNumber;
    if (decimalPart === 0) {
      return wholeNumber;
    } else {
      return num.toFixed(1);
    }
}