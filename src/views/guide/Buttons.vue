<template>
    <div class="g-snb">
        <ul></ul>
    </div>
    <div class="g-component">
        <div class="scroller">
            <h3>Buttons</h3>
            <div class="g-component-section">
                <h4>Default</h4>
                <div class="component-info">
                    <div class="component-ex">
                        <div class="component-tag">
                            <ui-button>default</ui-button>
                        </div>
                        <button ref="toggleCodeButton" type="button" class="btn-toggle-code" @click="toggleCode">
                            <span class="offscreen">code view</span>
                        </button>
                    </div>
                    <div class="component-code">
                        <code-highlight lang="javascript" :code="defaultButton"></code-highlight>
                    </div>
                </div>
            </div>
            <div class="g-component-section">
                <h4>Size</h4>
                <div class="component-info">
                    <div class="component-ex">
                        <div class="component-tag">
                            <ui-button sxs>Extra small</ui-button>
                            <ui-button ss>Small</ui-button>
                            <ui-button>Regular</ui-button>
                            <ui-button sl>Large</ui-button>
                            <ui-button sxl>X-Large</ui-button>
                        </div>
                        <button ref="toggleCodeButton" type="button" class="btn-toggle-code" @click="toggleCode">
                            <span class="offscreen">code view</span>
                        </button>
                    </div>
                    <div class="component-code">
                        <code-highlight lang="javascript" :code="sizeButton"></code-highlight>
                    </div>
                </div>
            </div>
            <div class="g-component-section">
                <h4>Color</h4>
                <div class="component-info">
                    <div class="component-ex">
                        <div class="component-tag">
                            <ui-button primary>primary</ui-button>
                        </div>
                        <button ref="toggleCodeButton" type="button" class="btn-toggle-code" @click="toggleCode">
                            <span class="offscreen">code view</span>
                        </button>
                    </div>
                    <div class="component-code">
                        <code-highlight lang="javascript" :code="colorButton"></code-highlight>
                    </div>
                </div>
            </div>
            <div class="g-component-section">
                <h4>Ripple</h4>
                <div class="component-info">
                    <div class="component-ex">
                        <div class="component-tag">
                            <ui-button noRipple>Without Ripple</ui-button>
                        </div>
                        <button ref="toggleCodeButton" type="button" class="btn-toggle-code" @click="toggleCode">
                            <span class="offscreen">code view</span>
                        </button>
                    </div>
                    <div class="component-code">
                        <code-highlight lang="javascript" :code="rippleButton"></code-highlight>
                    </div>
                </div>
            </div>
            <div class="g-component-section">
                <h4>Disabled</h4>
                <div class="component-info">
                    <div class="component-ex">
                        <div class="component-tag">
                            <ui-button disabled>Disabled</ui-button>
                        </div>
                        <button ref="toggleCodeButton" type="button" class="btn-toggle-code" @click="toggleCode">
                            <span class="offscreen">code view</span>
                        </button>
                    </div>
                    <div class="component-code">
                        <code-highlight lang="javascript" :code="disabledButton"></code-highlight>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, nextTick, onMounted, onUpdated } from 'vue'
import uiButton from '../../components/global/uiButton.vue'
import codeHighlight from './codeHighlight.vue'


export default {
    components: { 
        uiButton,
        codeHighlight
    },
    setup() {
        const defaultButton = ref(
`<ui-button>default</ui-button>`)

        const sizeButton = ref(
`<ui-button sxs>Extra small</ui-button>
<ui-button ss>Small</ui-button>
<ui-button>Regular</ui-button>
<ui-button sl>Large</ui-button>
<ui-button sxl>X-Large</ui-button>`)

        const colorButton = ref(
`<ui-button primary>primary</ui-button>`)

        const rippleButton = ref(
`<ui-button noRipple>Without Ripple</ui-button>`)

        const disabledButton = ref(
`<ui-button disabled>Disabled</ui-button>`)

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
            defaultButton,
            sizeButton,
            colorButton,
            rippleButton,
            disabledButton,
            toggleCode,
            snbSet
        }
    }
}
</script>