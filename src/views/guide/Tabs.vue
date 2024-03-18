<template>
    <div class="g-snb">
        <ul></ul>
    </div>
    <div class="g-component">
        <div class="scroller">
            <h3>Tabs</h3>
            <div class="g-component-section">
                <h4>Default</h4>
                <div class="component-info">
                    <div class="component-ex">
                        <div class="component-tag">
                            <div style="width: 360px;">
                                <ui-tabs v-model="tabVal">
                                    <template #tabs>
                                        <ui-tab v-for="(item, index) in tabList" :key="index">
                                            {{ item.title }}
                                        </ui-tab>
                                    </template>
                                    <template #panels>
                                        <ui-tab-panel v-for="(item, index) in tabList" :key="index">
                                            <span :style="{ color: item.color }">
                                                {{ item.txt }}
                                            </span>
                                        </ui-tab-panel>
                                    </template>
                                </ui-tabs>
                            </div>
                        </div>
                        <button ref="toggleCodeButton" type="button" class="btn-toggle-code" @click="toggleCode">
                            <span class="offscreen">code view</span>
                        </button>
                    </div>
                    <div class="component-code">
                        <code-highlight lang="javascript" :code="tabDefault"></code-highlight>
                    </div>
                </div>
            </div>
            <div class="g-component-section">
                <h4>Bar Type</h4>
                <div class="component-info">
                    <div class="component-ex">
                        <div class="component-tag">
                            <div style="width: 360px;">
                                <ui-tabs v-model="tabVal" bar>
                                    <template #tabs>
                                        <ui-tab v-for="(item, index) in tabList" :key="index">
                                            {{ item.title }}
                                        </ui-tab>
                                    </template>
                                    <template #panels>
                                        <ui-tab-panel v-for="(item, index) in tabList" :key="index">
                                            <span :style="{ color: item.color }">
                                                {{ item.txt }}
                                            </span>
                                        </ui-tab-panel>
                                    </template>
                                </ui-tabs>
                            </div>
                        </div>
                        <button ref="toggleCodeButton" type="button" class="btn-toggle-code" @click="toggleCode">
                            <span class="offscreen">code view</span>
                        </button>
                    </div>
                    <div class="component-code">
                        <code-highlight lang="javascript" :code="tabBar"></code-highlight>
                    </div>
                </div>
            </div>
            <div class="g-component-section">
                <h4>Box Type</h4>
                <div class="component-info">
                    <div class="component-ex">
                        <div class="component-tag">
                            <div style="width: 360px;">
                                <ui-tabs v-model="tabVal" box>
                                    <template #tabs>
                                        <ui-tab v-for="(item, index) in tabList" :key="index">
                                            {{ item.title }}
                                        </ui-tab>
                                    </template>
                                    <template #panels>
                                        <ui-tab-panel v-for="(item, index) in tabList" :key="index">
                                            <span :style="{ color: item.color }">
                                                {{ item.txt }}
                                            </span>
                                        </ui-tab-panel>
                                    </template>
                                </ui-tabs>
                            </div>
                        </div>
                        <button ref="toggleCodeButton" type="button" class="btn-toggle-code" @click="toggleCode">
                            <span class="offscreen">code view</span>
                        </button>
                    </div>
                    <div class="component-code">
                        <code-highlight lang="javascript" :code="tabBox"></code-highlight>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, nextTick, onMounted, onUpdated } from 'vue'
import uiPop from '../../components/global/uiPop.vue'
import uiButton from '../../components/global/uiButton.vue'
import codeHighlight from './codeHighlight.vue'


export default {
    components: { 
        uiPop,
        uiButton,
        codeHighlight
    },
    setup() {
        const tabDefault = ref(
`<ui-tabs v-model="tabVal">
    <template #tabs>
        <ui-tab v-for="(item, index) in tabList" :key="index">
            {{ item.title }}
        </ui-tab>
    </template>
    <template #panels>
        <ui-tab-panel v-for="(item, index) in tabList" :key="index">
            <span :style="{ color: item.color }">
                {{ item.txt }}
            </span>
        </ui-tab-panel>
    </template>
</ui-tabs>`)

        const tabBar = ref(
`<ui-tabs v-model="tabVal" bar>
    <template #tabs>
        <ui-tab v-for="(item, index) in tabList" :key="index">
            {{ item.title }}
        </ui-tab>
    </template>
    <template #panels>
        <ui-tab-panel v-for="(item, index) in tabList" :key="index">
            <span :style="{ color: item.color }">
                {{ item.txt }}
            </span>
        </ui-tab-panel>
    </template>
</ui-tabs>`)

        const tabBox = ref(
`<ui-tabs v-model="tabVal" box>
    <template #tabs>
        <ui-tab v-for="(item, index) in tabList" :key="index">
            {{ item.title }}
        </ui-tab>
    </template>
    <template #panels>
        <ui-tab-panel v-for="(item, index) in tabList" :key="index">
            <span :style="{ color: item.color }">
                {{ item.txt }}
            </span>
        </ui-tab-panel>
    </template>
</ui-tabs>`)
        const tabVal = ref(0)
        const tabList = ref([
            { title: '탭메뉴1', color: 'black', txt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.' },
            { title: '탭메뉴2', color: 'blue', txt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.' },
            { title: '탭메뉴3', color: 'blueviolet', txt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.' },
            { title: '탭메뉴4', color: 'aquamarine', txt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.' },
            { title: '탭메뉴5', color: 'brown', txt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
            { title: '탭메뉴6', color: 'burlywood', txt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.' }
        ])

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
                snv.insertAdjacentHTML('beforeend', `<li><button type="button" data-target="target-${index}" class="section-link">${title}</button></li>`)
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
            tabDefault,
            tabBar,
            tabBox,
            tabVal,
            tabList,
            toggleCode,
            snbSet
        }
    }
}
</script>