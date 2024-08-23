// 公共方法
import {Base64} from '@/uni_modules/js-base64/base64.js';
import JSEncrypt from './jsencrypt.js';
import {APPConfig} from "@/config/config.js"

//加密 
export function rsaEncode(params) {
    let rsa_params_status = false;
    if (APPConfig.RSA === true) {
        rsa_params_status = true;
        let rsa_params = JSON.stringify(params); //转json
        rsa_params = Base64.encode(rsa_params); //64base
        rsa_params = rsa_params.match(/.{1,50}/g); //分片
        let publicKey = APPConfig.publicKey;  //拿密钥
        let encryptor = new JSEncrypt(); //实例化
        encryptor.setPublicKey(publicKey);
        params = [];
        rsa_params.forEach((item) => {
            params.push(encryptor.encrypt(item));
        });
    }
    return {params: params, rsa: rsa_params_status};
}
// 解密
export function rsaDecode(data) {
    let decrypt = new JSEncrypt();
    let priKey = APPConfig.priKey;
    decrypt.setPrivateKey(priKey);
    let json_str = "";
	console.log('data',data);
    data.params.forEach((item) => {
        json_str += decrypt.decrypt(item);
    });
    json_str = Base64.decode(json_str);
    return JSON.parse(json_str);
}