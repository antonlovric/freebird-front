<script setup>
const props = defineProps({
    text: {
        type: String,
        default: '',
    },
    path: {
        type: String,
        default: '/',
    },
    icon: {
        type: Boolean,
        default: false,
    },
    iconName: {
        type: String,
        default: '',
    },
});
</script>

<template>
    <li class="inline">
        <NuxtLink
            :to="props.path"
            class="inline-flex items-center justify-center px-1 py-1 text-white"
        >
            <va-icon v-if="props.icon" :name="props.iconName" />
            <span v-else>{{ props.text }}</span>
        </NuxtLink>
    </li>
</template>
