import axios from "axios"
import { Account } from "../dataModels/Account"
import { AuthUrl } from "../dataModels/Urls"

const API_HOST = import.meta.env.VITE_API_HOST

export const api = axios.create({
  baseURL: API_HOST,
  headers: {
    "Access-Control-Allow-Credentials": true,
    "Content-Type": "application/json",
  },
  // withCredentials: true,
})
export default class AuthService {
  static init = () => {
    return api.get<AuthUrl>("/auth")
  }

  static login = (url: string) => {
    return api.post<Account>("/auth", { url: url })
  }
}
