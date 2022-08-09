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
                    <span>Količina: {{ props.quantity }}</span>
                </div>
                <div class="inline-flex justify-between items-center gap-3">
                    <div class="inline-flex gap-4 flex-col">
                        <div>
                            <span> {{ productData.product_type.name }}</span>
                            <span> | Medij: {{ productData.media_condition.name }}</span>
                            <span> | Omot: {{ productData.sleeve_condition.name }}</span>
                        </div>
                        <span
                            >Cijena:
                            {{
                                userData.token ? discountedPrice() : props.productData.price
                            }}kn</span
                        >
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
import { useUserStore } from '~~/stores/user';

const props = defineProps({
    productData: {
        type: Object,
        default: {},
    },
    hasUnderline: {
        type: Boolean,
        default: true,
    },
    quantity: {
        type: Number,
        default: 0,
    },
});

const discountedPrice = () =>
    props.productData.initial_price -
    (props.productData.discount / 100) * props.productData.initial_price;

const emits = defineEmits(['removed-item']);
const { productData } = props;
const cartData = useCartStore();
const config = useRuntimeConfig();
const { init } = useToast();
const userData = useUserStore();

const handleRemoveItem = async (productId) => {
    const responseRemove = await useFetch(`${config.API_BASE_URL}/cartItems/${productId}`, {
        method: 'DELETE',
        initialCache: false,
        async onResponseError({ response }) {
            init({
                title: 'Brisanje stavke košarice',
                position: 'bottom-right',
                color: 'danger',
                message: 'Greška prilikom brisanja stavke košarice!',
            });
        },
        async onResponse({ request, response, options }) {
            if (response.status === 200) {
                init({
                    title: 'Brisanje stavke košarice',
                    position: 'bottom-right',
                    color: 'success',
                    message: 'Stavka košarice uspješno uklonjena!',
                });
                cartData.removeItem(productId);
                emits('removed-item');
            }
        },
    });
};
</script>
