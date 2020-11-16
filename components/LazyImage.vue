<template>
  <Observer @enter="showImage">
    <img ref="lazyImageRef" src="/images/dummy.png" :data-src="src" :height="height" :width="width" :alt="alt" :title="title" />
  </Observer>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
// TODO: Polyfill

export default defineComponent({
  props: {
    src: {
      type: String,
      required: true,
    },
    height: {
      type: Number,
      required: false,
    },
    width: {
      type: Number,
      required: false,
    },
    alt: {
      type: String,
      required: false,
    },
    title: {
      type: String,
      required: false,
    },
  },
  setup() {
    const lazyImageRef = ref<HTMLImageElement>()
    return {
      lazyImageRef,
    }
  },
  methods: {
    showImage() {
      if (!this.lazyImageRef) return

      if (this.lazyImageRef.dataset.src) {
        this.lazyImageRef.src = this.lazyImageRef.dataset.src
        delete this.lazyImageRef.dataset.src
      }
    }
  }
})
</script>
