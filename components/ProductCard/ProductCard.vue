<template>
  <va-card>
    <div class="relative">
      <span class="absolute inline-flex flex-wrap gap-2 z-10 left-2 top-1">
        <va-chip size="small" v-for="(tag, index) in props?.tags" :key="index">{{
          tag.name
        }}</va-chip>
      </span>
      <nuxt-link :to="`/products/${props.productId}`">
        <va-image v-on:mouseenter="handleHover" class="product-image" :src="props.imgSrc"
      /></nuxt-link>
    </div>
    <va-card-content class="px-2 py-1">
      <div class="inline-flex items-center justify-between w-full mt-1">
        <nuxt-link :to="`/products/${props.productId}`">{{ props.productTitle }}</nuxt-link>
        <span class="cursor-pointer"
          ><va-icon @click="handleAddToCart" name="shopping_cart"
        /></span>
      </div>
    </va-card-content>
    <va-card-content class="px-2 py-1 pb-3">
      <div class="inline-flex items-center justify-between mt-2">
        <span v-if="props.discount === 0">{{ props.initialPrice }}kn</span>
        <span v-else>
          <span class="line-through mr-2">{{ props.initialPrice }}kn</span>
          <span class="text-red">{{ discountedPrice() }}kn</span>
        </span>
      </div>
    </va-card-content>
  </va-card>
</template>

<script setup>
import { useCartStore } from '~~/stores/cart';
import { useUserStore } from '~~/stores/user';

const config = useRuntimeConfig();
const { init } = useToast();
const userData = useUserStore();
const cartData = useCartStore();
const cartCookie = useCookie('cart_id');

const props = defineProps({
  imgSrc: {
    type: String,
    default: '',
  },
  imgAlt: {
    type: String,
    default: '',
  },
  productTitle: {
    type: String,
    default: '',
  },
  initialPrice: {
    type: String,
    default: '',
  },
  mediaCondition: {
    type: Object,
    default: {
      id: Number,
      name: String,
    },
  },
  sleeveCondition: {
    type: Object,
    default: {
      id: Number,
      name: String,
    },
  },
  productType: {
    type: Object,
    default: {
      id: Number,
      name: String,
    },
  },
  productId: {
    type: Number,
    default: 0,
  },
  discount: {
    type: Number,
    default: 0,
  },
  tags: {
    type: Array,
    default: [],
  },
});

const discountedPrice = () => props.initialPrice - (props.discount / 100) * props.initialPrice;

const addCartItem = async () => {
  if (!userData.token) {
    cartData.addItem({
      id: props.productId,
      title: props.productTitle,
      quantity: 1,
      url: props.imgSrc,
      price: discountedPrice(),
      media_condition: {
        id: props.mediaCondition.id,
        name: props.mediaCondition.name,
      },
      sleeve_condition: {
        id: props.sleeveCondition.id,
        name: props.sleeveCondition.name,
      },
      product_type: {
        id: props.productType.id,
        name: props.productType.name,
      },
      discount: props.discount,
    });
    init({
      title: 'Dodavanje Proizvoda',
      position: 'bottom-right',
      message: 'Proizvod uspješno dodan u košaricu!',
      color: 'success',
    });
  } else {
    const responseCartItem = await useFetch(`${config.public.API_BASE_URL}/cartItems`, {
      method: 'POST',
      body: {
        cart_id: cartCookie.value,
        quantity: 1,
        product_id: props.productId,
        price: discountedPrice(),
      },
      initialCache: false,
      async onResponseError({ response }) {
        init({
          title: 'Dodavanje Proizvoda',
          position: 'bottom-right',
          message: 'Greška prilikom dodavanja proizvoda u košaricu!',
          color: 'warning',
        });
      },
      async onResponse({ request, options, response }) {
        init({
          title: 'Dodavanje Proizvoda',
          position: 'bottom-right',
          message: 'Proizvod uspješno dodan u košaricu!',
          color: 'success',
        });
        cartData.addItem({
          id: props.productId,
          title: props.productTitle,
          quantity: 1,
          url: props.imgSrc,
          price: discountedPrice(),
          media_condition: {
            id: props.mediaCondition.id,
            name: props.mediaCondition.name,
          },
          sleeve_condition: {
            id: props.sleeveCondition.id,
            name: props.sleeveCondition.name,
          },
          product_type: {
            id: props.productType.id,
            name: props.productType.name,
          },
          discount: props.discount,
        });
      },
    });
  }
};

const handleAddToCart = async () => {
  if (!userData.token) addCartItem();
  else {
    const responseCart = await useFetch(`${config.public.API_BASE_URL}/carts`, {
      method: 'POST',
      body: {
        session_id: userData.session_id,
      },
      initialCache: false,
      async onResponseError({ response }) {
        init({
          title: 'Dodavanje Proizvoda',
          position: 'bottom-right',
          message: 'Greška prilikom dodavanja proizvoda u košaricu!',
          color: 'warning',
        });
      },
      async onResponse({ request, options, response }) {
        cartCookie.value = response._data?.id;
        addCartItem();
      },
    });
  }
};
</script>

<style scoped>
img,
.product-image {
  height: 250px;
  width: 250px;
  object-fit: cover;
}
</style>
