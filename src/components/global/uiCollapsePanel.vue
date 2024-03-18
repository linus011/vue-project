<template>
    <transition name="collapse">
        <div v-if="isCollapse" class="ui-collapse-panel">
            <div ref="cont" class="inner">
                <slot/>
            </div>
        </div>
    </transition>
</template>
    
<script>
import { ref, inject, onMounted, watchEffect, nextTick } from 'vue'
    export default {
        setup() {
            const isCollapse = inject('isCollapse')
            const cont = ref()
            const panelVisible = () => {
                if(isCollapse.value) {
                    nextTick(() => {
                        const height = cont.value.offsetHeight
                        cont.value.parentNode.style.height = `${height}px`
                        cont.value.parentNode.style.opacity = 1
                    })
                }
            }
            onMounted(() => {
                watchEffect(() => {
                    panelVisible()
                })
            })
            return {
                isCollapse,
                cont
            }
        }
    };
</script>