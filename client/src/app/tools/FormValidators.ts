// Function to validate the selected currency
export function validateCombocSelected(controls) {
  if (controls.value && controls.value != "") {
    return null; // Return as valid username
  } else {
    return { 'validateCurrency': true } // Return as invalid username
  }
}

// Function to validate decimal number
export function validateDecimalNumber(controls) {
  const regExp = new RegExp(/^\d+(\.\d{1,2})?$/);

  if (regExp.test(controls.value)) {
    return null; // Return as valid decimal number
  } else {
    return { 'validateDecimalNumber': true } // Return as invalid number
  }
}
