<template>
    <life-log-chart
        radial
        numData
        :size="124"
        stroke="#FFD633"
        iconBg="#FFB800"
        color="#FFBC00"
        :border="20"
        :per="80"
        :endImg="'icon-radial-walk.svg'"
    />
    <br>
    <life-log-chart
        radial
        :size="64"
        stroke="#00C378"
        :border="12"
        :startTime="'13:00'"
        :endTime="'00:00'"
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
    <div style="width: 200px; height: 120px; position: relative;">
        <life-log-chart
            line
            female
            body
            :chartData="bodyChartList"
        />
        <!--
            line - line 차트
            male - 남성
            female - 여성
            body - 체성분 차트
            :chartData = "bodyChartList" - 수치 데이터
        -->
    </div>
    <life-log-chart
        radial
        numData
        :size="124"
        stroke="#3F86F1"
        iconBg="#2056A8"
        color="#3F86F1"
        :border="20"
        :per="80"
        :endImg="'icon-radial-exer.svg'"
    />
    <!--
        radial - radial 차트
        numData - 수치 표기
        :size="124" - 차트 사이즈
        stroke="#3F86F1" - 차트 컬러
        iconBg="#FFB800" - 아이콘 배경컬러
        color="#3F86F1" - 수치 컬러
        :border="20" - 차트 두께
        :per="80" - 수치값
        :endImg="'icon-radial-exer.svg'" - 차트 끝 이미지
    -->
    <life-log-chart
        radial
        :size="64"
        stroke="#00C378"
        :border="12"
        :per="70"
    />
    <!--
        radial - radial 차트
        :size="64" - 차트 사이즈
        stroke="#00C378" - 차트 컬러
        :border="12" - 차트 두께
        :per="70" - 수치
    -->
    <div style="width: 200px; height: 120px; position: relative;">
        <life-log-chart
            blood
            :chartData="bloodPressureChartList"
        />
        <!--
            blood - 혈압 차트
            :chartData = "bloodPressureChartList" - 수치 데이터
        -->
    </div>
    <div style="width: 200px; height: 120px; position: relative;">
        <life-log-chart
            line
            bloodSugar
            :chartData="bloodSugarChartList"
        />
        <!-- 
            line - 라인차트
            bloodSugar - 혈당
            :chartData = "bloodSugarChartList" - 수치데이터
        -->
    </div>
    <div style="width: 200px; height: 120px; position: relative;">
        <life-log-chart 
            heart 
            :chartData="heartRateChartList"
        />
        <!--
            heart - 하트차트
            :chartData = "heartRateChartList" - 수치데이터
        -->
    </div>
</template>

<script>
import { ref } from 'vue'

export default {
    setup() {
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
        return {
            bodyChartList,
            bloodPressureChartList,
            heartRateChartList,
            bloodSugarChartList
        }
    }
}
</script>