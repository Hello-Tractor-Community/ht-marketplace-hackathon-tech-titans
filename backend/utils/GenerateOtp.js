const generateRandomOtp = () => {
    const otp = Math.floor(100000 + Math.random() * 900000); // Ensures a 6-digit number
    console.log('Generated OTP:', otp);
    return otp;
};

module.exports = generateRandomOtp;
