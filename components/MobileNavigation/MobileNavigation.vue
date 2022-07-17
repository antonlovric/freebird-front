<template>
    <div>
        <va-sidebar :minimized="isShown.minimized" minimizedWidth="0" class="!absolute">
            <va-sidebar-item v-for="item in notLoggedUser" :key="item.name">
                <nuxt-link :to="item.route">
                    <va-sidebar-item-content>
                        <va-icon :name="item.icon" />
                        <va-sidebar-item-title>{{ item.name }}</va-sidebar-item-title>
                    </va-sidebar-item-content>
                </nuxt-link>
            </va-sidebar-item>
        </va-sidebar>
        <va-button
            id="menu-button"
            size="large"
            color="#f97316"
            icon="menu"
            class="!absolute !right-6 top-5 z-40"
            v-model="isShown.minimized"
        ></va-button>
    </div>
</template>

<script setup>
const isShown = reactive({ minimized: true });

onMounted(() => {
    document.querySelector('#menu-button').addEventListener('click', () => {
        isShown.minimized = !isShown.minimized;
    });
});

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
    { name: 'Profil', icon: 'account_circle', route: '/profile' },
    { name: 'Odjava', icon: 'logout', route: '/logout' },
]);
</script>
