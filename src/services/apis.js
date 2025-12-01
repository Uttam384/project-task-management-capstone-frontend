const base_url = "https://localhost:7228/api";
 
export const registerUserAPI = {
    REGISTER_USER: "https://localhost:7228/api/auth/register",  
    GET_OTP: "https://localhost:7228/api/auth/get-otp",
    VERIFY_EMAIL: base_url+"/auth/verify-email",
    LOG_IN: base_url+"/auth/login",
    FORGOT_PASSWORD: base_url+"/auth/forgot-password",
    RESET_PASSWORD: base_url+"/auth/reset-password",
    GET_ALL_USERS: base_url+"/auth/GetAllUsers"  
}