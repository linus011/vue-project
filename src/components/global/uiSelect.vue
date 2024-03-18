<template>
  <div
    class="select"
    :class="selectClass"
  >
    <div v-if="inline" class="btn-select-txt" aria-hidden="true">{{ selectText }}</div>
    <button type="button" class="btn-select" aria-hidden="true"
      v-if="bottom"
      @click="openSelectBottomSheet"
    >{{ selectText }}</button>
    <select
      ref="select"
      v-model="selectedValue"
      :class="[{ off: value === '' }, selectClass]"
      :title="title"
      :disabled="disabled"
      :dir="dir"
      @focus="isFocus = true"
      @blur="isFocus = false"
      @change="onSelectChange"
    >
    <option
      v-for="(option, i) of options"
      :key="i"
      :disabled="option.disabled"
      :selected="(option.value === value)"
      :value="option.value"
    >
      {{ option.text }}
    </option>
    <slot />
    </select>
  </div>
  <ui-pop v-model="selectBottomSheet" :title="title" bottom @close="selectBottomSheet = false">
      <div class="ui-select-list">
        <ul>
          <li
            v-for="(option, i) of options"
            :key="i"
          >
            <button type="button"
              :class="{ active: selectedValue === option.text }"
              @click="selectValueSet"
            >{{ option.text }}</button>
          </li>
        </ul>
      </div>
      <template #foot>
          <div class="flex full">
              <ui-button sl @click="selectValueCancel">취소</ui-button>
          </div>
      </template>
  </ui-pop>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
  
export default {
  name: 'uiSelect',
  props: {
    options: { type: [Array, Object], default: () => [] },
    value: { type: [Object, String, Number], default: null },
    title: { type: String, default: '선택' },
    dir: { type: String, default: null },
    disabled: { type: Boolean, default: false },
    inline: { type: Boolean, default: false },
    bottom: { type: Boolean, default: false },
    selectClass: { type: String, default: null },
    modelValue: { type: [Object, String, Number], default: null }
  },
  emits: ['update:modelValue', ''],
  setup(props, context) {
    const { emit } = context
    const select = ref()
    const selectedValue = ref(props.modelValue)
    const isFocus = ref(false)
    const selectBottomSheet = ref(false)
    const selectClass = computed(() => {
      return [
        {
          inline: props.inline,
          disabled: props.disabled,
          small: props.small,
          large: props.large,
          bottom: props.bottom
        },
        props.class
      ]
    })
  
    const selectText = computed(() => {
      const valObj = props.options.find(obj => String(obj.value) === String(selectedValue.value))
      return valObj ? valObj.text : props.title ? props.title : props.options[0].text
    })
  
    const onSelectChange = (event) => {
      const targetVal = event.target.value
      selectedValue.value = targetVal
      emit('update:modelValue', selectedValue.value)
    }
  
    onMounted(() => {
      emit('update:modelValue', selectedValue.value)
    })
  
    const focus = () => {
      select.value.focus()
    }

    const openSelectBottomSheet = () => {
      selectBottomSheet.value = true
    }

    const selectValueSet = (event) => {
      selectedValue.value = event.target.textContent
      emit('update:modelValue', selectedValue.value)
      selectBottomSheet.value = false
    }

    const selectValueCancel = () => {
      selectedValue.value = props.title
      emit('update:modelValue', props.title)
      selectBottomSheet.value = false
    }
  
    return { 
      selectedValue,
      selectClass,
      isFocus,
      selectBottomSheet,
      selectText, 
      onSelectChange,
      focus,
      openSelectBottomSheet,
      selectValueSet,
      selectValueCancel
    }
  },
}
</script>