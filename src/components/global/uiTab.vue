<template>
    <li
        ref="tabEl" 
    >
        <button 
            type="button" 
            class="tab-item"
            @click="tabClickEvt"
        >
            <span>
                <slot />
            </span>
        </button>
    </li>
</template>
    
<script>
import { ref, onMounted, computed, watch, inject, provide } from 'vue';
    
export default {
    setup(props) {
        const tabEl = ref()
        const currentVal = inject('currentVal')
        const tabAutoPos = inject('tabAutoPos')
        provide('currentVal', currentVal)

        const myIndex = computed(() => {
            const siblings = Array.from(tabEl.value.closest('ul').children)
            return siblings.indexOf(tabEl.value)
        })

        const tabClickEvt = () => {
            currentVal.value = myIndex.value
            tabAutoPos()
        }

        const currentTabSet = () => {
            if(myIndex.value == currentVal.value) {
                tabEl.value.classList.add('active')
            } else {
                tabEl.value.classList.remove('active')
            }
            if(currentVal.value == null && myIndex.value == 0) {
                tabEl.value.classList.add('active')
            }
        }

        watch(() => currentVal.value, (newVal, oldVal) => {
            currentTabSet()
        })
        
        onMounted(() => {
            currentTabSet()
        })

        return {
            tabEl,
            currentVal,
            myIndex,
            tabClickEvt,
            currentTabSet
        }
    }
};
</script>