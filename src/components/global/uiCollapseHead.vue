<template>
    <div class="ui-collapse-head">
        <button type="button"
            :class="{ open: isCollapse }"
            @click="toggleCollapse"
        >
            <slot/>
        </button>
    </div>
</template>
    
<script>
import { ref, inject } from 'vue';
    
export default {
    setup() {
        const isCollapse = inject('isCollapse')
        const toggleCollapse = inject('toggleCollapse')
        
        return {
            isCollapse,
            toggleCollapse
        };
    }
};
</script>