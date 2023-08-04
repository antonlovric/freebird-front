<template>
  <va-card class="inline-flex flex-col !bg-primary">
    <img :src="props.imageSource" style="width: 250px; height: 250px" :alt="props.productName" />
    <div class="text-white mt-2 text-xl bg-[#17191e]">{{ props.productName }}</div>
    <va-card-actions align="center" class="bg-primary shadow-none">
      <nuxt-link :to="props.productLink">
        <va-button class="justify-center" color="#f97316" text-color="#fff"
          >Vidi Detalje</va-button
        ></nuxt-link
      >
    </va-card-actions>
  </va-card>
</template>

<script setup>
const props = defineProps({
  imageSource: {
    type: String,
    default: '',
  },
  productLink: {
    type: String,
    default: '/',
  },
  productName: {
    type: String,
    default: '/',
  },
});
</script>
