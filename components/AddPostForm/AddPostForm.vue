<template>
    <div class="min-h-[80vh] pt-[10vh] relative">
        <h1 class="text-3xl mb-4 sm:mb-0 sm:text-5xl sm:mt-4 text-center">Dodavanje Proizvoda</h1>
        <form
            enctype="multipart/form-data"
            id="form"
            class="flex flex-col justify-center items-center sm:w-1/5 w-3/4 mx-auto gap-6 mb-5"
            @submit.prevent
        >
            <va-input class="w-8/12" v-model="postData.heading" label="Naslov" />
            <va-input label="Podnaslov" v-model="postData.subheading" />
            <va-input label="Sadržaj" type="textarea" :min-rows="6" v-model="postData.body" />
            <va-file-upload
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
            <va-button
                :disabled="images.imageCollection.length === 0 || images.displayImageId === null"
                :click="submitHandler"
                >Kreiraj Objavu</va-button
            >
        </form>
    </div>
</template>

<script setup>
import { useUserStore } from '~~/stores/user';

const userData = useUserStore();
const router = useRouter();
const file = ref(null);
const displayImage = ref(null);
const config = useRuntimeConfig();
const postData = ref({ image: '', displayImage: '', heading: '', subheading: '', body: '' });
const images = reactive({ imageCollection: [], displayImageId: null });
const { init, close } = useToast();

const getImageIds = () => {
    const imageIds = images.imageCollection.map((image) => image.id);
    imageIds.push(images.displayImageId);
    return imageIds;
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
                setTimeout(() => {
                    router.push({ path: '/dashboard' });
                }, 500);
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
.va-input {
    min-width: 200px;
}
</style>
