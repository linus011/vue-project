<template>
    <div class="g-snb">
        <ul></ul>
    </div>
    <div class="g-component">
        <div class="scroller">
            <h3>Charts</h3>
            <div class="g-component-section">
                <h4>Doughnut</h4>
                <div class="g-component-section-sub">
                    <h5>Default</h5>
                    <div class="component-info">
                        <div class="component-guide">
                            <div class="component-guide-item">
                                <h6>options guide</h6>
                                <ul>
                                    <li>radial - radial 차트</li>
                                    <li>:size="124" - 차트 사이즈</li>
                                    <li>stroke="#FFD633" - 차트 컬러</li>
                                    <li>iconBg="#FFB800" - 아이콘 배경컬러</li>
                                    <li>color="#FFBC00" - 수치 컬러</li>
                                    <li>:border="20" - 차트 두께</li>
                                    <li>:per="80" - 수치값</li>
                                </ul>
                            </div>
                        </div>
                        <div class="component-ex">
                            <div class="component-tag">
                                <life-log-chart
                                    radial
                                    :size="124"
                                    stroke="#bbb"
                                    iconBg="#FFB800"
                                    color="#FFBC00"
                                    :border="20"
                                    :per="80"
                                />
                            </div>
                            <button ref="toggleCodeButton" type="button" class="btn-toggle-code" @click="toggleCode">
                                <span class="offscreen">code view</span>
                            </button>
                        </div>
                        <div class="component-code">
                            <code-highlight lang="javascript" :code="doughnutDefault"></code-highlight>
                        </div>
                    </div>
                </div>
                <div class="g-component-section-sub">
                    <h5>Icon</h5>
                    <div class="component-info">
                        <div class="component-guide">
                            <div class="component-guide-item">
                                <p>끝나는 점에 아이콘 적용한 케이스</p>
                            </div>
                            <div class="component-guide-item">
                                <h6>options guide</h6>
                                <ul>
                                    <li>radial - radial 차트</li>
                                    <li>:size="124" - 차트 사이즈</li>
                                    <li>stroke="#FFD633" - 차트 컬러</li>
                                    <li>iconBg="#FFB800" - 아이콘 배경컬러</li>
                                    <li>color="#FFBC00" - 수치 컬러</li>
                                    <li>:border="20" - 차트 두께</li>
                                    <li>:per="80" - 수치값</li>
                                    <li>:endImg="'icon-radial-walk.svg'" - 차트 끝 이미지</li>
                                </ul>
                            </div>
                        </div>
                        <div class="component-ex">
                            <div class="component-tag">
                                <life-log-chart
                                    radial
                                    :size="124"
                                    stroke="#FFD633"
                                    iconBg="#FFB800"
                                    color="#FFBC00"
                                    :border="20"
                                    :per="80"
                                    :endImg="'icon-radial-walk.svg'"
                                />
                            </div>
                            <button ref="toggleCodeButton" type="button" class="btn-toggle-code" @click="toggleCode">
                                <span class="offscreen">code view</span>
                            </button>
                        </div>
                        <div class="component-code">
                            <code-highlight lang="javascript" :code="doughnutIcon"></code-highlight>
                        </div>
                    </div>
                </div>
                <div class="g-component-section-sub">
                    <h5>Numberic</h5>
                    <div class="component-info">
                        <div class="component-guide">
                            <div class="component-guide-item">
                                <p>수치 애니메이션 적용한 케이스</p>
                            </div>
                            <div class="component-guide-item">
                                <h6>options guide</h6>
                                <ul>
                                    <li>radial - radial 차트</li>
                                    <li>numData - 수치 표기</li>
                                    <li>:size="124" - 차트 사이즈</li>
                                    <li>stroke="#FFD633" - 차트 컬러</li>
                                    <li>color="#FFBC00" - 수치 컬러</li>
                                    <li>:border="20" - 차트 두께</li>
                                    <li>:per="80" - 수치값</li>
                                </ul>
                            </div>
                        </div>
                        <div class="component-ex">
                            <div class="component-tag">
                                <life-log-chart
                                    radial
                                    numData
                                    :size="124"
                                    stroke="#FFD633"
                                    iconBg="#FFB800"
                                    color="#FFBC00"
                                    :border="20"
                                    :per="80"
                                />
                            </div>
                            <button ref="toggleCodeButton" type="button" class="btn-toggle-code" @click="toggleCode">
                                <span class="offscreen">code view</span>
                            </button>
                        </div>
                        <div class="component-code">
                            <code-highlight lang="javascript" :code="doughnutNumberic"></code-highlight>
                        </div>
                    </div>
                </div>
                <div class="g-component-section-sub">
                    <h5>식사차트</h5>
                    <div class="component-info">
                        <div class="component-guide">
                            <div class="component-guide-item">
                                <p>아침, 점심, 저녁 식사 칼로리 적용한 케이스</p>
                            </div>
                            <div class="component-guide-item">
                                <h6>options guide</h6>
                                <ul>
                                    <li>radial - radial 차트</li>
                                    <li>meal - 식사 차트</li>
                                    <li>breakfast - 아침식사</li>
                                    <li>lunch - 점심식사</li>
                                    <li>dinner - 저녁식사</li>
                                    <li>:size="98" - 차트 사이즈</li>
                                    <li>stroke="#FFD633" - 차트 컬러</li>
                                    <li>:border="12" - 차트 두께</li>
                                    <li>:per="90" - 수치값</li>
                                </ul>
                            </div>
                        </div>
                        <div class="component-ex">
                            <div class="component-tag">
                                <life-log-chart
                                    radial
                                    meal
                                    breakfast
                                    :size="98"
                                    stroke="#3F86F1"
                                    :border="12"
                                    :per="30"
                                />
                                <life-log-chart
                                    radial
                                    meal
                                    lunch
                                    :size="98"
                                    stroke="#EB5147"
                                    :border="12"
                                    :per="90"
                                />
                                <life-log-chart
                                    radial
                                    meal
                                    dinner
                                    :size="98"
                                    stroke="#00C378"
                                    :border="12"
                                    :per="60"
                                />
                            </div>
                            <button ref="toggleCodeButton" type="button" class="btn-toggle-code" @click="toggleCode">
                                <span class="offscreen">code view</span>
                            </button>
                        </div>
                        <div class="component-code">
                            <code-highlight lang="javascript" :code="doughnutMeal"></code-highlight>
                        </div>
                    </div>
                </div>
                <div class="g-component-section-sub">
                    <h5>수면시간차트</h5>
                    <div class="component-info">
                        <div class="component-guide">
                            <div class="component-guide-item">
                                <p>수면시간 적용한 케이스</p>
                            </div>
                            <div class="component-guide-item">
                                <h6>options guide</h6>
                                <ul>
                                    <li>radial - radial 차트</li>
                                    <li>:size="64" - 차트 사이즈</li>
                                    <li>stroke="#FFD633" - 차트 컬러</li>
                                    <li>:border="20" - 차트 두께</li>
                                    <li>:startTime="'13:00'" - 수면 시작시간</li>
                                    <li>:endTime="'00:00'" - 수면 종료시간</li>
                                </ul>
                            </div>
                        </div>
                        <div class="component-ex">
                            <div class="component-tag">
                                <life-log-chart
                                    radial
                                    :size="64"
                                    stroke="#00C378"
                                    :border="12"
                                    :startTime="'13:00'"
                                    :endTime="'00:00'"
                                />
                            </div>
                            <button ref="toggleCodeButton" type="button" class="btn-toggle-code" @click="toggleCode">
                                <span class="offscreen">code view</span>
                            </button>
                        </div>
                        <div class="component-code">
                            <code-highlight lang="javascript" :code="doughnutSleepTime"></code-highlight>
                        </div>
                    </div>
                </div>
            </div>
            <div class="g-component-section">
                <h4>Line</h4>
                <div class="g-component-section-sub">
                    <h5>체성분</h5>
                    <div class="component-info">
                        <div class="component-guide">
                            <div class="component-guide-item">
                                <p>체성분 수치 표현한 차트</p>
                            </div>
                            <div class="component-guide-item">
                                <h6>options guide</h6>
                                <ul>
                                    <li>line - line 차트</li>
                                    <li>male - 남성</li>
                                    <li>female - 여성</li>
                                    <li>body - 체성분 차트</li>
                                    <li>:chartData = "bodyChartList" - 수치 데이터</li>
                                </ul>
                            </div>
                        </div>
                        <div class="component-ex">
                            <div class="component-tag">
                                <div style="width: 200px; height: 120px; position: relative;">
                                    <life-log-chart
                                        line
                                        female
                                        body
                                        :chartData="bodyChartList"
                                    />
                                </div>
                            </div>
                            <button ref="toggleCodeButton" type="button" class="btn-toggle-code" @click="toggleCode">
                                <span class="offscreen">code view</span>
                            </button>
                        </div>
                        <div class="component-code">
                            <code-highlight lang="javascript" :code="lineBody"></code-highlight>
                        </div>
                    </div>
                </div>
                <div class="g-component-section-sub">
                    <h5>혈당</h5>
                    <div class="component-info">
                        <div class="component-guide">
                            <div class="component-guide-item">
                                <p>혈당 수치 표현한 차트</p>
                            </div>
                            <div class="component-guide-item">
                                <h6>options guide</h6>
                                <ul>
                                    <li>line - 라인차트</li>
                                    <li>bloodSugar - 혈당</li>
                                    <li>:chartData = "bloodSugarChartList" - 수치데이터</li>
                                </ul>
                            </div>
                        </div>
                        <div class="component-ex">
                            <div class="component-tag">
                                <div style="width: 200px; height: 120px; position: relative;">
                                    <life-log-chart
                                        line
                                        bloodSugar
                                        :chartData="bloodSugarChartList"
                                    />
                                </div>
                            </div>
                            <button ref="toggleCodeButton" type="button" class="btn-toggle-code" @click="toggleCode">
                                <span class="offscreen">code view</span>
                            </button>
                        </div>
                        <div class="component-code">
                            <code-highlight lang="javascript" :code="lineBloodSugar"></code-highlight>
                        </div>
                    </div>
                </div>
            </div>
            <div class="g-component-section">
                <h4>Bar</h4>
                <div class="g-component-section-sub">
                    <h5>혈압</h5>
                    <div class="component-info">
                        <div class="component-guide">
                            <div class="component-guide-item">
                                <p>혈압 수치 표현한 차트</p>
                            </div>
                            <div class="component-guide-item">
                                <h6>options guide</h6>
                                <ul>
                                    <li>lblood - 혈압 차트</li>
                                    <li>:chartData = "bloodPressureChartList" - 수치 데이터</li>
                                </ul>
                            </div>
                        </div>
                        <div class="component-ex">
                            <div class="component-tag">
                                <div style="width: 200px; height: 120px; position: relative;">
                                    <life-log-chart
                                        blood
                                        :chartData="bloodPressureChartList"
                                    />
                                </div>
                            </div>
                            <button ref="toggleCodeButton" type="button" class="btn-toggle-code" @click="toggleCode">
                                <span class="offscreen">code view</span>
                            </button>
                        </div>
                        <div class="component-code">
                            <code-highlight lang="javascript" :code="barBloodPressure"></code-highlight>
                        </div>
                    </div>
                </div>
                <div class="g-component-section-sub">
                    <h5>심박</h5>
                    <div class="component-info">
                        <div class="component-guide">
                            <div class="component-guide-item">
                                <p>심박 수치 표현한 차트</p>
                            </div>
                            <div class="component-guide-item">
                                <h6>options guide</h6>
                                <ul>
                                    <li>heart - 하트차트</li>
                                    <li>:chartData = "heartRateChartList" - 수치데이터</li>
                                </ul>
                            </div>
                        </div>
                        <div class="component-ex">
                            <div class="component-tag">
                                <div style="width: 200px; height: 120px; position: relative;">
                                    <life-log-chart 
                                        heart 
                                        :chartData="heartRateChartList"
                                    />
                                </div>
                            </div>
                            <button ref="toggleCodeButton" type="button" class="btn-toggle-code" @click="toggleCode">
                                <span class="offscreen">code view</span>
                            </button>
                        </div>
                        <div class="component-code">
                            <code-highlight lang="javascript" :code="barHeartRate"></code-highlight>
                        </div>
                    </div>
                </div>
            </div>
            <div class="g-component-section">
                <h4>Bubble</h4>
                <div class="component-info">
                    <div class="component-guide">
                        <div class="component-guide-item">
                            <h5>options guide</h5>
                            <ul>
                                <li>:chartData = "chartData" - 차트 데이터</li>
                            </ul>
                        </div>
                    </div>
                    <div class="component-ex">
                        <div class="component-tag">
                            <div class="ui-bubble-wrap">
                                <ui-bubble-chart 
                                    :chartData = "bubbleData" 
                                />
                            </div>
                        </div>
                        <button ref="toggleCodeButton" type="button" class="btn-toggle-code" @click="toggleCode">
                            <span class="offscreen">code view</span>
                        </button>
                    </div>
                    <div class="component-code">
                        <code-highlight lang="javascript" :code="bubbleChart"></code-highlight>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, nextTick, onMounted, onUpdated } from 'vue'
import codeHighlight from './codeHighlight.vue'

export default {
    components: {
        codeHighlight
    },
    setup() {
        const doughnutDefault = ref(
`<life-log-chart
    radial
    numData
    :size="124"
    stroke="#FFD633"
    iconBg="#FFB800"
    color="#FFBC00"
    :border="20"
    :per="80"
    :endImg="'icon-radial-walk.svg'"
/>`)
        const doughnutIcon = ref(
`<life-log-chart
    radial
    :size="124"
    stroke="#FFD633"
    iconBg="#FFB800"
    color="#FFBC00"
    :border="20"
    :per="80"
    :endImg="'icon-radial-walk.svg'"
/>`)
        const doughnutNumberic = ref(
`<life-log-chart
    radial
    numData
    :size="124"
    stroke="#FFD633"
    iconBg="#FFB800"
    color="#FFBC00"
    :border="20"
    :per="80"
/>`)
        const doughnutMeal = ref(
`<life-log-chart
    radial
    meal
    breakfast
    :size="98"
    stroke="#3F86F1"
    :border="12"
    :per="30"
/>
<life-log-chart
    radial
    meal
    lunch
    :size="98"
    stroke="#EB5147"
    :border="12"
    :per="90"
/>
<life-log-chart
    radial
    meal
    dinner
    :size="98"
    stroke="#00C378"
    :border="12"
    :per="60"
/>`)
        const doughnutSleepTime = ref(
`<life-log-chart
    radial
    :size="64"
    stroke="#00C378"
    :border="12"
    :startTime="'13:00'"
    :endTime="'00:00'"
/>`)
        const lineBody = ref(
`<life-log-chart
    line
    female
    body
    :chartData="bodyChartList"
/>
`)
        const lineBloodSugar = ref(
`<life-log-chart
    line
    bloodSugar
    :chartData="bloodSugarChartList"
/>
`)
        const barBloodPressure = ref(
`<life-log-chart
    blood
    :chartData="bloodPressureChartList"
/>`)
        const barHeartRate = ref(
`<life-log-chart 
    heart 
    :chartData="heartRateChartList"
/>`)
        const bubbleChart = ref(
`<div class="ui-bubble-wrap">
    <ui-bubble-chart :chartData = "chartData" />
</div>`)
        const bodyChartList = ref([14, 16, 22, 24, 28, 26, 12])
        const bloodPressureChartList = ref([
            {
            sis: 90,
            dia: 60
            },
            {
            sis: 120,
            dia: 80
            },
            {
            sis: 130,
            dia: 85
            },
            {
            sis: 170,
            dia: 110
            },
            {
            sis: 100,
            dia: 70
            },
            {
            sis: 100,
            dia: 50
            },
            {
            sis: 125,
            dia: 85
            }
        ])
        const heartRateChartList = ref([60, 80, 100, 60, 50, 40, 30])
        const bloodSugarChartList = ref([
            { key: '식후', val: 65 },
            { key: '식후', val: 80 },
            { key: '식전', val: 120 },
            { key: '식전', val: 90 },
            { key: '식후', val: 130 },
            { key: '식전', val: 90 },
            { key: '식후', val: 130 }
        ])
        const bubbleData = ref(
            { 저혈압: 3, 정상: 2, 고혈압전단계: 1, 고혈압1단계: 1, 고혈압2단계: 1 }
        )

        const toggleCode = (e) => {
            const btn = e.target
            const code = btn.closest('.component-info').querySelector('.component-code')
            const viewer = code.querySelector('.code-viewer')
            const codeHeight = viewer.offsetHeight
            const codeMarginTop = parseInt(window.getComputedStyle(viewer).marginTop)
            if(btn.classList.contains('show')) {
                btn.classList.remove('show')
                code.style.height = 0
            } else {
                btn.classList.add('show')
                code.style.height = `${codeHeight + codeMarginTop}px`
            }
        }

        const snbSet = () => {
            const section = document.querySelectorAll('.g-component-section')
            const snv = document.querySelector('.g-snb ul')
            section.forEach((item, index) => {
                const title = item.querySelector('h4').textContent
                item.setAttribute('id', `target-${index}`)
                snv.insertAdjacentHTML('beforeend', `<li class="menu-${index}"><button type="button" data-target="target-${index}" class="section-link">${title}</button></li>`)
                if(item.querySelectorAll('.g-component-section-sub').length > 0 && !document.querySelector(`.menu-${index}`).querySelector('ul')) {
                    let ulHtml = '<ul>'
                    item.querySelectorAll('.g-component-section-sub').forEach((subItem, subIndex) => {
                        const subTitle = subItem.querySelector('h5').textContent
                        subItem.setAttribute('id', `target-${index}-${subIndex}`)
                        ulHtml += `<li><button type="button" data-target="target-${index}-${subIndex}" class="section-link">${subTitle}</button></li>`
                    })
                    ulHtml += '</ul>'
                    document.querySelector(`.menu-${index}`).insertAdjacentHTML('beforeend', ulHtml)
                }
            })
            document.addEventListener('click', function(e) {
                if (e.target.matches('.section-link')) {
                    getSiblings(e.target.parentNode).forEach( t => {
                        t.querySelector('.section-link').classList.remove('active')
                    })
                    e.target.classList.add('active')
                    const scroller = document.querySelector('.scroller')
                    const _target = document.querySelector('#'+e.target.getAttribute('data-target'))
                    scroller.scrollTo({ top : _target.offsetTop, behavior : "smooth" })
                }
            })
        }

        const getSiblings = (elem) => {
            let siblings = []
            let sibling = elem.parentNode.firstChild
            while (sibling) {
                if (sibling.nodeType === 1 && sibling !== elem) {
                    siblings.push(sibling)
                }
                sibling = sibling.nextSibling
            }
            return siblings
        }

        onMounted(() => {
            snbSet()
        })

        return {
            doughnutDefault,
            doughnutIcon,
            doughnutNumberic,
            doughnutMeal,
            doughnutSleepTime,
            lineBody,
            lineBloodSugar,
            barBloodPressure,
            barHeartRate,
            bubbleChart,
            bodyChartList,
            bloodPressureChartList,
            heartRateChartList,
            bloodSugarChartList,
            bubbleData,
            toggleCode,
            snbSet
        }
    }
}
</script>