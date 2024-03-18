<template>
    <div class="ui-tab-group" :class="typeClass">
        <div class="ui-tabs">
            <div ref="tabTrack" class="ui-tab-track">
                <ul>
                    <slot name="tabs"/>
                </ul>
                <span 
                    ref="tabSlider" 
                    v-if="bar || box" 
                    class="tab-slider"
                    :class="{bar: bar, box: box}"
                ></span>
            </div>
        </div>
        <div class="ui-panels">
            <div ref="panelTrack" class="ui-panel-track"
                @touchstart="handleTouchStart"
                @touchmove="handleTouchMove"
                @touchend="handleTouchEnd"
            >
                <slot name="panels"/>
            </div>
        </div>
    </div>
</template>
    
<script>
import { ref, onMounted, computed, watch, nextTick, provide, getCurrentInstance } from 'vue'
    
export default {
    props: {
        modelValue: { type: Number, default: null },
        bar: { type: Boolean, default: false },
        box: { type: Boolean, default: false }
    },
    setup(props) {
        const typeClass = computed(() => {
            let rtnAry = [
                {
                    bar: props.bar,
                    box: props.box
                }
            ]
            return rtnAry
        })

        const currentVal = ref(props.modelValue)
        provide('currentVal', currentVal)

        const tabTrack = ref()
        const tabSlider = ref()
        const panelTrack = ref()
        const scrollTo = getCurrentInstance().proxy.$scrollTo

        const tabAutoPos = (e) => {
            const track = tabTrack.value;
            const trackW = track.offsetWidth;
            setTimeout(function () {
                const current = (!props.box) ? tabTrack.value.querySelector('.active').querySelector('span') : tabTrack.value.querySelector('.active')
                const trackSclW = track.scrollWidth
                const tLeft = current.offsetLeft
                const tWidth = current.offsetWidth
                const sclLeft = tLeft - (trackW / 2) + (tWidth / 2)
                const speed = Math.max(300, Math.abs(sclLeft * 2))
                if(trackW < trackSclW) scrollTo(track, { left: sclLeft }, speed)
                if(props.bar || props.box) {
                    tabSlider.value.style.width = tWidth + 'px';
                    tabSlider.value.style.left = tLeft + 'px';
                }
            }, 50)
        }

        let touchStartX = 0

        const handleTouchStart = (e) => {
            touchStartX = e.touches[0].clientX
        }

        const handleTouchMove = (e) => {
        }

        const handleTouchEnd = (e) => {
            const touchEndX = e.changedTouches[0].clientX
            const deltaX = touchEndX - touchStartX
            const maxNum = Array.from(panelTrack.value.children).length - 1

            if (Math.abs(deltaX) >= 50) {
                if (deltaX > 0) {
                    if (currentVal.value != 0) currentVal.value -= 1
                } else {
                    if (currentVal.value != maxNum) currentVal.value += 1
                }
                tabAutoPos()
            }
            touchStartX = 0
        }

        provide('tabAutoPos', tabAutoPos)

        watch(() => currentVal.value, (newVal, oldVal) => {
            const siblings = Array.from(panelTrack.value.children)
            const newPanel = siblings[newVal]
            const oldPanel = siblings[oldVal]

            siblings.forEach(sibling => sibling.classList.remove('current'))

            nextTick(() => {
                panelTrack.value.style.height = `${oldPanel.offsetHeight}px`
                requestAnimationFrame(() => {
                    panelTrack.value.style.height = `${newPanel.offsetHeight}px`
                })
            })

            newPanel.classList.add('active')
            oldPanel.classList.add('old')

            if (newVal < oldVal) {
                newPanel.classList.add('reverse')
                oldPanel.classList.add('reverse')
            }

            requestAnimationFrame(() => {
                newPanel.classList.add('leave')
                oldPanel.classList.add('leave')

                setTimeout(() => {
                    newPanel.classList.remove('reverse', 'active', 'leave')
                    oldPanel.classList.remove('old', 'reverse', 'leave')
                    panelTrack.value.removeAttribute('style')
                }, 300)
            })
        })

        onMounted(() => {
            tabAutoPos()
        })

        return {
            typeClass,
            currentVal,
            tabTrack,
            tabSlider,
            panelTrack,
            tabAutoPos,
            handleTouchStart,
            handleTouchMove,
            handleTouchEnd
        };
    },
};
</script>