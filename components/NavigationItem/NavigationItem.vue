<template>
    <li class="inline">
        <NuxtLink
            :to="props.path"
            class="inline-flex items-center justify-center px-1 py-1 text-white"
            v-if="props.type === 'link'"
        >
            <va-icon v-if="props.icon" :name="props.iconName" />
            <span v-else>{{ props.text }}</span>
        </NuxtLink>
        <span v-else class="nav-span inline-flex items-center justify-center px-1 py-1 text-white">
            <va-icon v-if="props.icon" :name="props.iconName" />
            <span v-else>{{ props.text }}</span>
        </span>
    </li>
</template>

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
    type: {
        type: String,
        default: 'link',
    },
});
</script>

<style>
.nav-span {
    cursor: pointer;
}
</style>
