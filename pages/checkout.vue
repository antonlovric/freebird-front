<template>
    <div>
        <the-header />
        <div class="min-h-screen mb-14 pt-[10vh]">
            <h1 class="text-2xl mb-4 sm:mb-0 sm:text-5xl sm:mt-4 text-center">Naplata</h1>
            <div
                class="flex flex-col items-center sm:items-start justify-center sm:grid grid-rows-2 grid-cols-1 sm:grid-cols-3 sm:grid-rows-1"
            >
                <div class="order-2 sm:order-1 sm:col-span-2">
                    <checkout-details
                        :details="userDetails?.data.value?.data?.data?.[0]"
                        @checkout="handleCheckout"
                    />
                </div>
                <div class="order-1 sm:order-2 max-w-[250px] mb-10">
                    <va-inner-loading :loading="cart.isLoading">
                        <checkout-cart
                            :key="cart.items.length"
                            v-if="cart.items.length !== 0"
                            :cartItems="cart.items"
                            :totalPrice="cart.totalPrice"
                        />
                    </va-inner-loading>
                </div>
            </div>
        </div>
        <the-footer />
    </div>
</template>

<script setup>
import { useCartStore } from '~~/stores/cart';
import { useUserStore } from '~~/stores/user';

const config = useRuntimeConfig();
const userData = useUserStore();
const cartData = useCartStore();
const { init } = useToast();
const router = useRouter();
const cart = reactive({ items: [], isLoading: true, totalPrice: 0 });
const cartId = useCookie('cart_id').value;
if (userData.session_id) {
    const responseCartItems = await useFetch(`${config.API_BASE_URL}/cartItems/${cartId}`);
    if (!responseCartItems.error.value) {
        cart.items = responseCartItems.data.value;
        cart.isLoading = responseCartItems.pending.value;
        cart.totalPrice = cart?.items?.reduce((prev, next) => prev + next.quantity * next.price, 0);
    }
} else {
    cart.items = cartData?.cartItems;
    cart.isLoading = false;
    cart.totalPrice = cartData?.cartPrice;
}

const userDetails = await useAsyncData('user_checkout_details', () =>
    useFetch(`${config.API_BASE_URL}/users`, {
        params: {
            session_id: userData.session_id,
        },
        headers: {
            Authorization: `Bearer ${userData.token}`,
        },
    })
);

const isDisabled = (order) => {
    return (
        order.personalDetails.firstName === '' ||
        order.personalDetails.lastName === '' ||
        order.personalDetails.email === '' ||
        !order.terms ||
        !order.privacy
    );
};

const handleCheckout = async (order) => {
    if (isDisabled(order)) {
        init({
            title: 'Dovršavanje narudžbe',
            position: 'bottom-right',
            message: 'Molim Vas ispunite sva obavezna polja!',
            color: 'warning',
        });
        return;
    }
    const price = reactive({ updatedPrice: cartData.cartPrice });
    if (order.sameAddress) order.shippingAddress = order.billingAddress;
    if (order.paymentDetails.selectedPayment.id === 1) price.updatedPrice += 30;
    const responseOrder = await useFetch(`${config.API_BASE_URL}/orders`, {
        method: 'POST',
        initialCache: false,
        body: {
            total: price.updatedPrice,
            order_status_id: 1,
            billing_address: order.billingAddress.address,
            shipping_address: order.shippingAddress.address,
            phone: order.personalDetails.phone,
            email: order.personalDetails.email,
            billing_city: order.billingAddress.city,
            shipping_city: order.shippingAddress.city,
            billing_country: order.billingAddress.country,
            shipping_country: order.shippingAddress.country,
            shipping_zipcode: order.shippingAddress.zipCode,
            billing_zipcode: order.billingAddress.zipCode,
            session_id: userData.session_id,
            cart_id: cartId,
            comment: order.paymentDetails.comment,
            payment_type: order.paymentDetails.selectedPayment.label,
            shipping_type: order.paymentDetails.selectedShipping.label,
        },
        async onResponseError({ response }) {
            errorStatus.value = response.status;
            init({
                title: 'Dovršavanje narudžbe',
                position: 'bottom-right',
                message: 'Greška prilikom dovršavanja narudžbe!',
                color: 'warning',
            });
        },
        async onResponse({ response }) {
            if (response.status === 201) {
                init({
                    title: 'Dovršavanje narudžbe',
                    position: 'bottom-right',
                    message: 'Narudžba dovršena!',
                    color: 'success',
                });
                cartData.clearCart();
                const responseDisableCart = useFetch(`${config.API_BASE_URL}/carts/${cartId}`, {
                    method: 'PUT',
                    initialCache: false,
                    body: {
                        active: 0,
                    },
                });
                setTimeout(() => {
                    router.push({ path: '/' });
                }, 500);
            }
        },
    });
};
</script>
