<template>
  <div class="container">
    <div>
      <h1 class="title">test-nuxt-intersection-observer</h1>
      <nuxt-link to="/about"><h2 class="subtitle">/about</h2></nuxt-link>
      <template v-for="(v, k) in images">
       <LazyImage :key="k" :src="v.src" :height="v.height" :width="v.width" :alt="v.alt" />
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import images from '~/tools/list.js'

export default defineComponent({
  setup() {
    return {
      images
    }
  }
})
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}
</style>
