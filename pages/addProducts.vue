<template>
    <div>
        <the-header />
        <add-product-form />
        <the-footer />
    </div>
</template>

<script setup>
import { useUserStore } from '~~/stores/user';

const userData = useUserStore();
</script>
