<template>
    <div class="ui-collapses">
        <slot />
    </div>
</template>
    
<script>
import { ref, onMounted, provide } from 'vue';
    
export default {
    props: {
        modelValue: { type: Number, default: null },
        accordion: { type: Boolean, default: false },
    },
    setup(props) {
        const collapseVal = ref(props.modelValue);
        const isAccordion = ref(props.accordion);
        provide('collapseVal', collapseVal);
        provide('isAccordion', isAccordion);
        return {
            collapseVal,
            isAccordion
        };
    },
};
</script>