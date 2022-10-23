import { AuthenticationAPI, type AuthRequiredFields } from '@/api/authentication';
import { whoAmI } from '@/api/user';
import type { UserType } from "@/types/user.model";
import { tokenHelper } from '@/utils/localStorageHelper';
import { defineStore } from "pinia";

interface UserStoreType {
  user: UserType | null;
  isInitialised: boolean;
}

export const useUserStore = defineStore({
  id: 'user',
  state: (): UserStoreType => ({
    user: null,
    isInitialised: !tokenHelper.get(),
  }),

  actions: {
    setUser(user: UserType | null) {
      this.user = user;
    },
    async authenticateUser(options: AuthRequiredFields & { type: 'signIn' | 'signUp' }) {
      const response = await AuthenticationAPI[options.type](options);
      tokenHelper.set(response.data.token);
      this.user = response.data.user;
    },
    async loginByToken() {
      try {
        if (!tokenHelper.get()) return;
        const response = await whoAmI();
        console.log('response', response)
        this.setUser(response.data)
      } catch (err) {
        console.log('Token expired');
      } finally {
        this.$state.isInitialised = true;
      }
    }
  }
})