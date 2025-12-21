// Run this with: node test-shiprocket.js
import axios from 'axios';

// 👇 PASTE YOUR CREDENTIALS DIRECTLY HERE (No .env)
const EMAIL = "tanvi2004.14@gmail.com"; 
const PASSWORD = "X#Q7oQ0hhcZh6wOU2u57M!i3X9lr%Xrb";

console.log("------------------------------------------------");
console.log("Testing Shiprocket Login...");
console.log(`Email: ${EMAIL}`);
console.log(`Password: ${PASSWORD}`);
console.log("------------------------------------------------");

const login = async () => {
    try {
        const response = await axios.post('https://apiv2.shiprocket.in/v1/external/auth/login', {
            email: EMAIL,
            password: PASSWORD
        });

        console.log("✅ SUCCESS! Token received:");
        console.log(response.data.token);
    } catch (error) {
        console.log("❌ FAILED!");
        if (error.response) {
            console.log("Status:", error.response.status);
            console.log("Message:", error.response.data);
        } else {
            console.log("Error:", error.message);
        }
    }
};

login();