import { AES, enc } from 'crypto-js';

export function encryptToAES(text: string): string { 
    const storedKey = process.env.AES_KEY as string;
    const textValue = enc.Utf8.parse(text);
    const keyValue = enc.Base64.parse(storedKey);

    return  AES.encrypt(textValue, keyValue).toString();
    
}