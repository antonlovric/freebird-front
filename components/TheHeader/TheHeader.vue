<template>
    <desktop-navigation v-if="!screen.isMobile" />
    <mobile-navigation v-else />
</template>

<script setup>
import { onMounted, onBeforeUnmount, reactive } from 'vue';

const screen = reactive({ isMobile: true });

const checkIfMobile = () => {
    screen.isMobile = window.screen.width < 768;
};

onMounted(() => {
    screen.isMobile = window.screen.width < 768;
    window.addEventListener('resize', checkIfMobile);
});

onBeforeUnmount(() => {
    window.removeEventListener('resize', checkIfMobile);
});
</script>
