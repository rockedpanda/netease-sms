var fetch = require('node-fetch');
var crypto = require('crypto');
var qs = require('querystring');

/** 计算字符串的sha1 */
function sha1(str) {
    let hash = crypto.createHash('sha1');
    hash.update(str);
    return hash.digest('hex');
}
 
/** 创建随机数,长度<128 */
function createNonce(){
    return Math.floor(Math.random() * 0xFFFFFF) + '';
}

/**
 * 发送短信,返回响应体JSON对象
 * @content   Object  具体数据,格式为:{templateId: '模板id', mobiles: ['手机号1','手机号2'], params: ['短信内容参数1','短信内容参数2']}
 * @AppKey    String  平台appkey,从网易云信后台可查询到,未传递时从系统环境变量 SMSAPPKEY获取
 * @AppSecret String  平台appsecret,从网易云信后台可查询到,未传递时从系统环境变量 SMSAPPSECRET获取
 * @return    Promise 返回Promise对象,成功时得到云信平台返回的json体,其他情况下抛出问题原因
 */
function send(content, AppKey, AppSecret){   
    let CurTime = Date.now() / 1000 >> 0 + ""; //当前时间秒数
    var Nonce = createNonce();
    AppKey = AppKey || process.env.SMSAPPKEY;
    AppSecret = AppSecret || process.env.SMSAPPSECRET;
    if(!AppKey || !AppSecret){
        console.log('未传入appkey或appsecret');
        return Promise.reject('no appkey or appsecret');
    }
    if (!content.mobiles || !content.templateid){//params可以为空,表示不需要参数
        console.log('内容参数不完整,请检查mobiles,templateid,params是否已传入')
    }
    var CheckSum = sha1(AppSecret + Nonce + CurTime);

    var options = {
        method: 'POST',
        headers: {
            'AppKey'        : AppKey,
            'Nonce'         : Nonce,
            'CurTime'       : CurTime,
            'CheckSum'      : CheckSum,
            "Content-Type"  : "application/x-www-form-urlencoded",
            "charset"       : "utf-8"
        },
        body: qs.stringify({
            templateid: content.templateid,
            mobiles: JSON.stringify(content.mobiles),
            params: JSON.stringify(content.params||[])
        })
    };
    console.log(JSON.stringify(options));
    return fetch('https://api.netease.im/sms/sendtemplate.action', options).then(function(res){
        return res.json();
    });
}

exports.send = send;
exports.sha1 = sha1;
exports.createNonce = createNonce;