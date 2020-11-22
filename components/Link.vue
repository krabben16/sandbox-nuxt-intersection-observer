<template>
  <p>
    <nuxt-link
      to="/"
      class="btn my-2"
      :class="{ 'btn-primary': isRoot, 'btn-secondary': !isRoot }"
    >
      No lazy loading
    </nuxt-link>
    <nuxt-link
      to="/observer"
      class="btn my-2"
      :class="{
        'btn-primary': isObserver,
        'btn-secondary': !isObserver,
      }"
    >
      Intersection Observer
    </nuxt-link>
    <nuxt-link
      to="/image"
      class="btn my-2"
      :class="{
        'btn-primary': isImage,
        'btn-secondary': !isImage,
      }"
    >
      @nuxt/image
    </nuxt-link>
  </p>
</template>

<script lang="ts">
import { computed, defineComponent, useContext } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    pageType: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const { $pageType } = useContext()

    return {
      isRoot: computed(() => props.pageType === $pageType.root),
      isObserver: computed(() => props.pageType === $pageType.observer),
      isImage: computed(() => props.pageType === $pageType.image),
    }
  },
})
</script>
