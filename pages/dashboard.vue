<template>
    <div>
        <the-header />
        <admin-dashboard />
        <the-footer />
    </div>
</template>

<script setup>
definePageMeta({
    middleware: ['admin', 'auth'],
});
useHead({
    title: 'Upravljačka Ploča',
});
</script>
