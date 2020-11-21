<template>
  <main role="main">
    <section class="jumbotron text-center">
      <div class="container">
        <h1>test-nuxt-intersection-observer</h1>
        <Link :path="path" />
      </div>
    </section>
    <div class="album py-5 bg-light">
      <div class="container">
        <div class="row">
          <div v-for="(v, k) in images" :key="k" class="col-md-4">
            <div class="card mb-4 shadow-sm">
              <!-- <svg class="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: Thumbnail"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"></rect><text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text></svg> -->
              <img
                :alt="v.alt"
                :src="v.src"
                class="card-img-top"
                height="225"
                width="348"
              />
              <CardBody />
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent, useContext } from '@nuxtjs/composition-api'
import images from '~/imageList.js'

export default defineComponent({
  setup() {
    const { route } = useContext()

    return {
      images,
      path: route.value.path,
    }
  },
})
</script>
