<template>
  <section class="bg-primary text-center">
    <div class="my-24 mb-14 h-0.5 w-full mx-auto bg-orange sm:w-11/12" />
    <div class="relative">
      <h2 class="text-5xl mb-4 sm:mb-0 sm:text-6xl">Novosti</h2>
      <nuxt-link to="/blogPosts">
        <va-button
          class="sm:mt-0 sm:!absolute sm:top-0 sm:translate-y-1/2 sm:right-40"
          text-color="#fff"
          color="#f97316"
          >Sve Novosti &rarr;</va-button
        >
      </nuxt-link>
      <h3 class="mt-4 text-l sm:text-3xl">
        Budite u toku sa svim obavijestima u FreeBird Music Shopu
      </h3>
      <div
        class="gap-7 mx-auto grid grid-cols-1 grid-rows-3 my-5 sm:grid-rows-1 sm:grid-cols-3 w-9/12"
      >
        <post-component
          v-for="(post, index) in posts.postCollection"
          :key="index"
          :postTitle="post.heading"
          :postDescription="post.subheading"
          :image="post?.images[0]?.url"
          :postId="post.id"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
const posts = reactive({ postCollection: [] });

const config = useRuntimeConfig();

const fetchItems = async () => {
  try {
    const response = await $fetch(`${config.public.API_BASE_URL}/posts/latest`);
    posts.postCollection = response?.data || [];
  } catch (error) {
    console.log(error);
  }
};

await fetchItems();
</script>
