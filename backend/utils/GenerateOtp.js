const generateRandomOtp = () =>{
    const otp = Math.floor(Math.random() * 1000000);
    console.log('otp',otp)
    return otp
}

// generateRandomOtp()

module.exports =generateRandomOtp;