

<template>
    <button 
      ref="elBtn" 
      type="button" 
      class="ui-btn" 
      :class="typeClass" 
      :disabled="disabled" 
      @focus="focusIn" 
      @blur="focusOut" 
      @click="clickEvt"
    >
        <slot />
        <i
            v-if="isClick"
            ref="clickIn"
            :style="{ width: `${btnInW}px`, height: `${btnInH}px`, left: `${btnInX}px`, top: `${btnInY}px` }"
            class="btn-click-in"
            @animationend.once="isClick = false"
        />
    </button>
</template>

<script>
import { ref, onMounted, onBeforeUnmount, computed, watchEffect } from 'vue'
 
export default {
  props: {
    disabled: { type: Boolean, default: false },
    primary: { type: Boolean, default: false },
    sxs: { type: Boolean, default: false },
    ss: { type: Boolean, default: false },
    sl: { type: Boolean, default: false },
    sxl: { type: Boolean, default: false },
    noRipple: { type: Boolean, default: false }
  },
  setup(props) {
    const elBtn = ref()
    const isClick = ref(false)
    const btnInW = ref()
    const btnInH = ref()
    const btnInX = ref()
    const btnInY = ref()
    const typeClass = computed(() => {
      let rtnAry = [
        {
            primary: props.primary,
            sxs: props.sxs,
            ss: props.ss,
            sl: props.sl,
            sxl: props.sxl,
            'btn-clicking-active': isClick.value
        }
      ]
      return rtnAry
    })

    const focusIn = () => {
        
    }

    const focusOut = () => {
        
    }

    const clickEvt = (e) => {
        if (!isClick.value && !props.noRipple) pulseEffect(e)
    }

    const pulseEffect = (e) => {
        if (isClick.value) return
        isClick.value = true
        const $btnMax = Math.max(elBtn.value.offsetWidth, elBtn.value.offsetHeight)
        btnInW.value = $btnMax
        btnInH.value = $btnMax
        btnInX.value = e.clientX - elBtn.value.getBoundingClientRect().left - $btnMax / 2
        btnInY.value = e.clientY - elBtn.value.getBoundingClientRect().top - $btnMax / 2
    }
 
    onMounted(() => {
      
    })
 
    return {
        elBtn,
        isClick,
        btnInW,
        btnInH,
        btnInX,
        btnInY,
        typeClass,
        focusIn,
        focusOut,
        clickEvt,
        pulseEffect
    }
  }
}
</script>