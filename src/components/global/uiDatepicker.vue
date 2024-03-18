<template>
    <ui-input 
        v-model="dateVal" 
        type="text" 
        id="text" 
        label="날짜"
        @focus-event="dateBottomSheet = true"
    />
    <ui-pop v-model="dateBottomSheet" title="날짜선택" bottom @close="dateBottomSheet = false">
        <ui-select-date
            :isVal = "dateVal"
            :yr = yr
            :mo = mo
            :dy = dy
            :hr = hr
            :min = min
            @dateState = 'getDateEvt' 
        />
        <template #foot>
            <div class="flex full">
                <ui-button sl primary @click="dateBottomSheet = false, dateValueSet()">확인</ui-button>
            </div>
        </template>
    </ui-pop>
</template>

<script>
import { ref, onMounted, watch } from 'vue'
import uiSelectDate from '@/components/global/uiSelectDate.vue'

export default {
    components: {
        uiSelectDate
    },
    props: {
        class: { type: String, default: null },
        modelValue: { type: [String, Number], default: null },
        yr: { type: Boolean, default: false },
        mo: { type: Boolean, default: false },
        dy: { type: Boolean, default: false },
        hr: { type: Boolean, default: false },
        min: { type: Boolean, default: false }
    },
    emits: ['update:modelValue'],
    setup(props, context) {

        const { emit } = context
        const dateBottomSheet = ref(false)
        const dateVal = ref(props.modelValue)
        const yearVal = ref()
        const monthVal = ref()
        const dayVal = ref()
        const hourVal = ref()
        const minuteVal = ref()

        const getDateEvt = (yr, mo, dy, hr, min) => {
            yearVal.value = yr
            monthVal.value = mo < 10 ? '0' + mo : mo
            dayVal.value = dy < 10 ? '0' + dy : dy
            hourVal.value = hr < 10 ? '0' + hr : hr
            minuteVal.value = min < 10 ? '0' + min : min
        }

        const dateValueSet = () => {
            const yr = yearVal.value
            const mo = monthVal.value
            const dy = dayVal.value
            const hr = hourVal.value
            const min = minuteVal.value
            const isYear = (yr == undefined)
            const isMonth = (mo == undefined)
            const isDay = (dy == undefined)
            const isHour = (hr == undefined)
            const isMinute = (min == undefined)

            if(!isYear && isMonth && isDay && isHour && isMinute) {
                dateVal.value = yr
            } else if(isYear && !isMonth && isDay && isHour && isMinute) {
                dateVal.value = mo
            } else if(isYear && isMonth && !isDay && isHour && isMinute) {
                dateVal.value = dy
            } else if(isYear && isMonth && isDay && !isHour && isMinute) {
                dateVal.value = hr
            } else if(isYear && isMonth && isDay && isHour && !isMinute) {
                dateVal.value = min
            } else if(!isYear && !isMonth && !isDay && !isHour && !isMinute) {
                dateVal.value = `${yearVal.value}-${mo}-${dy} ${hr}:${min}`
            } else if(!isYear && !isMonth && !isDay && isHour && isMinute) {
                dateVal.value = `${yr}-${mo}-${dy}`
            } else if(isYear && isMonth && isDay && !isHour && !isMinute) {
                dateVal.value = `${hr}:${min}`
            }
        }

        watch(() => dateVal.value, (newVal, oldVal) => {
            emit('update:modelValue', newVal)
        })

        onMounted(() => {
            
        })
        return {
            dateBottomSheet,
            dateVal,
            yearVal,
            monthVal,
            dayVal,
            hourVal,
            minuteVal,
            getDateEvt,
            dateValueSet
        }
    }
}
</script>
