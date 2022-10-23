import { AuthenticationAPI, type AuthRequiredFields } from '@/api/authentication';
import type { UserType } from "@/types/user.model";
import { tokenHelper } from '@/utils/localStorageHelper';
import { defineStore } from "pinia";

interface UserStoreType {
  user: UserType | null;
}

export const useUserStore = defineStore({
  id: 'user',
  state: (): UserStoreType => ({
    user: null,
  }),

  actions: {
    setUser(user: UserType | null) {
      this.user = user;
    },
    async authenticateUser(options: AuthRequiredFields & { type: 'signIn' | 'signUp' }) {
      const response = await AuthenticationAPI[options.type](options);
      tokenHelper.set(response.data.token);
      this.user = response.data.user;
    }
  }
})