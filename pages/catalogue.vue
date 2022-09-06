<template>
    <div>
        <the-header />
        <va-button
            id="filter-button"
            size="large"
            color="#f97316"
            icon="tune"
            class="!fixed !right-6 top-20 z-40"
            v-if="screen.isMobile"
            @click="() => (screen.isSidebarVisible = !screen.isSidebarVisible)"
        ></va-button>
        <h1 class="text-5xl mb-4 sm:mb-0 sm:text-6xl text-center pt-10 sm:pt-[10vh]">Katalog</h1>
        <product-catalogue
            :isMobile="screen.isMobile"
            :isSidebarVisible="screen.isSidebarVisible"
        />
        <the-footer />
    </div>
</template>

<script setup>
const screen = reactive({ isMobile: false, isSidebarVisible: false });

const checkIfMobile = () => {
    screen.isMobile = window.screen.width < 768;
};

onMounted(() => {
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
});

onBeforeUnmount(() => {
    window.removeEventListener('resize', checkIfMobile);
});

useHead({
    title: 'Katalog',
});
</script>
