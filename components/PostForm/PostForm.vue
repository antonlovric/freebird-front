<template>
    <div class="absolute">
        <va-modal
            hide-default-actions
            v-model="modal.isVisible"
            fullscreen
            @before-close="() => emits('close-modal')"
        >
            <template #header>
                <h3 class="text-2xl mb-4 sm:mb-0 sm:text-4xl sm:mt-4 text-center">
                    {{ props.post ? 'Ažuriranje Objave' : 'Dodavanje Objave' }}
                </h3>
            </template>
            <form
                enctype="multipart/form-data"
                id="form"
                class="flex flex-col w-3/4 sm:w-full mx-auto gap-6 mb-5"
                @submit.prevent
            >
                <va-input class="w-8/12" v-model="postData.heading" label="Naslov" />
                <va-input label="Podnaslov" v-model="postData.subheading" />
                <va-input label="Sadržaj" type="textarea" :min-rows="6" v-model="postData.body" />
                <va-file-upload
                    v-if="!props.post"
                    v-model="postData.displayImage"
                    id="image"
                    type="single"
                    file-types="jpg,png,webp"
                    ref="displayImage"
                    @file-added="(files) => fileAddHandler(files, 1)"
                    @file-removed="(file) => fileRemoveHandler(file, 1)"
                    upload-button-text="Prenesi naslovnu fotografiju"
                    deleted-file-message="Naslovna fotografija uspješno obrisana"
                />
                <va-file-upload
                    v-if="!props.post"
                    v-model="postData.image"
                    id="image"
                    type="gallery"
                    file-types="jpg,png,webp"
                    ref="file"
                    @file-added="(files) => fileAddHandler(files, 0)"
                    @file-removed="(file) => fileRemoveHandler(file, 0)"
                    upload-button-text="Prenesi fotografije"
                    deleted-file-message="Fotografija uspješno obrisana"
                />
            </form>
            <template #footer>
                <div class="inline-flex justify-center items-center gap-5">
                    <va-button v-if="props.product" @click="updateHandler">Ažuriraj</va-button>
                    <va-button
                        :disabled="
                            images.imageCollection.length === 0 || images.displayImageId === null
                        "
                        v-else
                        @click="submitHandler"
                        >Kreiraj</va-button
                    >

                    <va-button @click="() => emits('close-modal')"> Odustani </va-button>
                </div>
            </template>
        </va-modal>
    </div>
</template>

<script setup>
import { useUserStore } from '~~/stores/user';

const props = defineProps({
    post: Object,
    isVisible: Boolean,
});

const userData = useUserStore();
const router = useRouter();
const file = ref(null);
const displayImage = ref(null);
const config = useRuntimeConfig();
const postData = ref({
    image: '',
    displayImage: '',
    heading: props.post?.heading || '',
    subheading: props.post?.subheading || '',
    body: props.post?.body || '',
});
const images = reactive({ imageCollection: [], displayImageId: null });
const { init, close } = useToast();

const getImageIds = () => {
    const imageIds = images.imageCollection.map((image) => image.id);
    imageIds.push(images.displayImageId);
    return imageIds;
};

const emits = defineEmits(['close-modal']);
const modal = reactive({ isVisible: props.isVisible });

const isValid = () => {
    if (Object.values(postData.value).some((prop) => prop === null || prop === undefined))
        return false;
    return true;
};

const assignImagesToPost = (postId) => {
    const responseAssign = useFetch(`${config.API_BASE_URL}/postImages/assign`, {
        method: 'POST',
        body: {
            ids: getImageIds(),
            post_id: postId,
        },
        headers: {
            Authorization: `Bearer ${userData.token}`,
        },
        initialCache: false,
        async onResponseError({ response }) {
            init({
                title: 'Dodjeljivanje fotografija objavi',
                position: 'bottom-right',
                color: 'danger',
                message: 'Greška prilikom dodjeljivanje fotagrafija objavi!',
            });
        },
        async onResponse({ request, response, options }) {
            if (response.status === 201) {
                init({
                    title: 'Kreiranje objave',
                    position: 'bottom-right',
                    color: 'success',
                    message: 'Objava uspješno kreirana!',
                });
            }
        },
    });
};

const submitHandler = () => {
    if (!isValid()) {
        init({
            title: 'Kreiranje Objave',
            position: 'bottom-right',
            color: 'danger',
            message: 'Ispunite sva polja!',
        });
        return;
    }
    init({
        title: 'Kreiranje Objave',
        position: 'bottom-right',
        message: 'Pričekajte...',
    });

    const responsePost = useFetch(`${config.API_BASE_URL}/posts`, {
        method: 'POST',
        body: {
            heading: postData.value.heading,
            subheading: postData.value.subheading,
            body: postData.value.body,
            session_id: userData.session_id,
        },
        headers: {
            Authorization: `Bearer ${userData.token}`,
        },
        initialCache: false,
        async onResponseError({ response }) {
            init({
                title: 'Kreiranje objave',
                position: 'bottom-right',
                color: 'danger',
                message: 'Greška prilikom kreiranja objave!',
            });
        },
        async onResponse({ request, response, options }) {
            if (response.status === 201) {
                assignImagesToPost(response._data.id);
                emits('close-modal');
            }
        },
    });
};

const updateHandler = () => {
    if (!isValid()) {
        init({
            title: 'Ažuriranje Objave',
            position: 'bottom-right',
            color: 'danger',
            message: 'Ispunite sva polja!',
        });
        return;
    }
    init({
        title: 'Ažuriranje Objave',
        position: 'bottom-right',
        message: 'Pričekajte...',
    });

    const responsePost = useFetch(`${config.API_BASE_URL}/posts`, {
        method: 'PUT',
        body: {
            heading: postData.value.heading,
            subheading: postData.value.subheading,
            body: postData.value.body,
            session_id: userData.session_id,
        },
        headers: {
            Authorization: `Bearer ${userData.token}`,
        },
        initialCache: false,
        async onResponseError({ response }) {
            init({
                title: 'Ažuriranje objave',
                position: 'bottom-right',
                color: 'danger',
                message: 'Greška prilikom ažuriranja objave!',
            });
        },
        async onResponse({ request, response, options }) {
            if (response.status === 201) {
                init({
                    title: 'Ažuriranje objave',
                    position: 'bottom-right',
                    color: 'success',
                    message: 'Objava uspješno ažurirana!',
                });
                emits('close-modal');
            }
        },
    });
};

const fileAddHandler = (files, isDisplay) => {
    const formData = new FormData();
    formData.append('image', files[0]);
    formData.append('is_display', isDisplay);

    init({
        title: 'Prijenos Fotografije',
        position: 'bottom-right',
        message: 'Pričekajte...',
    });

    const fileUploadResponse = useFetch(`${config.API_BASE_URL}/postImages`, {
        method: 'POST',
        body: formData,
        headers: {
            Authorization: `Bearer ${userData.token}`,
        },
        initialCache: false,
        async onResponseError({ response }) {
            errorStatus.value = response.status;
            init({
                title: 'Prijenos fotografije',
                position: 'bottom-right',
                color: 'danger',
                message: 'Greška prilikom prijenosa fotografije!',
            });
        },
        async onResponse({ request, response, options }) {
            if (response.status === 201) {
                init({
                    title: 'Prijenos fotografije',
                    position: 'bottom-right',
                    color: 'success',
                    message: 'Fotografija uspješno prenesena!',
                });
                isDisplay
                    ? (images.displayImageId = response._data.id)
                    : images.imageCollection.push(response._data);
            }
        },
    });
};
const fileRemoveHandler = (file, isDisplay) => {
    init({
        title: 'Brisanje Fotografije',
        position: 'bottom-right',
        message: 'Pričekajte...',
    });

    const fileDeleteResponse = useFetch(`${config.API_BASE_URL}/postImages/deleteImage`, {
        method: 'DELETE',
        body: { filename: file.name },
        headers: {
            Authorization: `Bearer ${userData.token}`,
        },
        initialCache: false,
        async onResponseError({ response }) {
            errorStatus.value = response.status;
            init({
                title: 'Brisanje fotografije',
                position: 'bottom-right',
                color: 'danger',
                message: 'Greška prilikom brisanja fotografije!',
            });
        },
        async onResponse({ request, response, options }) {
            if (response.status === 200) {
                init({
                    title: 'Brisanje fotografije',
                    position: 'bottom-right',
                    color: 'success',
                    message: 'Fotografija uspješno izbrisana!',
                });
                if (isDisplay === 1) {
                    images.displayImageId = null;
                } else {
                    images.imageCollection = images.imageCollection.filter(
                        (image) => image.name !== file.name
                    );
                }
            }
        },
    });
};
</script>

<style>
div {
    --va-data-table-thead-color: #fff;
}
</style>
