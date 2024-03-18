
<template>
  <component :is="$route.meta.layout || defaultLayout">
    <router-view></router-view>
  </component>
</template>

<script>
import Front from '@/layout/Index.vue'
import modalContainer from '@/components/modalContainer/modalContainer.vue'

export default {
  components: {
    Front,
    modalContainer
  },
  computed: {
    defaultLayout() {
      return Front
    }
  }
}
</script>
