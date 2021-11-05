import axios from "axios";
import { SERVER_URL } from "../constants";
import { UserLogin, UserRegistration } from "../types";
import { LoginResponse } from "../types/user";

const config = {
    baseURL: `${SERVER_URL}/api`
}
const instance = axios.create(config)

const users = {
    register: (registration: UserRegistration)=>instance.post<LoginResponse>("/users/register", registration).then(res=>res.data),
    login: (login: UserLogin)=>instance.post<LoginResponse>("/users/login", login).then(res=>res.data)
};

const agent = {
    users    
};

export default agent;