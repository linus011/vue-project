<template>
  <Teleport to="#app">
    <div 
      ref="modalEl" 
      v-if="isOpen" 
      class="ui-popup" 
      :class="typeClass"
      role="dialog"
      tabindex="-1"
      aria-modal="true"
    >
      <div class="pop-wrap">
        <div class="pop-head">
          <h1>{{ title }}</h1>
          <button type="button" class="pop-close"
              @click="popClose"
          >
            <span class="offscreen">팝업닫기</span>
          </button>
        </div>
        <div class="pop-body">
          <slot />
        </div>
        <div v-if="$slots['foot']" class="pop-foot">
          <div>
            <slot name="foot" />
          </div>
        </div>
      </div>
      <div v-if="!full" class="dimmed" @click="popClose"></div>
    </div>
  </Teleport>
</template>

<script>
import { ref, onMounted, onUnmounted, computed, watchEffect, watch, nextTick } from 'vue'
 
export default {
  props: {
    modelValue: { type: Boolean, default: false },
    title: { type: String, default: null },
    full: { type: Boolean, default: false },
    bottom: { type: Boolean, default: false },
    modal: { type: Boolean, default: false }
  },
  emits: ['update:modelValue', 'close'],
  setup(props, context) {
    const { emit } = context
 
    const typeClass = computed(() => {
      let rtnAry = [
        {
          full: props.full,
          bottom: props.bottom,
          modal: props.modal
        }
      ]
      return rtnAry
    })
    
    const modalEl = ref()
    const isOpen = ref(false)
    let activeElement
 
    const popClose = () => {
      if(modalEl.value) modalEl.value.classList.remove('open')
      
      setTimeout(() => {
        emit('update:modelValue', false)
        emit('close')
        isOpen.value = props.modelValue
        setFocus(false)
      }, 100)
    }

    const setFocus = (value) => {
      if (value) {
        if (modalEl.value) {
          modalEl.value.focus();
          modalEl.value.classList.add('open')
        }
      } else {
        if (activeElement) {
          activeElement.focus();
        }
      }
    }

    let activeElements = [];

    // const setLastActiveElement = (event) => {
    //   const isModalEvent = event.target.closest('.ui-popup')
    //   if (!isModalEvent) {
    //     activeElements.forEach(({ modalEl, activeElement }) => {
    //       if (modalEl && modalEl !== event.target) {
    //         modalEl.classList.remove('open');
    //       }
    //       if (activeElement) {
    //         activeElement.focus();
    //       }
    //     })
    //     activeElements = [];
    //     return;
    //   }
  
    //   const modalEl = isModalEvent;
    //   const isOpen = modalEl.classList.contains('open');
  
    //   if (isOpen) {
    //     activeElements.push({ modalEl, activeElement })
    //     modalEl.focus()
    //     modalEl.classList.add('open')
    //   } else {
    //     const index = activeElements.findIndex((item) => item.modalEl === modalEl);
    //     if (index !== -1) {
    //       activeElements.splice(index, 1);
    //     }
    //   }
    //   activeElements.forEach(({ modalEl, activeElement }) => {
    //     if (activeElement) {
    //       activeElement.focus();
    //     }
    //   });
    // }

    const setLastActiveElement = (event) => {
      const isModalEvent = event.target.closest('.ui-popup')
      if (!isModalEvent || isModalEvent !== modalEl.value) {
        if (isModalEvent && !isModalEvent.classList.contains('.ui-popup')) {
          return;
        }
        activeElement = event.target
      }
    }
 
    watchEffect(() => {
      if(props.modelValue) {
        isOpen.value = props.modelValue
      } else {
        popClose()
      }
      
    })

    const saveLastActiveElement = () => {
      activeElement = document.activeElement
    }

    onMounted(() => {
      document.addEventListener('click', setLastActiveElement);
      watch(
        () => isOpen.value,
        (value) => {
          nextTick(() => {
            if (value) {
              saveLastActiveElement();
            }
            setFocus(value);
          });
        }
      )
    })

    onUnmounted(() => {
      document.removeEventListener('click', setLastActiveElement);
      activeElement = null;
    })
 
    return {
      typeClass,
      modalEl,
      isOpen,
      popClose,
      setFocus,
      setLastActiveElement,
      saveLastActiveElement
    }
  }
}
</script>
