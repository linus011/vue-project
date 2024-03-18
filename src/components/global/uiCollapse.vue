<template>
    <div 
        ref="collapseEl" 
        class="ui-collapse"
        :class="{ active: isCollapse }"
        @collapse-close="isCollapse = false"
    >
        <slot />
    </div>
</template>
    
<script>
    import { ref, computed, onMounted, provide, inject} from 'vue'
    export default {
        setup() {
            const collapseEl = ref()
            const isCollapse = ref(false)

            const toggleCollapse = () => {
                isCollapse.value = !isCollapse.value;
                if(isAccordion.value) {
                    getSiblings(collapseEl.value).forEach( item => {
                        item.isCollapse = false
                        item.dispatchEvent(new CustomEvent('collapse-close', { detail: { isCollapse: false } }))
                    })
                }
            }

            provide('isCollapse', isCollapse)
            provide('toggleCollapse', toggleCollapse)

            const collapseVal = inject('collapseVal')
            const isAccordion = inject('isAccordion')

            const myIndex = computed(() => {
                const siblings = Array.from(collapseEl.value.closest('.ui-collapses').children)
                return siblings.indexOf(collapseEl.value)
            })

            const getSiblings = (el) => {
                let siblings = []
                let sibling = el.parentNode.firstChild
                while (sibling) {
                    if (sibling.nodeType === 1 && sibling !== el) {
                        siblings.push(sibling)
                    }
                    sibling = sibling.nextSibling
                }
                return siblings
            }

            onMounted(() => {
                if(collapseVal.value == myIndex.value) isCollapse.value = true
            })

            return {
                collapseEl,
                isCollapse,
                toggleCollapse,
                collapseVal,
                isAccordion,
                myIndex,
                getSiblings
            }
        }
    };
</script>