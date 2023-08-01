<template>
    <header>
        <desktop-navigation v-if="!screen.isMobile" />
        <mobile-navigation v-else />
    </header>
</template>

<script setup>
import { onMounted, onBeforeUnmount, reactive } from 'vue';
import { useUserStore } from '~~/stores/user';
const screen = reactive({ isMobile: true });

const checkIfMobile = () => {
    screen.isMobile = window.screen.width < 768;
};

const userData = useUserStore();
const rememberCookie = useCookie('remember_token').value;
const config = useRuntimeConfig();

if (rememberCookie) {
    const responseUserInfo = useFetch(`${config.public.API_BASE_URL}/auth/remember`, {
        method: 'POST',
        body: {
            remember_token: rememberCookie,
        },
        async onResponse({ response }) {
            if (response.status === 200) {
                userData.$patch((state) => {
                    state.token = response._data.responseData['token'];
                    state.session_id = response._data.responseData['session'];
                    state.type = response._data.responseData.user['user_type_id'];
                    state.remember_token = response._data.responseData.user['remember_token'];
                });
            }
        },
    });
    if (responseUserInfo.data.value) {
        userData.$patch((state) => {
            state.token = responseUserInfo.data.value.responseData['token'];
            state.session_id = responseUserInfo.data.value.responseData['session'];
            state.type = responseUserInfo.data.value.responseData.user['user_type_id'];
            state.remember_token = responseUserInfo.data.value.responseData.user['remember_token'];
        });
    }
}

onMounted(() => {
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
});

onBeforeUnmount(() => {
    window.removeEventListener('resize', checkIfMobile);
});
</script>
