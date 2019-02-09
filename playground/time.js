const moment = require('moment');

var c = new Date().getTime();
var s = moment().valueOf();
console.log(s);

var e = 1234
var date = moment(e);
console.log(date.format('MMM Do, YYYY h:mm a'));