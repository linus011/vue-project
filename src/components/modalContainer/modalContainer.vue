<!-- ModalContainer.vue -->
<template>
  <div>
    <div v-for="(modal, index) in modals" :key="index">
      <!-- 모달 컴포넌트 렌더링 -->
      <component
        :is="modal.component"
        :data="modal.data"
        @close="closeModal(index)"
      />
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
 
    let modals = ref([])

    const openModal = (component, data) => {
      return new Promise((resolve, reject) => {
        modals.value.push({
          component,
          data,
          resolve,
          reject
        })
      })
    }

    const closeModal = (index) => {
      const modal = modals.value[index]
      if (modal) {
        // 모달이 닫힐 때 resolve 또는 reject 호출
        if (modal.resolve) {
          modal.resolve()
        } else if (modal.reject) {
          modal.reject()
        }
        // 모달 배열에서 제거
        modals.value.splice(index, 1)
      }
    }
 
    return {
      modals,
      openModal,
      closeModal

    }
  }
}
</script>