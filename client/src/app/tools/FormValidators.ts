import { FormGroup } from '@angular/forms';

const regex_email         = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
const regex_username      = new RegExp(/^[a-zA-Z0-9]+$/);
const regex_password      = new RegExp(/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d])(?=.*?[\W]).{8,35}$/);
const regex_decimal       = new RegExp(/^\d+(\.\d{1,2})?$/);
const regex_phone         = new RegExp(/^[\+1]{0,2}?\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/);
const regex_date_DDMMYYYY = new RegExp(/^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/);

// Function to validate the selected currency
export function validateCombocSelected(controls) {
  if (controls.value && controls.value != "") {
    return null; // Return as valid username
  } else {
    return { 'validateComboSelected': true } // Return as invalid username
  }
}

// Funciton to ensure passwords match
export function matchingPasswords(password, confirm) {
  return (group: FormGroup) => {
    if (group.controls[password].value === group.controls[confirm].value) {
      return null; // Return as a match
    } else {
      return { 'matchingPasswords': true } // Return as error: do not match
    }
  }
}

// Function to validate decimal number
export function validateDecimalNumber(controls) {
  return genericRegexValidator(regex_decimal, controls.value, 'validateDecimalNumber');
}

// Function to validate e-mail is proper format
export function validateEmail(controls) {
  return genericRegexValidator(regex_email, controls.value, 'validateEmail');
}

// Function to validate username is proper format
export function validateUsername(controls) {
  return genericRegexValidator(regex_username, controls.value, 'validateUsername');
}

// Function to validate password is proper format
export function validatePassword(controls) {
  return genericRegexValidator(regex_password, controls.value, 'validatePassword');
}

// Function to validate password is proper format
export function validatePhone(controls) {
  return genericRegexValidator(regex_phone, controls.value, 'validatePhone');
}

// Function to validate date is proper format (DD/MM/YYYY)
export function validateDate(controls) {
  return genericRegexValidator(regex_date_DDMMYYYY, controls.value, 'validateDate');
}

// ##################################### PRIVATE #####################################

function genericRegexValidator(regex: RegExp, value: string, errorName: string) {
  // Return as valid
  if (regex.test(value)) {
    return null;
  }
  // Return as invalid
  else {
    var jsonData = {};
    jsonData[errorName] = true;
    return jsonData;
  }
}
