<template>
    <div>
        <the-header />
        <admin-dashboard v-if="userData.type == 2" />
        <the-footer />
    </div>
</template>

<script setup>
import { useUserStore } from '~~/stores/user';

const userData = useUserStore();
</script>
