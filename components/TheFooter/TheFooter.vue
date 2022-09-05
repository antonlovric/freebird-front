<template>
    <footer
        class="bg-grey flex flex-col sm:flex-row px-8 sm:gap-32 justify-start py-8 w-full text-black"
    >
        <div class="">
            <h2>O nama</h2>
            <ul class="flex flex-col mb-4 mt-2 gap-2">
                <li><nuxt-link to="/history">Povijest</nuxt-link></li>
                <li><nuxt-link to="/terms">Uvjeti Korištenja</nuxt-link></li>
                <li><nuxt-link to="/privacy">Politika Privatnosti</nuxt-link></li>
                <li><nuxt-link to="/grading">Sustav Ocjenjivanja</nuxt-link></li>
            </ul>
        </div>
        <div>
            <h2>Služba za korisnike</h2>
            <ul class="flex flex-col mb-4 mt-2 gap-2">
                <li><nuxt-link to="/contact">Kontakt</nuxt-link></li>
                <li>
                    <div class="inline-flex items-center justify-center gap-5 mt-2">
                        <a
                            aria-label="visit facebook page"
                            href="https://www.facebook.com/Free-Bird-Music-Shop-149579005105474/"
                            ><img alt="facebook" src="~/assets/facebook-brands.svg"
                        /></a>
                        <a
                            aria-label="visit instagram page"
                            href="https://www.instagram.com/freebirdmusicshop1/"
                            ><img alt="instagram" src="~/assets/instagram-brands.svg"
                        /></a>
                    </div>
                </li>
            </ul>
        </div>
        <div>
            <h2>Ne propustite nove akcije</h2>
            <div class="flex flex-col gap-3">
                <label class="mt-3" for="newsletter">
                    Prijavite se na naš newsletter i ostanite u toku sa svim novim ponudama!</label
                >
                <va-input
                    inputmode="email"
                    id="newsletter"
                    class="max-w-[30ch] sm:max-w-[30ch]"
                    v-model="input.email"
                    @click-append-inner="handleNewsletter"
                >
                    <template #appendInner> <va-icon name="send" /></template
                ></va-input>
            </div>
        </div>
    </footer>
</template>

<script setup>
const input = reactive({ email: '' });
const config = useRuntimeConfig();
const { init } = useToast();

const handleNewsletter = () => {
    const responseNewsletter = useFetch(`${config.API_BASE_URL}/newsletter/subscribe`, {
        method: 'POST',
        body: {
            email: input.email,
        },
        initialCache: false,
        async onResponseError({ response }) {
            init({
                title: 'Prijavlijvanje na newsletter',
                position: 'bottom-right',
                color: 'danger',
                message: 'Greška prilikom prijavljivanja na newsletter!',
            });
        },
        async onResponse({ request, response, options }) {
            if (response.status === 200) {
                init({
                    title: 'Prijavlijvanje na newsletter',
                    position: 'bottom-right',
                    color: 'success',
                    message: 'Uspješno ste prijavljeni na FreeBirdMusic newsletter!',
                });
            }
        },
    });
};
</script>

<style scoped>
a {
    font-size: 18px;
    position: relative;
    display: inline-block;
}

h2 {
    position: relative;
    display: inline-block;
}

h2::after {
    content: '';
    position: absolute;
    height: 2px;
    bottom: -5px;
    width: 90%;
    background: #f97316;
    left: 0;
}

a::after {
    content: '';
    position: absolute;
    width: 100%;
    transform: scaleX(0);
    height: 2px;
    bottom: -2px;
    left: 0;
    background-color: #f97316;
    transform-origin: bottom right;
    transition: transform 0.25s ease-out;
}

a:hover::after {
    transform: scaleX(1);
    transform-origin: bottom left;
}

h2 {
    font-size: 22px;
    margin-bottom: 0.5rem;
}

img {
    height: 40px;
    width: 40px;
}
</style>
