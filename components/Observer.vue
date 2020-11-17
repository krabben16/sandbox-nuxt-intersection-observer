<script lang="ts">
import {
  defineComponent,
  onMounted,
  onUnmounted,
  ref,
} from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    threshold: {
      type: Array as () => number[],
      required: false,
      default: () => [0.2],
    },
    root: {
      type: Object as () => HTMLElement,
      required: false,
      default: () => null,
    },
    rootMargin: {
      type: String,
      required: false,
      default: () => '0px 0px 0px 0px',
    },
  },
  setup(props, { slots, emit }) {
    const observerRef = ref<IntersectionObserver>()

    onMounted(() => {
      if (!slots || !Object.keys(slots).includes('default')) {
        return
      }

      const nodeList = slots.default()
      if (nodeList.length === 0 || !nodeList[0].elm) {
        return
      }

      const callback = function (entries: IntersectionObserverEntry[]) {
        const entry = entries[0]
        if (!entry.isIntersecting) {
          emit('leave', [entry])
        } else {
          emit('enter', [entry])
        }
        emit('change', [entry])
      }

      const options: IntersectionObserverInit = {
        threshold: props.threshold,
        root: props.root,
        rootMargin: props.rootMargin,
      }

      const observer = new IntersectionObserver(callback, options)
      observer.observe(nodeList[0].elm as Element)

      observerRef.value = observer
    })

    onUnmounted(() => {
      observerRef.value?.disconnect()
    })
  },
  render(createElement) {
    if (!this.$slots || !Object.keys(this.$slots).includes('default')) {
      return createElement('div')
    }

    const nodeList = this.$slots.default
    if (!nodeList || nodeList.length === 0) {
      return createElement('div')
    }

    return nodeList[0]
  },
})
</script>
