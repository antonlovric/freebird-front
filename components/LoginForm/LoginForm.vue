<template>
    <div class="minh-[80vh] pt-[10vh] relative">
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
import { useUserStore } from '~~/stores/user';

const loginData = ref({
    email: '',
    password: '',
    remember_me: false,
});
const { init, close } = useToast();

const handleSubmit = async (event) => {
    const inputElements = event.target.elements;
    const config = useRuntimeConfig();
    const errorStatus = ref(null);
    const userStore = useUserStore();
    const router = useRouter();

    const formData = {
        email: inputElements['email']?.value,
        password: inputElements['password']?.value,
        remember_me: inputElements['remember_me']?.value,
    };

    const start = init({
        title: 'Prijava',
        position: 'top-right',
        message: 'Pričekajte...',
    });

    const response = await useFetch(`${config.API_BASE_URL}/auth/login`, {
        method: 'POST',
        body: formData,
        initialCache: false,
        async onResponseError({ response }) {
            errorStatus.value = response.status;
        },
    });

    close(start);
    if (errorStatus.value === 403) {
        init({
            title: 'Prijava',
            position: 'top-right',
            message: 'Račun nije aktiviran!',
            color: 'danger',
            duration: 5000,
        });
    } else if (errorStatus.value === 401) {
        init({
            title: 'Prijava',
            position: 'top-right',
            message: 'Neispravni podaci!',
            color: 'danger',
            duration: 5000,
        });
    }

    if (response.data.value?.status === 201) {
        init({
            title: 'Prijava',
            position: 'top-right',
            message: 'Uspješna prijava! Uskoro ćete biti preusmjereni na naslovnu stranicu!',
            color: 'success',
            duration: 5000,
        });

        userStore.token = response.data.value.responseData['token'];
        userStore.session_id = response.data.value.responseData['session'];
        userStore.type = response.data.value.responseData.user['user_type_id'];

        setTimeout(() => {
            router.push({ path: '/' });
        }, 500);
    }
};
</script>
