import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'

import '@/plugins/lodash'
import 'vue3-toastify/dist/index.css'

import uiCommon from '@/assets/front/js/ui_common.js'
import anime from 'animejs/lib/anime.es.js'
// import uiButton from '@/components/global/uiButton.vue' // 버튼
// import uiPop from '@/components/global/uiPop.vue' // 팝업
// import uiTabOld from '@/components/global/uiTabOld.vue' // 탭
// import uiTabsOld from '@/components/global/uiTabsOld.vue' // 탭
// import uiTab from '@/components/global/uiTab.vue' // 탭2
// import uiTabs from '@/components/global/uiTabs.vue' // 탭2
// import uiTabPanel from '@/components/global/uiTabPanel.vue' // 탭2
// import uiInput from '@/components/global/uiInput.vue' // input
// import uiDatepicker from '@/components/global/uiDatepicker.vue' // datepicker
// import uiRadio from '@/components/global/uiRadio.vue' // radio button
// import uiCheckBox from '@/components/global/uiCheckBox.vue' // checkbox
// import uiSelect from '@/components/global/uiSelect.vue' // select
// import uiCollapses from '@/components/global/uiCollapses.vue' // Collapse
// import uiCollapse from '@/components/global/uiCollapse.vue' // Collapse
// import uiCollapseHead from '@/components/global/uiCollapseHead.vue' // Collapse
// import uiCollapsePanel from '@/components/global/uiCollapsePanel.vue' // Collapse
// import uiButtonTop from '@/components/global/uiButtonTop.vue' // 탑이동버튼
import components from '@/components/components'
import VueHighlightJS from 'vue3-highlightjs'
import 'highlight.js/styles/solarized-light.css'


/** @moment */
import dayjs from 'dayjs'
/** @emitter */
import eventBus from '@/core/eventBus'
window.emitter = eventBus

/** @request */
import request from '@/core/request'
window.$api = request

const app = createApp(App)
app.use(router)
app.use(store)
app.provide('dayJS', dayjs)
app.use(uiCommon)
app.config.globalProperties.$anime = anime
// app.component('ui-button', uiButton)
// app.component('ui-pop', uiPop)
// app.component('ui-tab-old', uiTabOld)
// app.component('ui-tabs-old', uiTabOld)
// app.component('ui-tab', uiTab)
// app.component('ui-tabs', uiTabs)
// app.component('ui-tab-panel', uiTabPanel)
// app.component('ui-input', uiInput)
// app.component('ui-datepicker', uiDatepicker)
// app.component('ui-radio', uiRadio)
// app.component('ui-check-box', uiCheckBox)
// app.component('ui-select', uiSelect)
// app.component('ui-collapses', uiCollapses)
// app.component('ui-collapse', uiCollapse)
// app.component('ui-collapse-head', uiCollapseHead)
// app.component('ui-collapse-panel', uiCollapsePanel)
// app.component('ui-button-top', uiButtonTop)
app.use(components)
app.use(VueHighlightJS)
app.mount('#app')