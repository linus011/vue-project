<template>
  <div id="wrap">
    <ui-header />
    <main id="container">
      <section class="contents">
        <slot />
      </section>
    </main>
  </div>
</template>

<script>
import '@/assets/front/scss/front.scss'
import uiHeader from '@/components/uiHeader.vue'

export default {
  components: {
    uiHeader
  }
}
</script>