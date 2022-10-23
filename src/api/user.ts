import type { UserType } from "@/types/user.model";
import { tokenHelper } from '@/utils/localStorageHelper';
import axios from "./index";

export const whoAmI = (): Promise<{ data: UserType  }> => {
  return axios.get('user')
    .then(r => r.data)
}
