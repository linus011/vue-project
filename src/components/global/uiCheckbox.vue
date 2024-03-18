<template>
  <div :class="checkboxClass">
  <label v-if="right && !!$slots.default" class="lbl" :class="lblClass" :style="lblStyle" :for="chkboxId">
  <slot />
  </label>
  <input
        :id="chkboxId"
        ref="checkbox"
        type="checkbox"
        :checked="isChecked"
        :value="value"
        :disabled="disabled"
        v-bind="$attrs"
        @click="clickEvt"
        @focus="focusIn"
        @blur="focusOut"
        @change="onInputChange"
      /><i aria-hidden="true" />
  <label v-if="!right && !!$slots.default" class="lbl" :class="lblClass" :style="lblStyle" :for="chkboxId">
  <slot />
  </label>
  <div v-if="!!$slots.child" class="lbl-child">
  <slot name="child" />
  </div>
  <slot name="last" />
  </div>
  </template>

<script>
import { globalCounters } from './globalCounters.js'
import { ref, computed, watch } from 'vue';

export default {
  name: 'uiCheckbox',
  props: {
    id: { type: String, default: null },
    disabled: { type: Boolean, default: false },
    right: { type: Boolean, default: false },

    small: { type: Boolean, default: false },
    large: { type: Boolean, default: false },

    radio: { type: Boolean, default: false },
    block: { type: Boolean, default: false },
    box: { type: Boolean, default: false },
    button: { type: Boolean, default: false },
    switch: { type: Boolean, default: false },

    value: { type: [String, Number], default: null, require: true },
    modelValue: { type: [String, Number, Boolean, Array, Object], default: null },
    trueValue: { type: [String, Number, Boolean], default: true },
    falseValue: { type: [String, Number, Boolean], default: false },

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

    const isFocus = ref(false);
    const chkboxId = computed(() => {
      let rtnVal = `chk_${instanceId.value}`;
      if (props.id) rtnVal = props.id;
      return rtnVal;
    });

    const isChecked = computed(() => {
      if (props.modelValue instanceof Array) {
        return props.modelValue.includes(props.value);
      }
      return props.modelValue === props.trueValue;
    });

    const checkboxClass = computed(() => {
      let rtnAry = [
        {
          small: props.small,
          large: props.large,
          checkbox: !props.radio,
          radio: props.radio,
          block: props.block,
          box: props.box,
          btn: props.button,
          switch: props.switch,
          focus: isFocus.value,
          disabled: props.disabled,
          checked: isChecked.value
        },
        props.class
      ];
      return rtnAry;
    });

    let isDblclick = false;
    let dblclickTime = null;
    const focusIn = () => {
      isFocus.value = true;
    };
    const focusOut = () => {
      isFocus.value = false;
    };
    const clickEvt = (e) => {
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
    const onInputChange = (e) => {
      if (!e.target) return;
      const checked = e.target.checked;
      if (props.modelValue instanceof Array) {
        const newValue = [...props.modelValue];
        if (checked) {
          newValue.push(props.value);
        } else {
          newValue.splice(newValue.indexOf(props.value), 1);
        }
        emit('update:modelValue', newValue);
      } else {
        let returnVal = '';
        if (checked) {
          returnVal = props.trueValue;
        } else {
          returnVal = props.falseValue;
        }
        emit('update:modelValue', returnVal);
      }
    };

    return {
      instanceId,
      isFocus,
      chkboxId,
      isChecked,
      checkboxClass,
      focusIn,
      focusOut,
      clickEvt,
      onInputChange
    };
  }
};
</script>