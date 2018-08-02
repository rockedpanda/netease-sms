# 用于网易云信短信发送的NodeJS模块

## 用途

使用网易云信短信平台发送短信

## 使用方法

```Javascript
//具体实例请参考test/test.sms.js
var sms = require('netease-sms');
sms.send({ templateid: '1111111', mobiles: ['12345678901'], params: ['xx12sa中问文助理xls'] }, appkey, appsecret).then(function(d){
    console.log('------------------data------------------');
    console.log(d);
}).catch(function(err){
    console.log('------------------err------------------');
    console.log(err);
});
```

## API

```Javascript
/**
 * 发送短信,返回响应体JSON对象
 * @content   Object  具体数据,格式为:{templateId: '模板id', mobiles: ['手机号1','手机号2'], params: ['短信内容参数1','短信内容参数2']}
 * @AppKey    String  平台appkey,从网易云信后台可查询到,未传递时从系统环境变量 SMSAPPKEY获取
 * @AppSecret String  平台appsecret,从网易云信后台可查询到,未传递时从系统环境变量 SMSAPPSECRET获取
 * @return    Promise 返回Promise对象,成功时得到云信平台返回的json体,其他情况下抛出问题原因
 */
function send(content, AppKey, AppSecret){}
```
