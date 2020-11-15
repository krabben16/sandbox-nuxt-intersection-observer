<template>
  <img src="/images/dummy.png" :data-src="src" :height="height" :width="width" :alt="alt" />
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

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
})
</script>
