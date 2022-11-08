import { tokenHelper } from "@/utils/localStorageHelper";
import axios from "axios";

const BASE_URL = 'http://localhost:4000/api';
const instance = axios.create({
  baseURL: BASE_URL
})


instance.interceptors.request.use((configs) => {
  const token = tokenHelper.get();
  if (token) {
    configs.headers = {
      ...configs.headers,
      authorization: `Bearer ${token}`
    }
  }
  return configs
})

instance.interceptors.response.use((response) => {
  if (response.data?.data?.token) {
    tokenHelper.set(response.data.data.token)
  }
  return response
})

export default instance;