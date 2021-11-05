export interface UserRegistration{
    
    username: string;
    email: string;
    password: string;
    repeatPassword: string;
}

export interface UserLogin{
    email: string;
    password: string;
}

export interface LoginResponse{
    email: string;
    username: string;
    token: string;
}