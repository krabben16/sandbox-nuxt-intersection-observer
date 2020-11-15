<template>
  <img ref="imgRef" src="/images/dummy.png" :data-src="src" :height="height" :width="width" :alt="alt" :title="title" />
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, ref } from '@nuxtjs/composition-api'
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
    const observerRef = ref<IntersectionObserver>()
    const imgRef = ref<Element>()

    onMounted(() => {
      if (!imgRef.value) return

      function callback(entries: IntersectionObserverEntry[], observer: IntersectionObserver) {
        const entry = entries[0]
        if (!entry.isIntersecting) return

        const img = entry.target as HTMLImageElement
        if (img.dataset.src) {
          img.src = img.dataset.src
          delete img.dataset.src
        }

        observer.unobserve(img)
        console.info('unobserve', img.src)
      }

      const options: IntersectionObserverInit = {
        threshold: 0.3,
      }

      const observer = new IntersectionObserver(callback, options)
      observer.observe(imgRef.value)

      observerRef.value = observer
    })

    onUnmounted(() => {
      observerRef.value?.disconnect()
    })

    return {
      imgRef,
    }
  },
})
</script>
