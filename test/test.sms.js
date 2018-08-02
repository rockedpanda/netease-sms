var sms = require('../index.js');
var appkey = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxx';
var appsecret = 'xxxxxxx';
sms.send({ templateid: '1111111', mobiles: ['12345678901'], params: ['xx12sa中问文助理xls'] }, appkey, appsecret).then(function (d) {
    console.log('------------------data------------------');
    console.log(d);
}).catch(function (err) {
    console.log('------------------err------------------');
    console.log(err);
});