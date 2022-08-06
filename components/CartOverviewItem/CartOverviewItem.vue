<template>
    <div class="w-full">
        <div class="inline-flex w-full flex-col sm:flex-row gap-5 text-l">
            <img
                class="w-[150px] rounded-md h-[150px]"
                :src="productData.url"
                :alt="productData.title"
            />
            <div class="inline-flex flex-col justify-between w-full">
                <div class="inline-flex flex-col gap-3">
                    <h2 class="text-xl">{{ productData.title }}</h2>
                    <span>Količina: {{ props.product.quantity }}</span>
                </div>
                <div class="inline-flex justify-between items-center gap-3">
                    <div class="inline-flex gap-4 flex-col">
                        <div>
                            <span> {{ productData.product_type.name }}</span>
                            <span> | Medij: {{ productData.media_condition.name }}</span>
                            <span> | Omot: {{ productData.sleeve_condition.name }}</span>
                        </div>
                        <span>Cijena: {{ productData.initial_price }}kn</span>
                    </div>
                    <va-icon
                        @click="() => handleRemoveItem(productData.id)"
                        size="large"
                        name="delete_outline"
                        color="#FF3D3D"
                    />
                </div>
            </div>
        </div>
        <div v-if="props.hasUnderline" class="mb-3 h-0.5 mt-3 w-full mx-auto bg-orange" />
    </div>
</template>

<script setup>
import { useCartStore } from '~~/stores/cart';

const props = defineProps({
    product: {
        type: Object,
        default: {},
    },
    hasUnderline: {
        type: Boolean,
        default: true,
    },
});

const emits = defineEmits(['removed-item']);
const productData = props.product.products;
const cartData = useCartStore();
const config = useRuntimeConfig();
const { init } = useToast();

async function handleRemoveItem(productId) {
    const responseRemove = await useFetch(`${config.API_BASE_URL}/cartItems/${productId}`, {
        method: 'DELETE',
        initialCache: false,
        async onResponseError({ response }) {
            init({
                title: 'Brisanje stavke košarice',
                position: 'top-right',
                color: 'danger',
                message: 'Greška prilikom brisanja stavke košarice!',
            });
        },
        async onResponse({ request, response, options }) {
            if (response.status === 200) {
                init({
                    title: 'Brisanje stavke košarice',
                    position: 'top-right',
                    color: 'success',
                    message: 'Stavka košarice uspješno uklonjena!',
                });
                cartData.removeItem(productId);
                emits('removed-item');
            }
        },
    });
}
</script>
