import { useUserStore } from '~~/stores/user';

export default defineNuxtRouteMiddleware((to, from) => {
  const userData = useUserStore();
  if (userData.token === '') return navigateTo('/login');
});
