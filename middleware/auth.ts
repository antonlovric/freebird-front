import { useUserStore } from '~~/stores/user';

export default defineNuxtRouteMiddleware((to, from) => {
  // return navigateTo('/')
  const userData = useUserStore();
  if (userData.token === '') return navigateTo('/login');
});
