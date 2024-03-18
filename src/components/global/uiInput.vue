<template>
  <div class="input" :class="inputClass">
    <label ref="labelEl" v-if="label != null" :for="id">{{ label }}</label>
    <input
      ref="inputEl"
      :type="type"
      :id="id"
      :disabled="disabled"
      :readonly="readonly"
      @input="inputEvt"
      @focus="focusIn"
      @blur="focusOut"
      v-model="currentVal"
    />
    <span class="line" :style="{ width: `${labelWidth}px` }"></span>
    <transition>
      <button
        v-if="currentVal.length && isFocus"
        type="button"
        class="btn-clear"
        @click="resetValue"
      >
        <span class="offscreen">입력초기화</span>
      </button>
    </transition>
    <span class="unit">{{ unit }}</span>
    <button 
      v-if="date" 
      type="button" 
      class="btn-datepicker"
      @click="dateBottomSheet = true"
    >
      <span class="offscreen">달력열기</span>
    </button>
  </div>
  <ul v-if="isEmail" class="input-select-list">
    <li v-for="(mail, i) of mailList" :key="i">
      <button type="button" class="input-select-list-btn" role="option" @click="emailSet">
        <span>{{ currentVal }}</span>@{{ mail }}
      </button>
    </li>
  </ul>
  <ui-pop v-model="dateBottomSheet" title="날짜선택" bottom @close="dateBottomSheet = false">
      <ui-select-date
          :isVal = "currentVal"
          :yr = yr
          :mo = mo
          :dy = dy
          :hr = hr
          :min = min
          @dateState = 'getDateEvt' 
      />
      <template #foot>
          <div class="flex full">
              <ui-button sl primary @click="dateBottomSheet = false, dateValueSet()">확인</ui-button>
          </div>
      </template>
  </ui-pop>
  </template>
   
  <script>
  import { ref, reactive, computed, onMounted, watch } from 'vue'
  import uiSelectDate from '@/components/global/uiSelectDate.vue'
   
  export default {
    components: {
        uiSelectDate
    },
    props: {
      label: { type: String, default: null },
      id: { type: String, default: null },
      unit: { type: String, default: null },
      type: { type: String, default: 'text' },
      class: { type: [String, Array], default: null },
      value: { type: [String, Number], default: '' },
      modelValue: { type: [String, Number, Boolean, Array, Object], default: null },
      disabled: { type: Boolean, default: false },
      readonly: { type: Boolean, default: false },
      email: { type: Boolean, default: false },
      date: { type: Boolean, default: false },
      align: { type: String, default: null },
      left: { type: Boolean, default: false },
      center: { type: Boolean, default: false },
      right: { type: Boolean, default: false },
      yr: { type: Boolean, default: false },
      mo: { type: Boolean, default: false },
      dy: { type: Boolean, default: false },
      hr: { type: Boolean, default: false },
      min: { type: Boolean, default: false }
    },
    emits: ['update:modelValue', ''],
    setup(props, context) {
      const { emit } = context

      const inputEl = ref(null)
      const isFocus = ref(false)
      const isValue = ref(false)
      const isEmail = ref(false)
      const labelEl = ref(null)
      const labelWidth = ref('')
      let nowValue = ref('')
      let currentVal = ref('')
      const mailList = reactive([
        'naver.com',
        'gmail.com',
        'nate.com',
        'yahoo.co.kr',
        'hanmail.net',
        'daum.net'
      ])
   
      const alignArray = ['left', 'center', 'right']
      const matchingAlign = alignArray.find((align) => props[align])
      const align = computed(() => {
        if (props.align && alignArray.includes(props.align)) {
          return props.align
        } else if (matchingAlign) {
          return matchingAlign
        }
        return null
      })
   
      const inputClass = computed(() => {
        let rtnAry = [
          {
            focus: isFocus.value,
            on: currentVal.value,
            readonly: props.readonly,
            disabled: props.disabled,
            email: props.email,
            date: props.date
          }
        ]
        if (align.value) rtnAry.push(align.value)
        return rtnAry
      })
   
      const focusIn = (e) => {
        isFocus.value = true
        isValue.value = true
        labelWidth.value = labelEl.value.offsetWidth
      }
   
      const focusOut = (e) => {
        isFocus.value = false
        nowValue = e.target.value
        if (nowValue.length === 0 || nowValue.length == undefined) {
          labelWidth.value = 0
          isValue.value = false
        } else {
          isValue.value = true
        }
        setTimeout(() => {
          isEmail.value = false
        }, 200)
      }
   
      const inputEvt = (e) => {
        nowValue = e.target.value
        emit('update:modelValue', nowValue)
        props.email && nowValue.length > 0 && !nowValue.includes('@')
          ? (isEmail.value = true)
          : (isEmail.value = false)
      }
   
      const emailSet = (e) => {
        const emailTxt = e.target.textContent
        currentVal.value = emailTxt
        isEmail.value = false
        inputEl.value.focus()
        emit('update:modelValue', currentVal.value)
      }
   
      const resetValue = (e) => {
        emit('update:modelValue', '')
        currentVal.value = ''
        labelWidth.value = 0
      }

      const dateBottomSheet = ref(false)
      const yearVal = ref()
      const monthVal = ref()
      const dayVal = ref()
      const hourVal = ref()
      const minuteVal = ref()

      const getDateEvt = (yr, mo, dy, hr, min) => {
          yearVal.value = yr
          monthVal.value = mo < 10 ? '0' + mo : mo
          dayVal.value = dy < 10 ? '0' + dy : dy
          hourVal.value = hr < 10 ? '0' + hr : hr
          minuteVal.value = min < 10 ? '0' + min : min
      }

      const dateValueSet = () => {
          const yr = yearVal.value
          const mo = monthVal.value
          const dy = dayVal.value
          const hr = hourVal.value
          const min = minuteVal.value
          const isYear = (yr == undefined)
          const isMonth = (mo == undefined)
          const isDay = (dy == undefined)
          const isHour = (hr == undefined)
          const isMinute = (min == undefined)

          if(!isYear && isMonth && isDay && isHour && isMinute) {
              currentVal.value = yr
          } else if(isYear && !isMonth && isDay && isHour && isMinute) {
              currentVal.value = mo
          } else if(isYear && isMonth && !isDay && isHour && isMinute) {
              currentVal.value = dy
          } else if(isYear && isMonth && isDay && !isHour && isMinute) {
              currentVal.value = hr
          } else if(isYear && isMonth && isDay && isHour && !isMinute) {
              currentVal.value = min
          } else if(!isYear && !isMonth && !isDay && !isHour && !isMinute) {
              currentVal.value = `${yearVal.value}-${mo}-${dy} ${hr}:${min}`
          } else if(!isYear && !isMonth && !isDay && isHour && isMinute) {
              currentVal.value = `${yr}-${mo}-${dy}`
          } else if(isYear && isMonth && isDay && !isHour && !isMinute) {
              currentVal.value = `${hr}:${min}`
          }
      }

      watch(() => currentVal.value, (newVal, oldVal) => {
          emit('update:modelValue', newVal)
      })
   
      onMounted(() => {})
      return {
        inputEl,
        isFocus,
        isValue,
        isEmail,
        labelEl,
        labelWidth,
        nowValue,
        currentVal,
        mailList,
        alignArray,
        matchingAlign,
        align,
        inputClass,
        focusIn,
        focusOut,
        inputEvt,
        emailSet,
        resetValue,
        dateBottomSheet,
        yearVal,
        monthVal,
        dayVal,
        hourVal,
        minuteVal,
        getDateEvt,
        dateValueSet
      }
    }
  }
  </script>