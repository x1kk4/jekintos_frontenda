import axios from "axios"
import { Files } from "../dataModels/Files"

const API_HOST = import.meta.env.VITE_API_HOST

export const api = axios.create({
  baseURL: API_HOST,
  headers: {
    "Access-Control-Allow-Credentials": true,
    "Content-Type": "application/json",
  },
  // withCredentials: true,
})
export default class FilesService {
  static getFiles = () => {
    return api.get<Files>("/files")
  }

  static getUserFiles = (email: string) => {
    return api.get<Files>("/files/user", {
      headers: {
        "X-User-Email": `${email || ""}`,
      },
    })
  }

  static copyFile = (email: string, fileId: string) => {
    return api.post(
      "/copy",
      { fileId: fileId },
      {
        headers: {
          "X-User-Email": `${email || ""}`,
        },
      },
    )
  }

  static shareFile = (email: string, fileId: string) => {
    return api.post(
      "/share",
      { fileId: fileId },
      {
        headers: {
          "X-User-Email": `${email || ""}`,
        },
      },
    )
  }
}
