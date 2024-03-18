<template>
  <div class="date-selector-wrap">
    <div class="date-selector">
      <div v-if="yr" class="ui-year"></div>
      <div v-if="mo" class="ui-month"></div>
      <div v-if="dy" class="ui-day"></div>
      <div v-if="hr" class="ui-hour"></div>
      <div v-if="min" class="ui-minute"></div>
    </div>
  </div>
</template>
<script>
import { ref, onMounted, computed, nextTick } from 'vue'
export default {
  props: {
    isVal: { type: [String, Number], default: null },
    yr: { type: Boolean, default: false },
    mo: { type: Boolean, default: false },
    dy: { type: Boolean, default: false },
    hr: { type: Boolean, default: false },
    min: { type: Boolean, default: false }
  },
  emits: ['dateState'],
  setup(props, context) {
    const { emit } = context

    const year = ref()
    const month = ref()
    const day = ref()
    const hour = ref()
    const minute = ref()

    const easing = {
      easeOutCubic: function (pos) {
        return Math.pow(pos - 1, 3) + 1
      },
      easeOutQuart: function (pos) {
        return -(Math.pow(pos - 1, 4) - 1)
      }
    }

    class IosSelector {
      constructor(options) {
        let defaults = {
          el: '',
          type: 'infinite',
          count: 4,
          sensitivity: 0.8,
          source: [],
          value: null,
          onChange: null
        }

        this.options = Object.assign({}, defaults, options)
        this.options.count = this.options.count - (this.options.count % 4)
        Object.assign(this, this.options)

        this.halfCount = this.options.count / 2
        this.quarterCount = this.options.count / 4
        this.a = this.options.sensitivity * 10
        this.minV = Math.sqrt(1 / this.a)
        this.selected = this.source[0]

        this.exceedA = 10
        this.moveT = 0
        this.moving = false

        this.elems = {
          el: document.querySelector(this.options.el),
          circleList: null,
          circleItems: null,

          highlight: null,
          highlightList: null,
          highListItems: null
        }
        this.events = {
          touchstart: null,
          touchmove: null,
          touchend: null
        }

        this.itemHeight = (this.elems.el.offsetHeight * 3) / this.options.count
        this.itemAngle = 360 / this.options.count
        this.radius =
          this.itemHeight / Math.tan((this.itemAngle * Math.PI) / 180)

        this.scroll = 0
        this._init()
      }

      _init() {
        this._create(this.options.source)

        let touchData = {
          startY: 0,
          yArr: []
        }

        for (let eventName in this.events) {
          this.events[eventName] = ((eventName) => {
            return (e) => {
              if (
                this.elems.el.contains(e.target) ||
                e.target === this.elems.el
              ) {
                e.preventDefault()
                if (this.source.length) {
                  this['_' + eventName](e, touchData)
                }
              }
            }
          })(eventName)
        }

        this.elems.el.addEventListener('touchstart', this.events.touchstart)
        document.addEventListener('mousedown', this.events.touchstart)
        this.elems.el.addEventListener('touchend', this.events.touchend)
        document.addEventListener('mouseup', this.events.touchend)
        if (this.source.length) {
          this.value = this.value !== null ? this.value : this.source[0].value
          this.select(this.value)
        }
      }

      _touchstart(e, touchData) {
        this.elems.el.addEventListener('touchmove', this.events.touchmove)
        document.addEventListener('mousemove', this.events.touchmove)
        let eventY = e.clientY || e.touches[0].clientY
        touchData.startY = eventY
        touchData.yArr = [[eventY, new Date().getTime()]]
        touchData.touchScroll = this.scroll
        this._stop()
      }

      _touchmove(e, touchData) {
        let eventY = e.clientY || e.touches[0].clientY
        touchData.yArr.push([eventY, new Date().getTime()])
        if (touchData.length > 5) {
          touchData.unshift()
        }

        let scrollAdd = (touchData.startY - eventY) / this.itemHeight
        let moveToScroll = scrollAdd + this.scroll

        if (this.type === 'normal') {
          if (moveToScroll < 0) {
            moveToScroll *= 0.3
          } else if (moveToScroll > this.source.length) {
            moveToScroll =
              this.source.length + (moveToScroll - this.source.length) * 0.3
          }
        } else {
          moveToScroll = this._normalizeScroll(moveToScroll)
        }

        touchData.touchScroll = this._moveTo(moveToScroll)
      }

      _touchend(e, touchData) {
        this.elems.el.removeEventListener('touchmove', this.events.touchmove)
        document.removeEventListener('mousemove', this.events.touchmove)

        let v

        if (touchData.yArr.length === 1) {
          v = 0
        } else {
          let startTime = touchData.yArr[touchData.yArr.length - 2][1]
          let endTime = touchData.yArr[touchData.yArr.length - 1][1]
          let startY = touchData.yArr[touchData.yArr.length - 2][0]
          let endY = touchData.yArr[touchData.yArr.length - 1][0]

          v =
            (((startY - endY) / this.itemHeight) * 1000) / (endTime - startTime)
          let sign = v > 0 ? 1 : -1

          v = Math.abs(v) > 30 ? 30 * sign : v
        }

        this.scroll = touchData.touchScroll
        this._animateMoveByInitV(v)
      }

      _create(source) {
        if (!source.length) {
          return
        }

        let template = `
      <div class="select-wrap">
        <ul class="select-options" style="transform: translate3d(0, 0, ${-this
          .radius}px) rotateX(0deg);">
          {{circleListHTML}}
          <!-- <li class="select-option">a0</li> -->
        </ul>
        <div class="highlight">
          <ul class="highlight-list">
            <!-- <li class="highlight-item"></li> -->
            {{highListHTML}}
          </ul>
        </div>
      </div>
    `

        if (this.options.type === 'infinite') {
          let concatSource = [].concat(source)
          while (concatSource.length < this.halfCount) {
            concatSource = concatSource.concat(source)
          }
          source = concatSource
        }
        this.source = source
        let sourceLength = source.length

        let circleListHTML = ''
        for (let i = 0; i < source.length; i++) {
          circleListHTML += `<li class="select-option"
                    style="
                      top: ${this.itemHeight * -0.5}px;
                      height: ${this.itemHeight}px;
                      line-height: ${this.itemHeight}px;
                      transform: rotateX(${
                        -this.itemAngle * i
                      }deg) translate3d(0, 0, ${this.radius}px);
                    "
                    data-index="${i}"
                    >${source[i].text}</li>`
        }

        let highListHTML = ''
        for (let i = 0; i < source.length; i++) {
          highListHTML += `<li class="highlight-item" style="height: ${this.itemHeight}px;">
                        ${source[i].text}
                      </li>`
        }

        if (this.options.type === 'infinite') {
          for (let i = 0; i < this.quarterCount; i++) {
            circleListHTML =
              `<li class="select-option"
                      style="
                        top: ${this.itemHeight * -0.5}px;
                        height: ${this.itemHeight}px;
                        line-height: ${this.itemHeight}px;
                        transform: rotateX(${
                          this.itemAngle * (i + 1)
                        }deg) translate3d(0, 0, ${this.radius}px);
                      "
                      data-index="${-i - 1}"
                      >${source[sourceLength - i - 1].text}</li>` +
              circleListHTML
            circleListHTML += `<li class="select-option"
                      style="
                        top: ${this.itemHeight * -0.5}px;
                        height: ${this.itemHeight}px;
                        line-height: ${this.itemHeight}px;
                        transform: rotateX(${
                          -this.itemAngle * (i + sourceLength)
                        }deg) translate3d(0, 0, ${this.radius}px);
                      "
                      data-index="${i + sourceLength}"
                      >${source[i].text}</li>`
          }

          highListHTML =
            `<li class="highlight-item" style="height: ${this.itemHeight}px;">
                          ${source[sourceLength - 1].text}
                      </li>` + highListHTML
          highListHTML += `<li class="highlight-item" style="height: ${this.itemHeight}px;">${source[0].text}</li>`
        }

        this.elems.el.innerHTML = template
          .replace('{{circleListHTML}}', circleListHTML)
          .replace('{{highListHTML}}', highListHTML)
        this.elems.circleList = this.elems.el.querySelector('.select-options')
        this.elems.circleItems =
          this.elems.el.querySelectorAll('.select-option')

        this.elems.highlight = this.elems.el.querySelector('.highlight')
        this.elems.highlightList =
          this.elems.el.querySelector('.highlight-list')
        this.elems.highlightitems =
          this.elems.el.querySelectorAll('.highlight-item')

        if (this.type === 'infinite') {
          this.elems.highlightList.style.top = -this.itemHeight + 'px'
        }

        this.elems.highlight.style.height = this.itemHeight + 'px'
        this.elems.highlight.style.lineHeight = this.itemHeight + 'px'
      }

      _normalizeScroll(scroll) {
        let normalizedScroll = scroll

        while (normalizedScroll < 0) {
          normalizedScroll += this.source.length
        }
        normalizedScroll = normalizedScroll % this.source.length
        return normalizedScroll
      }

      _moveTo(scroll) {
        if (this.type === 'infinite') {
          scroll = this._normalizeScroll(scroll)
        }
        this.elems.circleList.style.transform = `translate3d(0, 0, ${-this
          .radius}px) rotateX(${this.itemAngle * scroll}deg)`
        this.elems.highlightList.style.transform = `translate3d(0, ${
          -scroll * this.itemHeight
        }px, 0)`
        ;[...this.elems.circleItems].forEach((itemElem) => {
          if (Math.abs(itemElem.dataset.index - scroll) > this.quarterCount) {
            itemElem.style.visibility = 'hidden'
          } else {
            itemElem.style.visibility = 'visible'
          }
        })
        return scroll
      }

      async _animateMoveByInitV(initV) {
        let initScroll
        let finalScroll
        let finalV

        let totalScrollLen
        let a
        let t

        if (this.type === 'normal') {
          if (this.scroll < 0 || this.scroll > this.source.length - 1) {
            a = this.exceedA
            initScroll = this.scroll
            finalScroll = this.scroll < 0 ? 0 : this.source.length - 1
            totalScrollLen = initScroll - finalScroll

            t = Math.sqrt(Math.abs(totalScrollLen / a))
            initV = a * t
            initV = this.scroll > 0 ? -initV : initV
            finalV = 0
            await this._animateToScroll(initScroll, finalScroll, t)
          } else {
            initScroll = this.scroll
            a = initV > 0 ? -this.a : this.a
            t = Math.abs(initV / a)
            totalScrollLen = initV * t + (a * t * t) / 2
            finalScroll = Math.round(this.scroll + totalScrollLen)
            finalScroll =
              finalScroll < 0
                ? 0
                : finalScroll > this.source.length - 1
                ? this.source.length - 1
                : finalScroll

            totalScrollLen = finalScroll - initScroll
            t = Math.sqrt(Math.abs(totalScrollLen / a))
            await this._animateToScroll(
              this.scroll,
              finalScroll,
              t,
              'easeOutQuart'
            )
          }
        } else {
          initScroll = this.scroll

          a = initV > 0 ? -this.a : this.a
          t = Math.abs(initV / a)
          totalScrollLen = initV * t + (a * t * t) / 2 
          finalScroll = Math.round(this.scroll + totalScrollLen)
          await this._animateToScroll(
            this.scroll,
            finalScroll,
            t,
            'easeOutQuart'
          )
        }

        this._selectByScroll(this.scroll)
      }

      _animateToScroll(
        initScroll,
        finalScroll,
        t,
        easingName = 'easeOutQuart'
      ) {
        if (initScroll === finalScroll || t === 0) {
          this._moveTo(initScroll)
          return
        }

        let start = new Date().getTime() / 1000
        let pass = 0
        let totalScrollLen = finalScroll - initScroll

        return new Promise((resolve, reject) => {
          this.moving = true
          let tick = () => {
            pass = new Date().getTime() / 1000 - start

            if (pass < t) {
              this.scroll = this._moveTo(
                initScroll + easing[easingName](pass / t) * totalScrollLen
              )
              this.moveT = requestAnimationFrame(tick)
            } else {
              resolve()
              this._stop()
              this.scroll = this._moveTo(initScroll + totalScrollLen)
            }
          }
          tick()
        })
      }

      _stop() {
        this.moving = false
        cancelAnimationFrame(this.moveT)
      }

      _selectByScroll(scroll) {
        scroll = this._normalizeScroll(scroll) | 0
        if (scroll > this.source.length - 1) {
          scroll = this.source.length - 1
          this._moveTo(scroll)
        }
        this._moveTo(scroll)
        this.scroll = scroll
        this.selected = this.source[scroll]
        this.value = this.selected.value
        this.onChange && this.onChange(this.selected)
        emit('dateState', year.value, month.value, day.value, hour.value, minute.value)
      }

      updateSource(source) {
        this._create(source)

        if (!this.moving) {
          this._selectByScroll(this.scroll)
        }
      }

      select(value) {
        for (let i = 0; i < this.source.length; i++) {
          if (this.source[i].value === value) {
            window.cancelAnimationFrame(this.moveT)
            let initScroll = this._normalizeScroll(this.scroll)
            let finalScroll = i
            let t = Math.sqrt(Math.abs((finalScroll - initScroll) / this.a))
            this._animateToScroll(initScroll, finalScroll, t)
            setTimeout(() => this._selectByScroll(i))
            return
          }
        }
        throw new Error(
          `can not select value: ${value}, ${value} match nothing in current source`
        )
      }

      destroy() {
        this._stop()
        for (let eventName in this.events) {
          this.elems.el.removeEventListener('eventName', this.events[eventName])
        }
        document.removeEventListener('mousedown', this.events['touchstart'])
        document.removeEventListener('mousemove', this.events['touchmove'])
        document.removeEventListener('mouseup', this.events['touchend'])
        this.elems.el.innerHTML = ''
        this.elems = null
      }
    }

    const dateDataSet = () => {
      function getYears() {
        let currentYear = new Date().getFullYear()
        let years = []

        for (let i = currentYear - 20; i < currentYear + 20; i++) {
          years.push({
            value: i,
            text: i + '년'
          })
        }
        return years
      }

      function getMonths(year) {
        let months = []
        for (let i = 1; i <= 12; i++) {
          months.push({
            value: i,
            text: (i < 10) ? '0'+i + '월' : i + '월'
          })
        }
        return months
      }

      function getDays(year, month) {
        let dayCount = new Date(year, month, 0).getDate()
        let days = []

        for (let i = 1; i <= dayCount; i++) {
          days.push({
            value: i,
            text: (i < 10) ? '0'+i + '일' : i + '일'
          })
        }

        return days
      }

      let currentYear = new Date().getFullYear()
      let currentMonth = 1
      let currentDay = 1

      let yearSelector
      let monthSelector
      let daySelector
      let hourSelector
      let minuteSelector

      let yearSource = getYears()
      let monthSource = getMonths()
      let daySource = getDays(currentYear, currentMonth)

      let hours = new Array(24).fill(1).map((v, i) => {
        return { 
          value: i + 1, 
          text: (i < 9) ? '0'+(i+1) + '시' : (i+1) + '시'
        }
      })
      
      let minutes = new Array(60).fill(1).map((v, i) => {
        return { 
          value: i + 1, 
          text: (i < 9) ? '0'+(i+1) + '분' : (i+1) + '분'
        }
      })

      if(props.yr) {
        yearSelector = new IosSelector({
            el: '.ui-year',
            type: 'infinite',
            source: yearSource,
            count: 20,
            onChange: (selected) => {
                currentYear = selected.value
                daySource = getDays(currentYear, currentMonth)
                if(props.dy) daySelector.updateSource(daySource)
                year.value = yearSelector.value
            }
        })
      }

      if(props.mo) {
        monthSelector = new IosSelector({
            el: '.ui-month',
            type: 'infinite',
            source: monthSource,
            count: 20,
            onChange: (selected) => {
                currentMonth = selected.value
                daySource = getDays(currentYear, currentMonth)
                if(props.dy) daySelector.updateSource(daySource)
                month.value = monthSelector.value
            }
        })
      }

      if(props.dy) {
        daySelector = new IosSelector({
            el: '.ui-day',
            type: 'infinite',
            source: daySource,
            count: 20,
            onChange: (selected) => {
                currentDay = selected.value
                day.value = daySelector.value
            }
        })
      }

      if(props.hr) {
        hourSelector = new IosSelector({
            el: '.ui-hour',
            type: 'normal',
            source: hours,
            count: 20,
            onChange: (selected) => {
              currentDay = selected.value
              hour.value = hourSelector.value
            }
        })
      }

      if(props.min) {
        minuteSelector = new IosSelector({
            el: '.ui-minute',
            type: 'normal',
            source: minutes,
            count: 20,
            onChange: (selected) => {
              currentDay = selected.value
              minute.value = minuteSelector.value
            }
        })
      }

      let getYear = null
      let getMonth = null
      let getDay = null
      let getHour = null
      let getMinute = null

      const dateTimeString = () => {
        if(props.isVal !== null) {
          const dateTimeString = props.isVal.toString();
          const [datePart, timePart] = dateTimeString.split(' ');
          if(props.yr && props.mo && props.dy & props.hr && props.min) {
            [getYear, getMonth, getDay] = datePart.split('-');
            [getHour, getMinute] = timePart.split(':');
          }
          if((props.yr && !props.mo && !props.dy && !props.hr && !props.min)) getYear = props.isVal
          if((!props.yr && props.mo && !props.dy && !props.hr && !props.min)) getMonth = props.isVal
          if((!props.yr && !props.mo && props.dy && !props.hr && !props.min)) getDay = props.isVal
          if((!props.yr && !props.mo && !props.dy && props.hr && !props.min)) getHour = props.isVal
          if((!props.yr && !props.mo && !props.dy && !props.hr && props.min)) getMinute = props.isVal
          if(!props.yr && !props.mo && !props.dy && props.hr && props.min) [getHour, getMinute] = dateTimeString.split(':');
        }
        if(props.yr) yearSelector.select((getYear == null) ? now.getFullYear() : Number(getYear))
        if(props.mo) monthSelector.select((getMonth == null) ? now.getMonth()+1 : Number(getMonth))
        if(props.dy) daySelector.select((getDay == null) ? now.getDate() : Number(getDay))
        if(props.hr) hourSelector.select((getHour == null) ? now.getHours() : Number(getHour))
        if(props.min) minuteSelector.select((getMinute == null) ? now.getMinutes() : Number(getMinute))
      }

      let now = new Date()

      setTimeout(function () {
        dateTimeString()
      })
    }

    onMounted(() => {
      dateDataSet()
    })

    return {
      year,
      month,
      day,
      hour,
      minute,
      dateDataSet
    }
  }
}
</script>