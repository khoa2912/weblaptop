const displayDateHourFormat = 'DD-MM-YYYY HH:mm';
const displayDateTimeFormat = 'DD-MM-YYYY HH:mm:ss';
const displayDateFormat = 'DD-MM-YYYY';
const displayMonthFormat = 'MM-YYYY';
const displayYearFormat = 'YYYY-MM-DD';
const displayTimeHourFormat = 'HH:mm:ss';
const displayTimeMinuteFormat = 'HH:mm';
const displayCurrencyFormat = /(\d)(?=(\d{3})+(?!\d))/g;

module.exports = {
    displayDateFormat,
    displayMonthFormat,
    displayYearFormat,
    displayTimeMinuteFormat,
    displayTimeHourFormat,
    displayDateHourFormat,
    displayDateTimeFormat,
    displayCurrencyFormat
};