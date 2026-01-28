// ===== CRYPTO.JS - Encrypt data form =====

// Simple XOR encrypt
const encryptData = (data, key = 'momentum2025') => {
  let encrypted = '';
  for (let i = 0; i < data.length; i++) {
    encrypted += String.fromCharCode(data.charCodeAt(i) ^ key.charCodeAt(i % key.length));
  }
  return btoa(encrypted); // Base64 encode
};

const decryptData = (encryptedData, key = 'momentum2025') => {
  const decoded = atob(encryptedData); // Base64 decode
  let decrypted = '';
  for (let i = 0; i < decoded.length; i++) {
    decrypted += String.fromCharCode(decoded.charCodeAt(i) ^ key.charCodeAt(i % key.length));
  }
  return decrypted;
};

// Encrypt data form before sending
const encryptFormData = (formData) => {
  const encrypted = {};
  for (let [key, value] of Object.entries(formData)) {
    encrypted[key] = encryptData(value);
  }
  return encrypted;
};

// Descrypt data
const decryptFormData = (encryptedData) => {
  const decrypted = {};
  for (let [key, value] of Object.entries(encryptedData)) {
    decrypted[key] = decryptData(value);
  }
  return decrypted;
};

export { encryptData, decryptData, encryptFormData, decryptFormData };