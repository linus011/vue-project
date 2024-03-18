<template>
    <ui-collapses v-model="collapseVal">
        <ui-collapse v-for="(item, index) in collapseList" :key="index">
            <ui-collapse-head>
                {{ item.title }}
            </ui-collapse-head>
            <ui-collapse-panel>
                {{ item.text }}
            </ui-collapse-panel>
        </ui-collapse>
    </ui-collapses>
    <br><br>
    <ui-collapses v-model="collapseVal" accordion>
        <ui-collapse v-for="(item, index) in collapseList" :key="index">
            <ui-collapse-head>
                {{ item.title }}
            </ui-collapse-head>
            <ui-collapse-panel>
                {{ item.text }}
            </ui-collapse-panel>
        </ui-collapse>
    </ui-collapses>
    <!-- <ui-collapses v-model="collapseVal">
        <ui-collapse>
            <ui-collapse-head>
                제목1
            </ui-collapse-head>
            <ui-collapse-panel>
                내용1
            </ui-collapse-panel>
        </ui-collapse>
        <ui-collapse>
            <ui-collapse-head>
                제목2
            </ui-collapse-head>
            <ui-collapse-panel>
                내용2
            </ui-collapse-panel>
        </ui-collapse>
        <ui-collapse>
            <ui-collapse-head>
                제목3
            </ui-collapse-head>
            <ui-collapse-panel>
                내용3
            </ui-collapse-panel>
        </ui-collapse>
    </ui-collapses> -->
</template>

<script>
import { ref } from 'vue'
import uiCollapse from '../../components/global/uiCollapse.vue'

export default {
  components: { uiCollapse },
    setup() {
        const collapseVal = ref(3)
        const collapseList = ref([
            {
                title: '제목1',
                text : '내용1'
            },
            {
                title: '제목2',
                text : '내용2'
            },
            {
                title: '제목3',
                text : '내용3'
            }
        ])
        return {
            collapseVal,
            collapseList
        }
    }
}
</script>