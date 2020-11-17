<template>
  <Observer
    :threshold="[0.2, 0.8]"
    @enter="onEnter"
    @leave="onLeave"
    @change="onChange"
  >
    <img
      ref="lazyImageRef"
      src="/images/dummy.png"
      :data-src="src"
      :height="height"
      :width="width"
      :alt="alt"
      :title="title"
    />
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
      type: String,
      required: false,
    },
    width: {
      type: String,
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
    onEnter() {
      if (!this.lazyImageRef) return
      console.log('onEnter')

      if (this.lazyImageRef.dataset.src) {
        this.lazyImageRef.src = this.lazyImageRef.dataset.src
        delete this.lazyImageRef.dataset.src
      }
    },
    onLeave() {
      console.log('onLeave')
    },
    onChange() {
      console.log('onChange')
    },
  },
})
</script>
