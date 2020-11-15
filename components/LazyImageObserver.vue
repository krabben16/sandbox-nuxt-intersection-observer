<script lang="ts">
import { defineComponent, onMounted, onUnmounted, ref } from '@nuxtjs/composition-api'

interface Props {
  threshold?: number,
}

export default defineComponent({
  props: {
    threshold: {
      type: Number as () => number,
      required: false,
      default: () => 0.3,
    }
  },
  setup(props: Props, { slots }) {
    const observerRef = ref<IntersectionObserver>()

    onMounted(() => {
      const slotsDefault = slots.default()
      if(slotsDefault.length === 0) {
        // no child elements
        return
      }

      const targetElement = slotsDefault[0].elm
      if (!targetElement) {
        // ?
        return
      }

      function callback(entries: IntersectionObserverEntry[], observer: IntersectionObserver) {
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
        threshold: props.threshold,
      }

      const observer = new IntersectionObserver(callback, options)
      observer.observe(targetElement as Element)

      observerRef.value = observer
    })

    onUnmounted(() => {
      if (!observerRef.value) return
      observerRef.value.disconnect()
    })
  },
  render(createElement) {
    if (!this.$slots.default || this.$slots.default.length === 0) {
      return createElement('div')
    }

    // render first child element
    return this.$slots.default[0]
  }
})
</script>
