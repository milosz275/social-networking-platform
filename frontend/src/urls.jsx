const debug = true
let API_BASE = "";
if (debug) {
    API_BASE = "http://localhost:8000"
} else {
    API_BASE = "https://api.ziomki.online"
}
export const API_BASE_URL = API_BASE;
export const API_LOGIN = `${API_BASE_URL}/user/login/`;
export const API_REGISTER = `${API_BASE_URL}/user/register/`;
export const API_LOGIN_REFRESH = `${API_BASE_URL}/user/login/refresh/`;
export const API_CREATE_POST = `${API_BASE_URL}/posts/create`;
export const API_ADMIN = `${API_BASE_URL}/admin`;

let BASE_URL = "/social-networking-platform";
export const ROOT_URL = BASE_URL + "/";
export const MAIN_URL = BASE_URL + "/main";
export const LOGIN_URL = BASE_URL + "/login";
export const REGISTER_URL = BASE_URL + "/register";
export const TERMS_URL = BASE_URL + "/terms";
export const DEBUG_URL = BASE_URL + "/debug";
export const ADMIN_URL = BASE_URL + "/admin";
export const CHAT_URL = BASE_URL + "/chat";
