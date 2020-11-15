<template>
  <img :id="alt" src="/images/dummy.png" :data-src="src" :height="height" :width="width" :alt="alt" />
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, ref, SetupContext } from '@nuxtjs/composition-api'

interface Props {
  src: string,
  height?: number,
  width?: number,
  alt?: string,
}

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
  },
  setup(props: Props, context: SetupContext) {
    const observerRef = ref<IntersectionObserver>()

    console.log(context.slots)

    onMounted(() => {
      function callback(entries: IntersectionObserverEntry[], observer: IntersectionObserver) {
        console.log('callback')
        entries.forEach(e => {
          if (!e.isIntersecting) return
          const img = e.target as HTMLImageElement

          if (!img.dataset.src) return
          img.src = img.dataset.src
          delete img.dataset.src

          observer.unobserve(img)
        })
      }

      const options: IntersectionObserverInit = {
        threshold: 0.5,
      }

      const targetElement = document.querySelector(`[id="${props.alt}"]`)
      if (!targetElement) return

      const observer = new IntersectionObserver(callback, options)
      observer.observe(targetElement)

      observerRef.value = observer
    })

    onUnmounted(() => {
      if (!observerRef.value) return
      observerRef.value.disconnect()
    })
  }
})
</script>
