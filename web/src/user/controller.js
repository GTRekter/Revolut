const moment = require('moment');

function isValidUsername(username) {
    return /^[a-zA-Z]+$/.test(username);
}

function isValidDateOfBirth(dateOfBirth) {
    if (!dateOfBirth) {
        return false;
    }
    const today = moment().startOf('day');
    return moment(dateOfBirth, 'YYYY-MM-DD').isValid() && moment(dateOfBirth, 'YYYY-MM-DD').isBefore(today);
}

function getBirthdayMessage(username, dateOfBirth) {
    const momentDateOfBirth = moment(dateOfBirth, 'YYYY-MM-DD');
    const today = moment().startOf('day');
    const age = today.diff(momentDateOfBirth, 'years');
    if (momentDateOfBirth.isSame(today, 'day')) {
        return `Hello, ${username}! Happy birthday!`
    } else {
        return `Hello, ${username}! Your birthday is in ${today.diff(momentDateOfBirth, 'days')} days. You will be ${age + 1} years old.`
    }
}

module.exports = {
    isValidUsername,
    isValidDateOfBirth,
    getBirthdayMessage
};