import CryptoJS from "crypto-js";
const secretKey = process.env.ENCRYPTION_KEY!;

export function Decrypt(
  encryptedText: string,
  key: string = "VGVzdERhdGEgS2V5",
  iv: string = "YourInitializationVector"
) {
  //   // Use the complete key without truncation
  //   const keyBytes = CryptoJS.enc.Base64.parse(key);

  //   // Replace with the actual IV used for encryption
  //   const ivBytes = CryptoJS.enc.Hex.parse(iv); // Assuming hex encoded IV (adjust based on actual format)

  //   const encryptedBytes = CryptoJS.enc.Base64.parse(encryptedText);

  //   const decrypted = CryptoJS.DES.decrypt(encryptedBytes.toString(), keyBytes, {
  //     iv: ivBytes,
  //   });

  //   return decrypted.toString();
  //
  return encryptedText;
}
