<template>
    <div 
        ref="panelEl" 
        v-show="isPanel"
        class="ui-panel"
    >
        <slot />
    </div>
</template>
    
<script>
import { ref, onMounted, computed, nextTick, watch, inject } from 'vue'
    export default {
        setup() {
            const currentVal = inject('currentVal')
            const panelEl = ref()
            const isPanel = ref(true)

            const myIndex = computed(() => {
                const siblings = Array.from(panelEl.value.closest('.ui-panel-track').children)
                return siblings.indexOf(panelEl.value)
            })

            const currentPanelSet = () => {
                isPanel.value = true
                panelEl.value.classList.remove('current')
                panelEl.value.classList.remove('prev')
                panelEl.value.classList.remove('next')
                nextTick(() => {
                    if(currentVal.value == null) {
                        if(!myIndex.value == 0) {
                            isPanel.value = false
                        } else {
                            isPanel.value = true
                        }
                    } else {
                        if(myIndex.value == currentVal.value) {
                            isPanel.value = true
                        } else {
                            isPanel.value = false
                        }
                    }
                })
            }

            watch(() => currentVal.value, (newVal, oldVal) => {
                currentPanelSet()
            })
            
            onMounted(() => {
                currentPanelSet()
            })

            return {
                currentVal,
                panelEl,
                isPanel,
                myIndex,
                currentPanelSet
            }
        }
    };
</script>