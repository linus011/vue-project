<template>
  <div class="ui-panel" v-if="isActive" :class="{active: isActive}">
    <slot />
  </div>
</template>

<script>
import { onBeforeMount, onMounted, ref, inject, watch } from "vue";

export default {
  name: "uiTabOld",
  props: {
    title: { type: String, required: true },
    active: { type: Boolean, default: false },
  },
  setup(props) {
    const isActive = ref(false);
    const tabs = inject("TabsProvider");

    watch(
      () => tabs.selectedIndex,
      () => {
        isActive.value = props.title === tabs.selectedIndex;
      }
    );

    onBeforeMount(() => {
      isActive.value = props.title === tabs.selectedIndex;
    });

    return { isActive };
  },
};
</script>