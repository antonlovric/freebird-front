<template>
    <div v-if="!screen.isMobile" class="container inline-flex flex-col fixed">
        <ul class="inline-flex flex-col min-h-[200px]">
            <cart-preview-item
                v-for="(item, index) in props.cartItems"
                :img="item.products.url"
                :title="item.products.title"
                :price="item.price"
                :quantity="item.quantity"
                :key="index"
            />
        </ul>
        <span class="m-3">Ukupna cijena: {{ props.totalPrice }}kn</span>
    </div>
    <div v-else>
        <va-accordion>
            <va-collapse header="Košarica">
                <ul class="inline-flex flex-col min-h-[200px]">
                    <cart-preview-item
                        v-for="(item, index) in props.cartItems"
                        :img="item.products.url"
                        :title="item.products.title"
                        :price="item.price"
                        :quantity="item.quantity"
                        :key="index"
                    />
                </ul>
                <span class="m-3">Ukupna cijena: {{ props.totalPrice }}kn</span>
            </va-collapse>
        </va-accordion>
    </div>
</template>

<script setup>
const screen = reactive({ isMobile: false });

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

const props = defineProps({
    cartItems: Array,
    totalPrice: Number,
});
</script>

<style scoped>
.container {
    border-left: 1px solid #f97316;
}
</style>
