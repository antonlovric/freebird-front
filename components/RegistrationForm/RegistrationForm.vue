<template>
    <div class="minh-[80vh] pt-[10vh] relative">
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

const handleSubmit = async (event) => {
    const inputElements = event.target.elements;
    const config = useRuntimeConfig();

    const formData = {
        username: inputElements['username']?.value,
        email: inputElements['email']?.value,
        password: inputElements['password']?.value,
        password_confirmation: inputElements['password_confirmation']?.value,
        first_name: inputElements['first_name']?.value,
        last_name: inputElements['last_name']?.value,
    };

    const start = init({
        title: 'Registracija',
        position: 'top-right',
        message: 'Pričekajte...',
    });

    const response = await useFetch(`${config.API_BASE_URL}/auth/register`, {
        method: 'POST',
        body: formData,
    });

    close(start);
    if (response.error) {
        init({
            title: 'Registracija',
            position: 'top-right',
            message: 'Neuspješna registracija! Pokušajte kasnije.',
            color: 'danger',
            duration: 5000,
        });
    }

    if (response.data.value?.status === 201) {
        init({
            title: 'Registracija',
            position: 'top-right',
            message: 'Uspješna registracija! Pratite upute na mailu i aktivirajte svoj račun!',
            color: 'success',
            duration: 5000,
        });
    }
};
</script>
