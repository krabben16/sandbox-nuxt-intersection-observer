<template>
  <p>
    <nuxt-link
      to="/"
      class="btn my-2"
      :class="{ 'btn-primary': path === '/', 'btn-secondary': path !== '/' }"
    >
      No lazy loading
    </nuxt-link>
    <nuxt-link
      to="/observer"
      class="btn my-2"
      :class="{
        'btn-primary': path === '/observer',
        'btn-secondary': path !== '/observer',
      }"
    >
      Intersection Observer
    </nuxt-link>
    <nuxt-link
      to="/image"
      class="btn my-2"
      :class="{
        'btn-primary': path === '/image',
        'btn-secondary': path !== '/image',
      }"
    >
      @nuxt/image
    </nuxt-link>
  </p>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    path: {
      type: String,
      required: true,
    },
  },
})
</script>
