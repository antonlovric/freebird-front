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
          {{ props.product ? 'Ažuriranje Proizvoda' : 'Dodavanje Proizvoda' }}
        </h3>
      </template>
      <form
        enctype="multipart/form-data"
        id="form"
        class="flex flex-col w-3/4 sm:w-full mx-auto gap-6 mb-5"
        @submit.prevent
      >
        <va-input v-model="productData.title" color="#000" label="Naslov" type="text" id="title" />
        <va-input
          v-model="productData.description"
          color="#000"
          label="Opis"
          type="textarea"
          :min-rows="5"
          id="description"
        />
        <va-select
          v-model="productData.sleeve_condition"
          color="#000"
          label="Stanje Omota"
          id="sleeve-condition"
          searchable
          :options="props.predefinedData.conditions"
          text-by="name"
          track-by="id"
          value-by="id"
        />
        <va-select
          v-model="productData.media_condition"
          color="#000"
          label="Stanje Medija"
          id="media-condition"
          searchable
          :options="props.predefinedData.conditions"
          text-by="name"
          track-by="id"
          value-by="id"
        />
        <va-input v-model="productData.sku" color="#000" label="SKU" type="text" id="sku" />
        <va-input
          v-model="productData.initial_price"
          color="#000"
          label="Cijena"
          type="number"
          id="price"
        />
        <va-input
          v-model="productData.discount"
          color="#000"
          label="Popust (%)"
          :min="0"
          :max="100"
          type="number"
          id="discount"
        />
        <va-select
          v-model="productData.genre_id"
          color="#000"
          label="Žanr"
          id="genre_id"
          searchable
          :options="props.predefinedData.genres"
          text-by="name"
          track-by="id"
          value-by="id"
        />
        <va-select
          v-model="productData.product_type_id"
          color="#000"
          label="Tip proizvoda"
          id="product_type_id"
          searchable
          :options="props.predefinedData.productTypes"
          text-by="name"
          track-by="id"
          value-by="id"
        />
        <va-select
          v-model="productData.tags"
          color="#000"
          label="Oznake"
          id="product_type_id"
          searchable
          multiple
          :options="props.predefinedData.tags"
          text-by="name"
          track-by="id"
          value-by="id"
          @update:model-value="handleTagChange"
        />
        <va-input
          v-model="productData.edition"
          color="#000"
          label="Izdavač"
          type="text"
          id="edition"
        />
        <va-input
          v-model="productData.stock"
          color="#000"
          label="Zaliha"
          type="number"
          id="stock"
        />
        <va-file-upload
          v-if="!props.product"
          class="mx-auto"
          v-model="productData.image"
          id="image"
          type="gallery"
          file-types="jpg,jpeg,png,webp"
          ref="file"
        />
      </form>
      <template #footer>
        <div class="inline-flex justify-center items-center gap-5">
          <va-button v-if="props.product" @click="updateHandler">Ažuriraj</va-button>
          <va-button v-else @click="submitHandler">Kreiraj</va-button>

          <va-button @click="() => emits('close-modal')"> Odustani </va-button>
        </div>
      </template>
    </va-modal>
  </div>
</template>

<script setup>
import { useUserStore } from '~~/stores/user';

const userData = useUserStore();

const props = defineProps({
  product: Object,
  isVisible: Boolean,
  predefinedData: {
    productTypes: Array,
    conditions: Array,
    genres: Array,
    tags: Array,
  },
});

const file = ref(null);

const config = useRuntimeConfig();
const predefinedData = reactive({
  productTypes: [],
  conditions: [],
  genres: [],
  tags: [],
});

const productData = ref({
  title: props.product?.title,
  description: props.product?.description,
  sleeve_condition: props.product?.sleeve_condition?.id,
  media_condition: props.product?.media_condition?.id,
  sku: props.product?.sku,
  initial_price: props.product?.initial_price,
  discount: props.product?.discount || 0,
  rating: 0,
  product_type_id: props.product?.product_type_id,
  genre_id: props.product?.genre_id,
  edition: props.product?.edition,
  stock: props.product?.stock,
  tags: props.product?.tags,
  image: '',
});

const handleTagChange = (event) => {
  productData.value.tags = event.map((tag) => tag.id || tag);
};

const emits = defineEmits(['close-modal']);

const modal = reactive({ isVisible: props.isVisible });

const { init } = useToast();

const isValid = () => {
  const { initial_price, discount, stock } = productData.value;
  if (Object.values(productData.value).some((prop) => prop === null || prop === undefined))
    return false;
  if (discount < 0 || discount > 100 || stock < 0 || initial_price < 0) return false;
  return true;
};

const updateHandler = async () => {
  if (!isValid()) {
    init({
      title: 'Ažuriranje Proizvoda',
      position: 'top-right',
      color: 'danger',
      message: 'Neispravan unos!',
    });
    return;
  }
  init({
    title: 'Ažuriranje Proizvoda',
    position: 'top-right',
    message: 'Pričekajte...',
  });
  productData.value.tags = productData.value.tags.filter((tag) => typeof tag === 'string');
  const submitResponse = await useFetch(
    `${config.public.API_BASE_URL}/products/${props.product.id}`,
    {
      method: 'PUT',
      body: {
        title: productData.value.title,
        description: productData.value.description,
        sleeve_condition: productData.value.sleeve_condition,
        media_condition: productData.value.media_condition,
        sku: productData.value.sku,
        initial_price: productData.value.initial_price,
        rating: productData.value.rating,
        product_type_id: productData.value.product_type_id,
        genre_id: productData.value.genre_id,
        edition: productData.value.edition,
        stock: productData.value.stock,
        discount: productData.value.discount,
        tags: productData.value.tags,
      },
      headers: {
        Authorization: `Bearer ${userData.token}`,
      },
      initialCache: false,
      async onResponseError({ response }) {
        init({
          title: 'Ažuriranje Proizvoda',
          position: 'top-right',
          color: 'danger',
          message: 'Greška prilikom ažuriranje proizvoda!',
        });
        emits('close-modal');
      },
      async onResponse({ request, response, options }) {
        if (response.status === 200) {
          init({
            title: 'Kreiranje Proizvoda',
            position: 'top-right',
            color: 'success',
            message: 'Proizvod uspješno kreiran!',
          });
        }
        emits('close-modal');
      },
    }
  );
};

const submitHandler = async () => {
  if (!isValid()) {
    init({
      title: 'Kreiranje Proizvoda',
      position: 'top-right',
      color: 'danger',
      message: 'Neispravan unos!',
    });
    return;
  }

  productData.value.tags = productData.value.tags.filter((tag) => typeof tag === 'string');

  const form = document.querySelector('#form');
  const formData = new FormData(form);
  productData.value.image = file.value.files[0];

  for (const prop in productData.value) formData.append(prop, productData.value[prop]);
  init({
    title: 'Kreiranje Proizvoda',
    position: 'top-right',
    message: 'Pričekajte...',
  });
  const submitResponse = await useFetch(`${config.public.API_BASE_URL}/products`, {
    method: 'POST',
    body: formData,
    headers: {
      Authorization: `Bearer ${userData.token}`,
    },
    initialCache: false,
    async onResponseError({ response }) {
      init({
        title: 'Kreiranje Proizvoda',
        position: 'top-right',
        color: 'danger',
        message: 'Greška prilikom kreiranja proizvoda!',
      });
    },
    async onResponse({ request, response, options }) {
      if (response.status === 201) {
        init({
          title: 'Kreiranje Proizvoda',
          position: 'top-right',
          color: 'success',
          message: 'Proizvod uspješno kreiran!',
        });
        emits('close-modal');
      }
    },
  });
};
</script>
