import { AES } from 'crypto-js';

export function encryptToAES(text: string): string { 
    const storedKey = process.env.AES_KEY as string;

    return  AES.encrypt(text, storedKey).toString();
    
}