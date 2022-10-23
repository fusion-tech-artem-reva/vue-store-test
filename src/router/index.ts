import { useUserStore } from '@/stores/user'
import AuthenticationViewVue from '@/views/AuthenticationView.vue'
import { createRouter, createWebHistory, type NavigationGuardWithThis } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import EmptyView from '@/components/EmptyView.vue';
import { tokenHelper } from '@/utils/localStorageHelper';

const authenticationGuard: NavigationGuardWithThis<unknown> = (to) => {
  const userStore = useUserStore();
  if (!userStore.user?.email) {
    return {
      name: 'auth',
      query: { redirectTo: to.fullPath }
    }
  }
}

const guardForRoutesWithoutAuth: NavigationGuardWithThis<unknown> = () => {
  const userStore = useUserStore();
  if (userStore.user?.email) {
    return {
      name: 'home'
    }
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/auth',
      name: 'auth',
      component: AuthenticationViewVue,
      beforeEnter: [guardForRoutesWithoutAuth]
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('../views/ProfileView.vue'),
      beforeEnter: [authenticationGuard]
    },
    {
      path: '/logout',
      name: 'logout',
      component: EmptyView,
      beforeEnter: (to, from) => {
        const user = useUserStore();
        user.setUser(null);
        tokenHelper.remove();
        return {
          name: 'auth'
        }
      }
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore();
  if (!userStore.user && tokenHelper.get()) {
    await userStore.loginByToken();
    return next()
  } 
  next()
})

export default router
