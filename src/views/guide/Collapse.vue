<template>
    <div class="g-snb">
        <ul></ul>
    </div>
    <div class="g-component">
        <div class="scroller">
            <h3>Collapse</h3>
            <div class="g-component-section">
                <h4>Default</h4>
                <div class="component-info">
                    <div class="component-ex">
                        <div class="component-tag">
                            <div style="width: 360px;">
                                <ui-collapses v-model="collapseVal">
                                    <ui-collapse>
                                        <ui-collapse-head>
                                            제목1
                                        </ui-collapse-head>
                                        <ui-collapse-panel>
                                            내용1
                                        </ui-collapse-panel>
                                    </ui-collapse>
                                </ui-collapses>
                            </div>
                        </div>
                        <button ref="toggleCodeButton" type="button" class="btn-toggle-code" @click="toggleCode">
                            <span class="offscreen">code view</span>
                        </button>
                    </div>
                    <div class="component-code">
                        <code-highlight lang="javascript" :code="defaultCollapse"></code-highlight>
                    </div>
                </div>
            </div>
            <div class="g-component-section">
                <h4>Multiple</h4>
                <div class="component-info">
                    <div class="component-ex">
                        <div class="component-tag">
                            <div style="width: 360px;">
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
                            </div>
                        </div>
                        <button ref="toggleCodeButton" type="button" class="btn-toggle-code" @click="toggleCode">
                            <span class="offscreen">code view</span>
                        </button>
                    </div>
                    <div class="component-code">
                        <code-highlight lang="javascript" :code="multipleCollapse"></code-highlight>
                    </div>
                </div>
            </div>
            <div class="g-component-section">
                <h4>Accordion</h4>
                <div class="component-info">
                    <div class="component-ex">
                        <div class="component-tag">
                            <div style="width: 360px;">
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
                            </div>
                        </div>
                        <button ref="toggleCodeButton" type="button" class="btn-toggle-code" @click="toggleCode">
                            <span class="offscreen">code view</span>
                        </button>
                    </div>
                    <div class="component-code">
                        <code-highlight lang="javascript" :code="accordionCollapse"></code-highlight>
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
        const collapseVal = ref(1)
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
        const defaultCollapse = ref(
`<ui-collapses v-model="collapseVal">
    <ui-collapse>
        <ui-collapse-head>
            제목1
        </ui-collapse-head>
        <ui-collapse-panel>
            내용1
        </ui-collapse-panel>
    </ui-collapse>
</ui-collapses>`)
        const multipleCollapse = ref(
`<ui-collapses v-model="collapseVal">
    <ui-collapse v-for="(item, index) in collapseList" :key="index">
        <ui-collapse-head>
            {{ item.title }}
        </ui-collapse-head>
        <ui-collapse-panel>
            {{ item.text }}
        </ui-collapse-panel>
    </ui-collapse>
</ui-collapses>`)
    const accordionCollapse = ref(
`<ui-collapses v-model="collapseVal" accordion>
    <ui-collapse v-for="(item, index) in collapseList" :key="index">
        <ui-collapse-head>
            {{ item.title }}
        </ui-collapse-head>
        <ui-collapse-panel>
            {{ item.text }}
        </ui-collapse-panel>
    </ui-collapse>
</ui-collapses>`)

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
            collapseVal,
            collapseList,
            defaultCollapse,
            multipleCollapse,
            accordionCollapse,
            toggleCode,
            snbSet
        }
    }
}
</script>