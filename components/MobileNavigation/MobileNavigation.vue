<template>
    <va-sidebar class="h-[100vh!important]">
        <va-sidebar-item v-for="item in notLoggedUser" :key="item.name">
            <nuxt-link :to="item.route">
                <va-sidebar-item-content>
                    <va-icon :name="item.icon" />
                    <va-sidebar-item-title>{{ item.name }}</va-sidebar-item-title>
                </va-sidebar-item-content>
            </nuxt-link>
        </va-sidebar-item>
    </va-sidebar>
</template>

<script setup>
const notLoggedUser = ref([
    { name: 'Naslovnica', icon: 'home', route: '/' },
    { name: 'Katalog', icon: 'library_music', route: '/catalogue' },
    { name: 'Novosti', icon: 'feed', route: '/posts' },
    { name: 'Registracija', icon: 'how_to_reg', route: '/registration' },
    { name: 'Prijava', icon: 'login', route: '/login' },
]);

const loggedInUser = ref([
    { name: 'Naslovnica', icon: 'home', route: '/' },
    { name: 'Katalog', icon: 'library_music', route: '/catalogue' },
    { name: 'Novosti', icon: 'feed', route: '/posts' },
    { name: 'Profil', icon: 'account_circle', route: '/prfile' },
    { name: 'Odjava', icon: 'logout', route: '/logout' },
]);
</script>
