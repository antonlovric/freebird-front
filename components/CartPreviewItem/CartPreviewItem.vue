<template>
    <li class="inline-flex m-3 gap-2 items-center">
        <img :src="props.img" :alt="props.title" class="h-[70px] w-[70px]" />
        <div class="inline-flex gap-4 flex-col justify-between py-1">
            <span>{{ props.title }}</span>
            <span>Količina: {{ props.quantity }}</span>
            <span>Jedinična cijena: {{ props.price }}kn</span>
        </div>
    </li>
</template>

<script setup>
const props = defineProps({
    img: {
        type: String,
        default: '',
    },
    title: {
        type: String,
        default: '',
    },
    quantity: {
        type: Number,
        default: '',
    },
    price: {
        type: Number,
    },
});
</script>
