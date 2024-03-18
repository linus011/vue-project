<template>
  <div
    v-if="radial"
    class="ui-radial"
    :class="typeClass"
    :style="`
      width: ${size}px;
      height: ${size}px;
    `"
  >
    <div class="ui-radial-wrap">
      <div v-if="startImg" ref="radialStart" class="ico-start">
        <span
          :style="`
            width: ${strokeWidth}px;
            height: ${strokeWidth}px;
            background-color: ${iconBg};
          `"
        >
          <img :src="`/assets/images/${startImg}`" alt="" />
        </span>
      </div>
      <svg
        ref="svgCircle"
        :viewBox="`0 0 ${size} ${size}`"
        :width="size"
        :height="size"
        aria-hidden="true"
      >
        <circle
          class="circle-bg"
          fill="none"
          :stroke-width="strokeWidth"
          :cx="radius"
          :cy="radius"
          :r="radiusB"
        ></circle>
        <circle
          class="circle"
          ref="spinner"
          :style="`
            -webkit-animation-delay: 0.3s;
            animation-delay: 0.3s;
            stroke-dasharray: ${circumference};
            stroke-dashoffset: ${circumference};
          `"
          :stroke="stroke"
          :stroke-width="strokeWidth"
          :cx="radius"
          :cy="radius"
          :r="radiusB"
        ></circle>
      </svg>
      <div v-if="endImg" ref="radialEnd" class="ico-end">
        <span
          :style="`
            width: ${strokeWidth}px;
            height: ${strokeWidth}px;
            background-color: ${iconBg};
          `"
        >
          <img :src="`./src/assets/front/images/${endImg}`" alt="" />
        </span>
      </div>
      <div v-if="numData" class="num-data">
        <span class="lb">달성률</span>
        <div
          class="num-count"
          :style="`
                        color: ${color};
                    `"
        >
          <strong ref="numberic" class="num"></strong>
          <span class="unit">%</span>
        </div>
      </div>
      <div v-if="meal" class="meal-icon" ref="mealIcon">
        <div v-if="breakfast" class="icon breakfast"></div>
        <div v-if="lunch" class="icon lunch">
          <div class="smoke">
            <span></span>
          </div>
        </div>
        <div v-if="dinner" class="icon dinner">
          <div class="smoke">
            <span></span>
          </div>
        </div>
      </div>
      <div v-if="exer" class="num-data">
        <span class="lb">오늘</span>
        <div
          class="num-count"
          :style="`
                        color: ${color};
                    `"
        >
          <strong ref="numberic" class="num f-24"></strong>
        </div>
        <span class="etc"
          >/
          {{ weekCal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') }}</span
        >
      </div>
      <div v-if="walk" class="num-data">
        <span class="lb">목표걸음</span>
        <div
          class="num-count"
          :style="`
                        color: ${color};
                    `"
        >
          <strong ref="numberic" class="num f-24"></strong>
        </div>
      </div>
      <div v-if="sleep" class="num-time">
        <div>
          <span class="lb">오후</span>
          <strong class="time">{{ startTime }}</strong>
        </div>
        <span>~</span>
        <div>
          <span class="lb">오전</span>
          <strong class="time">{{ endTime }}</strong>
        </div>
      </div>
    </div>
  </div>
  <div v-if="line" class="ui-line" :class="typeClass">
    <div v-if="body" class="ui-chart-wrap">
      <div class="ui-line-wrap" ref="lineChart">
        <div class="point" v-for="(item, i) of chartData" :key="i">
          <i
            v-if="male"
            class="dot"
            :class="{
              normal: 17.9 >= item,
              good: 18 <= item && 24.9 >= item,
              bad: 25 <= item
            }"
          ></i>
          <i
            v-if="female"
            class="dot"
            :class="{
              normal: 24.9 >= item,
              good: 25 <= item && 31.9 >= item,
              bad: 32 <= item
            }"
          ></i>
        </div>
      </div>
    </div>
    <div v-if="bloodSugar" class="ui-chart-wrap">
      <div class="ui-line-wrap" ref="lineChart">
        <div class="point" v-for="(item, i) of chartData" :key="i">
          <i
            class="dot"
            :class="{
              am: item.key === '식전',
              pm: item.key === '식후',
              normal:
                (item.key === '식전' ? 100 : 140) < item.val &&
                (item.key === '식전' ? 125 : 199) > item.val,
              good:
                (item.key === '식전' ? 71 : 91) < item.val &&
                (item.key === '식전' ? 99 : 139) > item.val,
              bad:
                (item.key === '식전' ? 70 : 90) > item.val ||
                (item.key === '식전' ? 126 : 200) < item.val
            }"
          ></i>
        </div>
      </div>
    </div>
  </div>
  <div v-if="blood" class="ui-blood" :class="typeClass">
    <div class="ui-blood-wrap" ref="bloodChart">
      <div class="blood-item" v-for="(item, i) of chartData" :key="i">
        <div class="sis">
          <div
            class="bar"
            :class="{
              good: 90 <= item.sis && 120 > item.sis,
              normal: 90 > item.sis || (120 <= item.sis && 159 >= item.sis),
              bad: 160 <= item.sis
            }"
          ></div>
        </div>
        <div class="dia">
          <div
            class="bar"
            :class="{
              good: 60 <= item.dia && 80 > item.dia,
              normal: 60 > item.dia || (80 <= item.sis && 99 >= item.dia),
              bad: 100 <= item.dia
            }"
          ></div>
        </div>
      </div>
    </div>
  </div>
  <div v-if="heart" class="ui-heart" :class="typeClass">
    <div class="ui-heart-wrap" ref="heartChart">
      <div
        class="heart-item"
        v-for="(item, i) of chartData"
        :key="i"
        :class="{
          bad: 49 >= item,
          normal: 50 <= item && 59 >= item,
          good: 60 <= item
        }"
      ></div>
    </div>
  </div>
  <observer-scroll @triggerIntersected="chartPlay" />
</template>
<script>
  import { ref, onMounted, computed, getCurrentInstance } from 'vue'
  export default {
    props: {
      radial: { type: Boolean, default: false },
      line: { type: Boolean, default: false },
      blood: { type: Boolean, default: false },
      heart: { type: Boolean, default: false },
      body: { type: Boolean, default: false },
      male: { type: Boolean, default: false },
      female: { type: Boolean, default: false },
      bloodSugar: { type: Boolean, default: false },
      numData: { type: Boolean, default: false },
      chartData: { type: [String, Array, Object], default: null },
      startImg: { type: String, default: null },
      endImg: { type: String, default: null },
      startTime: { type: String, default: null },
      endTime: { type: String, default: null },
      size: { type: Number, default: null },
      stroke: { type: String, default: null },
      iconBg: { type: String, default: null },
      color: { type: String, default: null },
      per: { type: Number, default: null },
      weekCal: { type: Number, default: null },
      numbering: { type: Number, default: null },
      border: { type: Number, default: null },
      meal: { type: Boolean, default: false },
      breakfast: { type: Boolean, default: false },
      lunch: { type: Boolean, default: false },
      dinner: { type: Boolean, default: false },
      exer: { type: Boolean, default: false },
      walk: { type: Boolean, default: false },
      sleep: { type: Boolean, default: false }
    },
    emits: ['timeDurationSet'],
    setup(props, context) {
      const { emit } = context

      const numRolling = getCurrentInstance().proxy.$numRolling
      const numCounter = getCurrentInstance().proxy.$numCounter

      const typeClass = computed(() => {
        let rtnAry = [
          {
            radial: props.radial,
            line: props.line,
            blood: props.blood,
            bloodSugar: props.bloodSugar,
            beforeMeal: props.beforeMeal,
            afterMeal: props.afterMeal,
            heart: props.heart,
            body: props.body,
            male: props.male,
            female: props.female,
            numData: props.numData,
            meal: props.meal,
            breakfast: props.breakfast,
            lunch: props.lunch,
            dinner: props.dinner,
            exer: props.exer,
            walk: props.walk,
            sleep: props.sleep
          }
        ]
        return rtnAry
      })

      const timeToPercentage = (startTime, endTime) => {
        if(startTime == null || endTime == null) return false
        const [startHour, startMinute] = startTime.split(':').map(Number)
        const [endHour, endMinute] = endTime.split(':').map(Number)
        const totalStartMinutes = startHour * 60 + startMinute
        const totalEndMinutes = endHour * 60 + endMinute
        const totalMinutesInDay = 24 * 60
        const percentage = ((totalEndMinutes - totalStartMinutes + totalMinutesInDay) % totalMinutesInDay) / totalMinutesInDay * 100
        return percentage.toFixed(2)
      }

      const timeToAngle = (time) => {
        if(time == null) return false
        const [hour, minute] = time.split(':').map(Number);
        const hoursInDay = 24;
        const degreesPerHour = 360 / hoursInDay;
        const minutesInHour = 60;
        const degreesPerMinute = 360 / minutesInHour;
        const totalAngle = (hour % hoursInDay) * degreesPerHour + (minute / minutesInHour) * degreesPerHour;
        return totalAngle;
      }

      const timeDuration = (startTime, endTime) => {
        if(startTime == null || endTime == null) return false
        const [startHour, startMinute] = startTime.split(':').map(Number)
        const [endHour, endMinute] = endTime.split(':').map(Number)
        const totalStartMinutes = startHour * 60 + startMinute
        const totalEndMinutes = endHour * 60 + endMinute
        let durationInMinutes = totalEndMinutes - totalStartMinutes
        if (durationInMinutes < 0) {
          durationInMinutes += 24 * 60
        }
        const hours = Math.floor(durationInMinutes / 60)
        const minutes = durationInMinutes % 60
        return { hours, minutes }
      }

      const lineChart = ref(null)
      const bloodChart = ref(null)
      const heartChart = ref(null)
      const svgCircle = ref(null)
      const spinner = ref(null)
      const radialStart = ref(null)
      const radialEnd = ref(null)
      const numberic = ref(null)
      const strokeWidth = props.border ? props.border : 5
      const radius = props.size / 2
      const radiusB = props.size / 2 - strokeWidth / 2
      const circumference = Math.floor(2 * Math.PI * radiusB)
      const perValue = (props.per == null || props.startTime) ? timeToPercentage(props.startTime, props.endTime) : props.per
      const dashoffset = Math.floor(circumference * (1 - perValue / 100))
      let rot = parseInt((360 / 100) * perValue)
      let isChart = ref(true)
      const mealIcon = ref(null)

      const convertToPercentage = (val, min, max) => {
        val = Math.max(val, min)
        val = Math.min(val, max)
        const range = max - min
        const ratio = (val - min) / range
        let per = ratio * 100
        if (range == 0) per = 50
        return per
      }

      const progress = (e) => {
        setTimeout(() => {
          if (props.radial) {
            spinner.value.style.strokeDashoffset = dashoffset
          }
          if (props.endImg) {
            rot = (props.per == null || props.startTime) ? (timeToAngle(props.endTime) == 0 && timeToAngle(props.startTime) != 0) ? 360 : timeToAngle(props.endTime) : rot
            radialEnd.value.style.transform = `rotate(${rot}deg)`
            radialEnd.value.querySelector('img').style.transform = `rotate(-${rot}deg)`
          }
          if (props.line) {
            const points = lineChart.value.querySelectorAll('.point')
            points.forEach((i, n) => {
              const valueData = () => {
                return props.bloodSugar
                  ? props.chartData.map((i) => i['val'])
                  : props.chartData
              }
              const per = convertToPercentage(
                valueData()[n],
                Math.min(...valueData()),
                Math.max(...valueData())
              )
              i.style.height = `${per}%`
              i.addEventListener('transitionend', (e) => {
                if (i.nextElementSibling != null) {
                  const line = document.createElement('div')
                  line.className = 'line'
                  const sDot = i.querySelector('.dot')
                  const eDot = i.nextElementSibling.querySelector('.dot')
                  if (eDot == null) return false
                  let length = null
                  function lineSet() {
                    const startX = sDot.offsetLeft + sDot.offsetWidth / 2
                    const startY = sDot.offsetTop + sDot.offsetHeight / 2
                    const endX = eDot.offsetLeft + eDot.offsetWidth / 2
                    const endY = eDot.offsetTop + eDot.offsetHeight / 2
                    const angle = Math.atan2(endY - startY, endX - startX)
                    length = Math.hypot(endX - startX, endY - startY)
                    line.style.left = `${startX}px`
                    line.style.top = `${startY}px`
                    line.style.transform = `rotate(${angle}rad)`
                  }
                  lineSet()
                  lineChart.value.appendChild(line)
                  setTimeout(() => {
                    line.style.width = `${length}px`
                  }, 200 * n)
                  function resizeEvt() {
                    lineSet()
                    line.style.width = `${length}px`
                  }
                  window.addEventListener('resize', resizeEvt)
                }
              })
            })
          }
          if (props.blood) {
            const items = bloodChart.value.querySelectorAll('.blood-item')
            items.forEach((i, n) => {
              const sis = i.querySelector('.sis .bar')
              const dia = i.querySelector('.dia .bar')
              const sisArray = props.chartData.map((i) => i.sis)
              const diaArray = props.chartData.map((i) => i.dia)
              const sisPer = convertToPercentage(
                props.chartData[n].sis,
                Math.min(...sisArray),
                Math.max(...sisArray)
              )
              const diaPer = convertToPercentage(
                props.chartData[n].dia,
                Math.min(...diaArray),
                Math.max(...diaArray)
              )
              setTimeout(() => {
                sis.style.height = `${sisPer}%`
                dia.style.height = `${diaPer}%`
              }, 200 * n)
            })
          }
          if (props.heart) {
            const items = heartChart.value.querySelectorAll('.heart-item')
            items.forEach((i, n) => {
              const per = convertToPercentage(
                props.chartData[n],
                Math.min(...props.chartData),
                Math.max(...props.chartData)
              )
              setTimeout(() => {
                i.style.height = `${per}%`
              }, 200 * n)
            })
          }
          if (props.startTime || props.endTime) {
            svgCircle.value.style.transform = `rotate(${timeToAngle(props.startTime)-90}deg)`
          }
        }, 100)
      }

      const chartPlay = (e) => {
        if (isChart.value) {
          progress()
          if (props.numData) numRolling(numberic.value, props.per)
          if (props.numbering) numRolling(numberic.value, props.numbering)
          // if (props.numData) numCounter(numberic.value, 0, props.per, 1000)
          // if (props.numbering) numCounter(numberic.value, 0, props.numbering, 1000)
          
          if (props.meal) mealIcon.value.classList.add('on')
          isChart.value = false
          emit('timeDurationSet', timeDuration(props.startTime, props.endTime))
        }
      }

      onMounted(() => {
        if (radialStart.value && radialEnd.value) {
          svgCircle.value.style.transform = `rotate(${timeToAngle(props.startTime)-90}deg)`
          radialStart.value.style.transform = `rotate(${timeToAngle(props.startTime)}deg)`
          radialStart.value.querySelector('img').style.transform = `rotate(-${timeToAngle(props.startTime)}deg)`
          radialEnd.value.style.transform = `rotate(${timeToAngle(props.startTime)}deg)`
        }
      })

      return {
        typeClass,
        lineChart,
        bloodChart,
        heartChart,
        svgCircle,
        spinner,
        radialStart,
        radialEnd,
        numberic,
        strokeWidth,
        radius,
        radiusB,
        circumference,
        dashoffset,
        rot,
        isChart,
        mealIcon,
        convertToPercentage,
        progress,
        timeToPercentage,
        timeToAngle,
        chartPlay
      }
    }
  }
</script>