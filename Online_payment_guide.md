# 📱 OTP SMS Auto-Read Integration Guide

This guide explains how to implement a secure, seamless SMS OTP (One-Time Password) verification flow for online payments. By combining **Twilio** (on the backend) and the **WebOTP API** (on the frontend), you can allow the mobile browser to automatically read the SMS and fill in the verification code for the user.

---

## 🛠️ Step 1: Backend Setup (Twilio SMS Gateway)

1. Register a free account at [Twilio](https://www.twilio.com) to get a test phone number, **Account SID**, and **Auth Token**.
2. Add your credentials to your `server/.env` file:
   ```env
   TWILIO_ACCOUNT_SID="your_account_sid"
   TWILIO_AUTH_TOKEN="your_auth_token"
   TWILIO_PHONE_NUMBER="your_twilio_phone_number"
   ```
3. Generate the 6-digit OTP code and send it via Twilio. In `server/controllers/orderController.js`:
   ```javascript
   import twilio from 'twilio';

   const twilioClient = twilio(
       process.env.TWILIO_ACCOUNT_SID, 
       process.env.TWILIO_AUTH_TOKEN
   );

   export const sendPaymentOTP = async (req, res) => {
       try {
           const { userPhoneNumber } = req.body;
           
           // 1. Generate a random 6-digit code
           const otp = Math.floor(100000 + Math.random() * 900000).toString();
           
           // 2. Save the otp & its expiration timestamp in the database
           // (e.g., associated with the user session or order ID)
           
           // 3. Format the SMS. The text MUST end with the domain helper line
           // for the mobile browser to intercept it.
           const messageText = `Your GreenCart verification code is ${otp}.\n\n@localhost #${otp}`;

           // 4. Send the SMS
           await twilioClient.messages.create({
               body: messageText,
               from: process.env.TWILIO_PHONE_NUMBER,
               to: userPhoneNumber // E.g., "+1234567890"
           });

           return res.json({ success: true, message: "OTP sent successfully" });
       } catch (error) {
           return res.json({ success: false, message: error.message });
       }
   };
   ```

---

## 📩 Step 2: Formatting the SMS Text (Crucial)

To enable the native WebOTP API to auto-read the SMS, the message must follow this structure on the very last line:

```text
Your custom message text. E.g., Your code is 123456.

@yourdomain.com #123456
```

### Formatting Rules:
- The domain helper must be on the last line of the message.
- It must start with `@` followed by the domain name (e.g., `@localhost` for local development, or `@greencart.com` in production).
- It must contain a space, followed by `#`, and then the exact OTP code.

---

## 📲 Step 3: Frontend Setup (WebOTP API)

Modern mobile browsers (Chrome on Android, Safari on iOS) will monitor the SMS and prompt the user to auto-fill the code if they detect the matching domain tag.

### 1. HTML Input Form
Add `autocomplete="one-time-code"` and `inputmode="numeric"` to your input element so the browser knows this input is for the incoming SMS OTP:
```jsx
<input 
  type="text" 
  inputMode="numeric" 
  autoComplete="one-time-code" 
  required 
  value={otp} 
  onChange={(e) => setOtp(e.target.value)} 
  placeholder="Enter 6-digit OTP"
  className="border p-2 rounded outline-none"
/>
```

### 2. React Auto-Read Controller
Use a `useEffect` hook to activate the browser's credentials listener. Once the SMS arrives, the browser will display an overlay asking the user: **"Allow [domain] to read code [code]?"**. Tapping **Allow** will trigger the promise and fill the state automatically.

```javascript
import React, { useEffect, useState } from 'react';

const VerifyOTP = () => {
    const [otp, setOtp] = useState("");

    useEffect(() => {
        // Only run WebOTP API if supported by the browser
        if ('OTPCredential' in window) {
            const ac = new AbortController();
            
            navigator.credentials.get({
                otp: { transport: ['sms'] },
                signal: ac.signal
            })
            .then((otpObject) => {
                // Auto-fill the state
                setOtp(otpObject.code); 
                ac.abort();
            })
            .catch((error) => {
                console.error("WebOTP Error:", error);
            });

            return () => {
                ac.abort(); // Clean up listener when component unmounts
            };
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Send OTP to backend /api/order/verify-otp to validate
    };

    return (
        <form onSubmit={handleSubmit}>
            <p>Verification Code Sent to your Phone</p>
            <input 
                type="text" 
                inputMode="numeric" 
                autoComplete="one-time-code" 
                value={otp} 
                onChange={(e) => setOtp(e.target.value)} 
                required 
            />
            <button type="submit">Verify & Place Order</button>
        </form>
    );
};

export default VerifyOTP;
```
