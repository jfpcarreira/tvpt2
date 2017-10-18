// Local varables
const emailRegex  = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
const userRegex   = new RegExp(/^[a-zA-Z0-9]+$/);
const passRegex   = new RegExp(/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d])(?=.*?[\W]).{8,25}$/);
const phoneRegex  = new RegExp(/^[\+1]{0,2}?\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/);

// Name size should be at least 5
let minSizeName = (name) => {
    return (name && name.length > 4);
};

// Email size should be at least 6 
let minSizeEmail = (email) => {
    return (email && email.length > 5);
};

// Email should be a valid email
let validEmail = (email) => {
    return (email && emailRegex.test(email));
};

// Username size should be between 5 - 20
let minSizeUsername = (username) => {
    return (username && ( username.length > 4 ));
};

// Username must not have any special characters
let validUsername = (username) => {
    return (username && userRegex.test(username));
};

// Password size should be between 8 - 25
let passwordLengthChecker = (password) => {
    return (password && (password.length > 7 && password.length < 26));
};

// Validates the password complexity
let validPassword = (password) => {
    return (password && passRegex.test(password));
};

// Email should be a valid email
let validPhone = (phone) => {
    return (phone && phoneRegex.test(phone));
};

module.exports = {
    nameValidator: [
        {
            validator: minSizeName,
            message: "Name must be at least 5 characters"
        }
    ],
    emailValidator: [
        {
            validator: minSizeEmail,
            message: "E-mail must be at least 6 characters"
        },
        {
            validator: validEmail,
            message: "E-Mail format incorrect"
        }
    ],
    usernameValidator: [
        {
            validator: minSizeUsername,
            message: "Username must be at least 5 characters and no more than 20"
        },
        {
            validator: validUsername,
            message: "Username is not valid"
        }
    ],
    passwordValidator: [
        {
            validator: passwordLengthChecker,
            message: 'Password must be at least 8 characters but no more than 25'
        },
        {
            validator: validPassword,
            message: 'Must have at least one uppercase, lowercase, number and special character'
        }
    ],
    phoneValidator: [
        {
            validator: validPhone,
            message: 'Phone number is not valid'
        }
    ]
};
