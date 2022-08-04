<template>
    <div>
        <the-header />
        <user-profile
            v-if="!responseDetails.error.value"
            :personalDetails="responseDetails.data.value"
        />
        <the-footer />
    </div>
</template>

<script setup>
import { useUserStore } from '~~/stores/user';

const userData = useUserStore();
const config = useRuntimeConfig();

const responseDetails = await useAsyncData('personal_details', () =>
    useFetch(`${config.API_BASE_URL}/users/session`, {
        params: {
            session_id: userData.session_id,
        },
        headers: {
            Authorization: `Bearer ${userData.token}`,
        },
        pick: [
            'username',
            'orders',
            'city',
            'country',
            'zipcode',
            'first_name',
            'last_name',
            'phone',
            'carts',
        ],
    })
);
</script>
