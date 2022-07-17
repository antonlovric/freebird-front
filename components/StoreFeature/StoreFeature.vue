<template>
    <div class="inline-flex justify-center items-center flex-col">
        <va-icon class="mb-2" :color="props.iconColor" size="2.5rem" :name="props.icon" />
        <span>{{ props.text }}</span>
    </div>
</template>

<script setup>
const props = defineProps({
    icon: {
        type: String,
        default: '',
    },
    iconColor: {
        type: String,
        default: '',
    },
    text: {
        type: String,
        default: '',
    },
});
</script>
