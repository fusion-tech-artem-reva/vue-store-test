import type { UserType } from "@/types/user.model";
import axios from "./index";

export const whoAmI = (): Promise<{data: UserType}> => {
  return axios.get('user/me')
    .then(r => r.data)
}