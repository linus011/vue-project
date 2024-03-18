<template>
    <div class="g-snb">
        <ul></ul>
    </div>
    <div class="g-component">
        <div class="scroller">
            <h3>Dialogs</h3>
            <div class="g-component-section">
                <h4>Bottom Sheet</h4>
                <div class="component-info">
                    <div class="component-ex">
                        <div class="component-tag">
                            <ui-button primary sl @click="pop1 = true">bottom sheet</ui-button>
                            <ui-pop v-model="pop1" title="bottom sheet" bottom @close="pop1 = false">
                                <div style="background-color: aqua; height: 200px">팝업내용1</div>
                                <template #foot>
                                    <div class="flex full">
                                        <ui-button primary sl @click="pop3 = true">확인</ui-button>
                                    </div>
                                </template>
                            </ui-pop>
                        </div>
                        <button ref="toggleCodeButton" type="button" class="btn-toggle-code" @click="toggleCode">
                            <span class="offscreen">code view</span>
                        </button>
                    </div>
                    <div class="component-code">
                        <code-highlight lang="javascript" :code="popupBottomSheet"></code-highlight>
                    </div>
                </div>
            </div>
            <div class="g-component-section">
                <h4>Full Popup</h4>
                <div class="component-info">
                    <div class="component-ex">
                        <div class="component-tag">
                            <ui-button primary sl @click="pop2 = true">full popup</ui-button>
                            <ui-pop v-model="pop2" title="full popup" full @close="pop2 = false">
                                <div style="background-color: bisque; height: 1000px">팝업내용2</div>
                                <template #foot>
                                    <div class="flex full">
                                        <ui-button primary sl @click="pop2 = false">확인</ui-button>
                                    </div>
                                </template>
                            </ui-pop>
                        </div>
                        <button ref="toggleCodeButton" type="button" class="btn-toggle-code" @click="toggleCode">
                            <span class="offscreen">code view</span>
                        </button>
                    </div>
                    <div class="component-code">
                        <code-highlight lang="javascript" :code="popupFull"></code-highlight>
                    </div>
                </div>
            </div>
            <div class="g-component-section">
                <h4>Modal Popup</h4>
                <div class="component-info">
                    <div class="component-ex">
                        <div class="component-tag">
                            <ui-button primary sl @click="pop3 = true">modal popup</ui-button>
                            <ui-pop v-model="pop3" title="modal popup" modal @close="pop3 = false">
                                <div style="background-color: bisque; height: 1000px">팝업내용2</div>
                                <template #foot>
                                    <div class="flex full">
                                        <ui-button primary sl @click="pop3 = false">확인</ui-button>
                                    </div>
                                </template>
                            </ui-pop>
                        </div>
                        <button ref="toggleCodeButton" type="button" class="btn-toggle-code" @click="toggleCode">
                            <span class="offscreen">code view</span>
                        </button>
                    </div>
                    <div class="component-code">
                        <code-highlight lang="javascript" :code="popupModal"></code-highlight>
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
        const popupBottomSheet = ref(
`<ui-button primary sl @click="pop1 = true">bottom sheet</ui-button>
<ui-pop v-model="pop1" title="bottom sheet" bottom @close="pop1 = false">
    <div style="background-color: aqua; height: 200px">팝업내용1</div>
    <template #foot>
        <div class="flex full">
            <ui-button primary sl @click="pop3 = true">확인</ui-button>
        </div>
    </template>
</ui-pop>`)

        const popupFull = ref(
`<ui-button primary sl @click="pop2 = true">full popup</ui-button>
<ui-pop v-model="pop2" title="full popup" full @close="pop2 = false">
    <div style="background-color: bisque; height: 1000px">팝업내용2</div>
    <template #foot>
        <div class="flex full">
            <ui-button primary sl @click="pop2 = false">확인</ui-button>
        </div>
    </template>
</ui-pop>>`)

        const popupModal = ref(
`<ui-button primary sl @click="pop3 = true">modal popup</ui-button>
<ui-pop v-model="pop3" title="modal popup" modal @close="pop3 = false">
    <div style="background-color: bisque; height: 1000px">팝업내용2</div>
    <template #foot>
        <div class="flex full">
            <ui-button primary sl @click="pop3 = false">확인</ui-button>
        </div>
    </template>
</ui-pop>`)

        const pop1 = ref(false)
        const pop2 = ref(false)
        const pop3 = ref(false)

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
            popupBottomSheet,
            popupFull,
            popupModal,
            pop1,
            pop2,
            pop3,
            toggleCode,
            snbSet
        }
    }
}
</script>