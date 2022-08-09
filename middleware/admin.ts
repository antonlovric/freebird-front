import { useUserStore } from '~~/stores/user';

export default defineNuxtRouteMiddleware((to) => {
    const userData = useUserStore();
    if (userData.token === '') return navigateTo('/login');
    if (userData.type !== 2) return navigateTo('/');
});
