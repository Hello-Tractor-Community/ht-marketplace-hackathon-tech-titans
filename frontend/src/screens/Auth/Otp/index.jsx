import React, { useState, useRef } from "react" 
import { useSearchParams } from "react-router-dom" 
import CryptoJS from "crypto-js" 
import useAxios from "../../../Hooks/useAxios" 
import { toast } from "react-toastify" 
import { useNavigate } from "react-router-dom"

const OTPPage = () => {
    const [email, setEmail] = useState("") 
    const [otp, setOtp] = useState(new Array(6).fill("")) 
    const inputsRef = useRef([]) 
    const [searchParams] = useSearchParams() 
    const encryptedEmail = searchParams.get("user") 
    const iv = searchParams.get("iv") 
    const { post, get } = useAxios() 
    const navigate = useNavigate()

    const encryptionKey = "bas8b-76d-87ya-s8u8di-s87h8-n8y9hi-s9y7-a99dh-i8yh98ea" 
    
    React.useEffect(() => {
        if (encryptedEmail && iv) {
        try {
            const bytes = CryptoJS.AES.decrypt(encryptedEmail, encryptionKey, {
            iv: CryptoJS.enc.Hex.parse(iv),
            }) 
            const decryptedEmail = bytes.toString(CryptoJS.enc.Utf8) 
            setEmail(decryptedEmail) 
        } catch (error) {
            console.error("Failed to decrypt email", error) 
        }
    }
  }, [encryptedEmail, iv]) 

  const handleChange = (value, index) => {
    // Allow only numeric values
    if (!/^\d*$/.test(value)) return 

    const newOtp = [...otp] 
    newOtp[index] = value 
    setOtp(newOtp) 

    // Move to the next input when a digit is entered
    if (value && index < 5) {
      inputsRef.current[index + 1].focus() 
    }
  } 

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus() 
    }
  } 

  const handlePaste = (e) => {
    e.preventDefault() 
    const pastedData = e.clipboardData
      .getData("text")
      .slice(0, 6)
      .split("")
      .filter((char) => /^\d$/.test(char))  // Only numbers

    const newOtp = [...otp] 
    pastedData.forEach((char, index) => {
      if (index < newOtp.length) {
        newOtp[index] = char 
      }
    }) 

    setOtp(newOtp) 

    // Focus on the next empty input
    const filledIndex = pastedData.length - 1 
    if (filledIndex < 5) {
      inputsRef.current[filledIndex + 1].focus() 
    }
  } 

    const checkSession = async() => {
    try {
      const response = await get('/api/auth/check-session', { useAuth: true })
      localStorage.setItem('user_data', JSON.stringify(response.user))
    } catch(err) {
      console.error(err)
    }
    }
    
  const handleSubmit = async() => {
    const otpValue = otp.join("") 
      // console.log("OTP Submitted:", otpValue) 
      try {
          const response = await post(`/api/auth/verify-sign-up-token/${email}/${otpValue}`) 
          localStorage.setItem('access_token', response.token)
          toast.success(response.message)
          await checkSession()
          navigate('/')
      } catch (error) {
          toast.error(error.response.data.message)
          console.error("Failed to verify OTP", error) 
  
      }
  } 

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 py-8">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold text-center mb-6 text-plum">
          Enter OTP
        </h1>
        <p className="text-center text-gray-600 mb-8">
          OTP sent to: <span className="font-semibold">{email}</span>
        </p>
        <div className="flex justify-center gap-2 mb-6">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onPaste={handlePaste}
              ref={(el) => (inputsRef.current[index] = el)}
              className="w-12 h-12 border border-gray-300 rounded-lg text-center text-lg font-bold focus:outline-none focus:ring-2 focus:ring-sunsetBlaze"
            />
          ))}
        </div>
        <button
          onClick={handleSubmit}
          className="w-full bg-sunsetBlaze text-white py-2 rounded-lg font-semibold hover:bg-red-600 transition duration-300"
        >
          Verify OTP
        </button>
        <p className="text-center text-gray-600 mt-4">
          Didn’t receive the code?{" "}
          <button className="text-sunsetBlaze hover:underline">Resend</button>
        </p>
      </div>
    </div>
  ) 
} 

export default OTPPage 
