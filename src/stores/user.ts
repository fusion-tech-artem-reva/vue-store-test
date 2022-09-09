import type { UserType } from "@/types/user.model";
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
    }
  }
})