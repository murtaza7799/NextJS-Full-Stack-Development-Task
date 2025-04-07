import { AES, enc } from 'crypto-js';

export function encryptToAES(text: string, key: string): any { 
    const storedKey = process.env.AES_KEY;
    const textValue = enc.Utf8.parse(text);
    const keyValue = enc.Base64.parse(key);

    var encrypted = AES.encrypt(textValue, keyValue);
    return encrypted.toString();
}