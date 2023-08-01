<template>
    <div class="min-h-[80vh] pt-[10vh] relative">
        <h1 class="px-3 my-10 text-4xl text-center sm:text-5xl">Registracija</h1>
        <form
            @submit="handleSubmit"
            @submit.prevent
            id="registration-form"
            class="flex flex-col w-3/4 sm:w-1/5 mx-auto gap-6 mb-5"
        >
            <va-input
                v-model="registrationData.firstName"
                color="#000"
                label="Ime"
                id="first_name"
            ></va-input>
            <va-input
                v-model="registrationData.lastName"
                color="#000"
                label="Prezime"
                id="last_name"
            ></va-input>
            <va-input
                v-model="registrationData.username"
                color="#000"
                label="Korisničko Ime"
                id="username"
            ></va-input>
            <va-input
                v-model="registrationData.email"
                color="#000"
                label="Email"
                type="email"
                id="email"
            ></va-input>
            <va-input
                v-model="registrationData.password"
                color="#000"
                label="Lozinka"
                type="password"
                id="password"
                messages="Lozinka mora imati minimalno 6 znakova!"
            ></va-input>
            <va-input
                v-model="registrationData.passwordConfirmation"
                color="#000"
                label="Potvrda Lozinke"
                type="password"
                id="password_confirmation"
            ></va-input>
            <va-button type="submit" color="#f97316" text-color="#fff">Potvrda</va-button>
        </form>
    </div>
</template>

<script setup>
const registrationData = ref({
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    firstName: '',
    lastName: '',
});
const { init, close } = useToast();
const config = useRuntimeConfig();
const input = reactive({ isDisabled: true });

const isValid = () => {
    if (
        registrationData.value.password.length < 6 ||
        registrationData.value.password !== registrationData.value.passwordConfirmation
    )
        return false;
    return true;
};

const handleSubmit = async () => {
    if (!isValid()) {
        init({
            title: 'Registracija',
            position: 'bottom-right',
            color: 'danger',
            message: 'Neispravan unos!',
        });
        return;
    }
    const formData = {
        username: registrationData.value.username,
        email: registrationData.value.email,
        password: registrationData.value.password,
        password_confirmation: registrationData.value.passwordConfirmation,
        first_name: registrationData.value.firstName,
        last_name: registrationData.value.lastName,
    };

    init({
        title: 'Registracija',
        position: 'bottom-right',
        message: 'Pričekajte...',
    });

    const response = await useFetch(`${config.public.API_BASE_URL}/auth/register`, {
        method: 'POST',
        body: formData,
        initialCache: false,
        onResponseError({ response }) {
            init({
                title: 'Registracija',
                position: 'bottom-right',
                message: 'Neuspješna registracija! Pokušajte kasnije.',
                color: 'danger',
                duration: 5000,
            });
        },
        onResponse({ response }) {
            if (response.status === 200) {
                init({
                    title: 'Registracija',
                    position: 'bottom-right',
                    message: 'Uspješna registracija! Dobili ste email s daljnjim uputama!',
                    color: 'success',
                    duration: 5000,
                });
            }
        },
    });
};
</script>
