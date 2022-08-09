<template>
    <div class="min-h-[80vh] pt-[10vh] relative">
        <h1 class="px-3 my-10 text-4xl text-center sm:text-5xl">Prijava</h1>
        <form
            @submit="handleSubmit"
            @submit.prevent
            id="registration-form"
            class="flex flex-col w-3/4 sm:w-1/5 mx-auto gap-6 mb-5"
        >
            <va-input
                v-model="loginData.email"
                color="#000"
                label="Email"
                type="email"
                id="email"
            ></va-input>
            <va-input
                v-model="loginData.password"
                color="#000"
                label="Lozinka"
                type="password"
                id="password"
            ></va-input>
            <va-checkbox v-model="loginData.remember_me" id="remember_me" label="Zapamti Me" />
            <va-button type="submit" color="#f97316" text-color="#fff">Prijava</va-button>
        </form>
    </div>
</template>

<script setup>
import { useCartStore } from '~~/stores/cart';
import { useUserStore } from '~~/stores/user';

const loginData = reactive({
    email: '',
    password: '',
    remember_me: false,
});
const { init } = useToast();

const handleSubmit = async (event) => {
    const config = useRuntimeConfig();
    const userStore = useUserStore();
    const cartStore = useCartStore();
    const router = useRouter();
    const cartId = useCookie('cart_id').value;

    init({
        title: 'Prijava',
        position: 'bottom-right',
        message: 'Pričekajte...',
    });

    const response = await useFetch(`${config.API_BASE_URL}/auth/login`, {
        method: 'POST',
        body: {
            email: loginData.email,
            password: loginData.password,
            remember_me: loginData.remember_me,
        },
        initialCache: false,
        async onResponse({ response }) {
            if (response._data.status === 201 || response._data.status === 200) {
                init({
                    title: 'Prijava',
                    position: 'bottom-right',
                    message:
                        'Uspješna prijava! Uskoro ćete biti preusmjereni na naslovnu stranicu!',
                    color: 'success',
                    duration: 5000,
                });

                userStore.token = response._data.responseData['token'];
                userStore.session_id = response._data.responseData['session'];
                userStore.type = response._data.responseData.user['user_type_id'];
                userStore.remember_token = response._data.responseData.user['remember_token'];

                if (loginData.remember_me) {
                    const expiryDate = new Date();
                    expiryDate.setFullYear(expiryDate.getFullYear() + 2);
                    const rememberCookie = useCookie('remember_token', { expires: expiryDate });
                    rememberCookie.value = response._data.responseData.user['remember_token'];
                } else {
                    const rememberCookie = useCookie('remember_token');
                    rememberCookie.value = null;
                }

                setTimeout(() => {
                    router.push({ path: '/' });
                }, 500);
            }
            const responseProduct = await useFetch(`${config.API_BASE_URL}/cartItems/${cartId}`, {
                method: 'GET',
                initialCache: false,
                async onResponse({ request, response, options }) {
                    if (response._data) {
                        response._data.forEach((item) => {
                            cartStore.addItem({
                                id: item.product_id,
                                price: item.price,
                                quantity: item.quantity,
                                title: item.products.title,
                                url: item.products.url,
                                media_condition: {
                                    id: item.products.media_condition.id,
                                    name: item.products.media_condition.name,
                                },
                                sleeve_condition: {
                                    id: item.products.sleeve_condition.id,
                                    name: item.products.sleeve_condition.name,
                                },
                                product_type: {
                                    id: item.products.product_type.id,
                                    name: item.products.product_type.name,
                                },
                            });
                        });
                    }
                },
            });
        },
        onResponseError({ response }) {
            if (response.status === 403) {
                init({
                    title: 'Prijava',
                    position: 'bottom-right',
                    message: 'Račun nije aktiviran!',
                    color: 'danger',
                    duration: 5000,
                });
            } else if (response.status === 401) {
                init({
                    title: 'Prijava',
                    position: 'bottom-right',
                    message: 'Neispravni podaci!',
                    color: 'danger',
                    duration: 5000,
                });
            } else {
                init({
                    title: 'Prijava',
                    position: 'bottom-right',
                    message: 'Pogreška prilikom prijave! ' + response.statusText,
                    color: 'danger',
                    duration: 5000,
                });
            }
        },
    });
};
</script>
