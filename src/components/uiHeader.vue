<template>
  <header class="page-head">
    <div>
      <button 
        type="button"
        class="btn-back"
        @click="backEvt"
      >
        <span class="offscreen">이전화면</span>
      </button>
      <h1>{{ title }}</h1>
      <button 
        type="button"
        class="btn-alram"
        @click="alramEvt"
      >
        <span class="offscreen">알람</span>
      </button>
    </div>
  </header>
</template>

<script>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

export default {
  setup() {
    const currentRoute = useRoute()
    const title = ref(currentRoute.name)

    const backEvt = () => {
        window.history.back();
    }

    const alramEvt = () => {
        alert('alram')
    }

    watch(
      () => currentRoute.name,
      (newRouteName) => {
        title.value = newRouteName
      }
    )

    return {
      title,
      backEvt,
      alramEvt
    }
  }
}
</script>
