
<template>
  <div :class="radioClass">
    <label v-if="right && !!$slots.default" class="lbl" :class="lblClass" :style="lblStyle" :for="radioId">
      <slot />
    </label>
    <input
      :id="radioId"
      ref="radio"
      type="radio"
      :checked="isChecked"
      :value="value"
      :disabled="disabled"
      v-bind="$attrs"
      @click="clickEvt"
      @focus="focusIn"
      @blur="focusOut"
      @change="onInputChange"
    /><i aria-hidden="true" />
    <label v-if="!right && !!$slots.default" class="lbl" :class="lblClass" :style="lblStyle" :for="radioId">
      <slot />
    </label>
    <div v-if="!!$slots.summary" class="lbl-child">
      <slot name="summary" />
    </div>
    <slot name="last" />
  </div>
</template>
<script>
import { globalCounters } from './globalCounters.js'
import { ref, computed, getCurrentInstance } from 'vue'
export default {
  props: {
    id: { type: String, default: null },
    disabled: { type: Boolean, default: false },
    right: { type: Boolean, default: false },

    size: { type: String, default: null },
    small: { type: Boolean, default: false },
    large: { type: Boolean, default: false },

    checkbox: { type: Boolean, default: false },
    block: { type: Boolean, default: false },
    box: { type: Boolean, default: false },
    button: { type: Boolean, default: false },

    value: { type: [String, Number], default: null, require: true },
    modelValue: { type: [String, Number, Boolean, Array, Object], default: null },

    class: { type: [String, Array], default: null },
    lblClass: { type: [String, Array], default: null },
    lblStyle: { type: String, default: null },
    dblclick: { type: Function, default: null }
  },
  emits: ['update:modelValue', ''],
  setup(props, context) {
    const { emit } = context

    const componentName = 'input'
    if (!globalCounters[componentName]) {
      globalCounters[componentName] = 1
    } else {
      globalCounters[componentName]++
    }

    const instanceId = ref(globalCounters[componentName])

    const isFocus = ref(false)
    const isChecked = computed(() => {
      return props.modelValue === props.value;
    });

    const sizeAry = ['small', 'large'];
    const matchingSize = sizeAry.find(size => props[size]);
    const $size = computed(() => {
      if (props.size && sizeAry.includes(props.size)) {
        return props.size;
      } else if (matchingSize) {
        return matchingSize;
      }
      return null;
    });

    const radioClass = computed(() => {
      return [
        {
          radio: !props.checkbox,
          checkbox: props.checkbox,
          block: props.block,
          box: props.box,
          btn: props.button,
          focus: isFocus.value,
          disabled: props.disabled,
          checked: isChecked.value
        },
        props.class,
        $size.value
      ];
    });

    let isDblclick = false;
    let dblclickTime = null;
    const focusIn = () => {
      isFocus.value = true;
    };
    const focusOut = () => {
      isFocus.value = false;
    };
    const clickEvt = e => {
      if (!props.disabled) {
        if (props.dblclick) {
          if (isDblclick) {
            if (!!dblclickTime) {
              clearTimeout(dblclickTime);
              dblclickTime = null;
            }
            isDblclick = false;
            props.dblclick();
          } else {
            isDblclick = true;
            if (!dblclickTime) {
              dblclickTime = setTimeout(() => {
                isDblclick = false;
              }, 300);
            }
          }
        }
      }
    };

    const onInputChange = e => {
      const target = e.target
      emit('update:modelValue', target.value)
    };

    return {
      instanceId,
      props,
      radioClass,
      isChecked,
      radioId: `rdo_${instanceId.value}`,
      isFocus,
      focusIn,
      focusOut,
      clickEvt,
      onInputChange
    };
  }
}
</script>