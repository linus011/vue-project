<template>
    <div class="g-snb">
        <ul></ul>
    </div>
    <div class="g-component">
        <div class="scroller">
            <h3>Forms</h3>
            <div class="g-component-section">
                <h4>Input</h4>
                <div class="g-component-section-sub">
                    <h5>Default</h5>
                    <div class="component-info">
                        <div class="component-ex">
                            <div class="component-tag">
                                <div>
                                    <ui-input v-model="inpVal" type="text" id="text" label="default" />
                                    <div class="mt-10">value : {{ inpVal }}</div>
                                </div>
                            </div>
                            <button ref="toggleCodeButton" type="button" class="btn-toggle-code" @click="toggleCode">
                                <span class="offscreen">code view</span>
                            </button>
                        </div>
                        <div class="component-code">
                            <code-highlight lang="javascript" :code="defaultInput"></code-highlight>
                        </div>
                    </div>
                </div>
                <div class="g-component-section-sub">
                    <h5>단위</h5>
                    <div class="component-info">
                        <div class="component-ex">
                            <div class="component-tag">
                                <div>
                                    <ui-input v-model="inpVal" type="tel" id="unit" label="단위" unit="원" right />
                                    <div class="mt-10">value : {{ inpVal }}</div>
                                </div>
                            </div>
                            <button ref="toggleCodeButton" type="button" class="btn-toggle-code" @click="toggleCode">
                                <span class="offscreen">code view</span>
                            </button>
                        </div>
                        <div class="component-code">
                            <code-highlight lang="javascript" :code="unitInput"></code-highlight>
                        </div>
                    </div>
                </div>
                <div class="g-component-section-sub">
                    <h5>이메일</h5>
                    <div class="component-info">
                        <div class="component-ex">
                            <div class="component-tag">
                                <div>
                                    <ui-input v-model="inpVal" type="email" id="email" label="이메일" email />
                                    <div class="mt-10">value : {{ inpVal }}</div>
                                </div>
                            </div>
                            <button ref="toggleCodeButton" type="button" class="btn-toggle-code" @click="toggleCode">
                                <span class="offscreen">code view</span>
                            </button>
                        </div>
                        <div class="component-code">
                            <code-highlight lang="javascript" :code="emailInput"></code-highlight>
                        </div>
                    </div>
                </div>
                <div class="g-component-section-sub">
                    <h5>날짜선택</h5>
                    <div class="component-info">
                        <div class="component-ex">
                            <div class="component-tag">
                                <div>
                                    <ui-input type="text" id="date"
                                        label="날짜"
                                        date
                                        v-model="selectDate"
                                        yr
                                        mo
                                        dy
                                    />
                                    <div class="mt-10">value : {{ selectDate }}</div>
                                </div>
                            </div>
                            <button ref="toggleCodeButton" type="button" class="btn-toggle-code" @click="toggleCode">
                                <span class="offscreen">code view</span>
                            </button>
                        </div>
                        <div class="component-code">
                            <code-highlight lang="javascript" :code="emailInput"></code-highlight>
                        </div>
                    </div>
                </div>
            </div>
            <div class="g-component-section">
                <h4>Radio Button</h4>
                <div class="g-component-section-sub">
                    <h5>Default</h5>
                    <div class="component-info">
                        <div class="component-ex">
                            <div class="component-tag">
                                <ui-radio v-model="rdoVal" value="Default">Default</ui-radio>
                                <ui-radio v-model="rdoVal" value="Default Disabled" disabled>Default Disabled</ui-radio>
                                <ui-radio v-model="rdoVal" value="Checked" checked>Checked</ui-radio>
                                <ui-radio v-model="rdoVal" value="Checked Disabled" checked disabled>Checked Disabled</ui-radio>
                                <div>value : {{ rdoVal }}</div>
                            </div>
                            <button ref="toggleCodeButton" type="button" class="btn-toggle-code" @click="toggleCode">
                                <span class="offscreen">code view</span>
                            </button>
                        </div>
                        <div class="component-code">
                            <code-highlight lang="javascript" :code="defaultRadio"></code-highlight>
                        </div>
                    </div>
                </div>
                <div class="g-component-section-sub">
                    <h5>Size</h5>
                    <div class="component-info">
                        <div class="component-ex">
                            <div class="component-tag">
                                <div class="flex">
                                    <ui-radio v-model="rdoVal" value="small" small>small</ui-radio>
                                    <ui-radio v-model="rdoVal" value="default">default</ui-radio>
                                    <ui-radio v-model="rdoVal" value="large" large>large</ui-radio>
                                </div>
                                <div>value : {{ rdoVal }}</div>
                            </div>
                            <button ref="toggleCodeButton" type="button" class="btn-toggle-code" @click="toggleCode">
                                <span class="offscreen">code view</span>
                            </button>
                        </div>
                        <div class="component-code">
                            <code-highlight lang="javascript" :code="sizeRadio"></code-highlight>
                        </div>
                    </div>
                </div>
                <div class="g-component-section-sub">
                    <h5>Box</h5>
                    <div class="component-info">
                        <div class="component-ex">
                            <div class="component-tag">
                                <div class="flex">
                                    <ui-radio v-model="rdoVal" value="1" box>box 1</ui-radio>
                                    <ui-radio v-model="rdoVal" value="2" box>box 2</ui-radio>
                                </div>
                                <div>value : {{ rdoVal }}</div>
                            </div>
                            <button ref="toggleCodeButton" type="button" class="btn-toggle-code" @click="toggleCode">
                                <span class="offscreen">code view</span>
                            </button>
                        </div>
                        <div class="component-code">
                            <code-highlight lang="javascript" :code="boxRadio"></code-highlight>
                        </div>
                    </div>
                </div>
                <div class="g-component-section-sub">
                    <h5>Button</h5>
                    <div class="component-info">
                        <div class="component-ex">
                            <div class="component-tag">
                                <div class="flex">
                                    <ui-radio v-model="rdoVal" value="1" button>button 1</ui-radio>
                                    <ui-radio v-model="rdoVal" value="2" button>button 2</ui-radio>
                                </div>
                                <div>value : {{ rdoVal }}</div>
                            </div>
                            <button ref="toggleCodeButton" type="button" class="btn-toggle-code" @click="toggleCode">
                                <span class="offscreen">code view</span>
                            </button>
                        </div>
                        <div class="component-code">
                            <code-highlight lang="javascript" :code="buttonRadio"></code-highlight>
                        </div>
                    </div>
                </div>
            </div>
            <div class="g-component-section">
                <h4>Checkbox</h4>
                <div class="g-component-section-sub">
                    <h5>Default</h5>
                    <div class="component-info">
                        <div class="component-ex">
                            <div class="component-tag">
                                <ui-check-box v-model="chkVal">Default</ui-check-box>
                                <ui-check-box v-model="chkVal" disabled>Default Disabled</ui-check-box>
                                <ui-check-box v-model="chkVal" checked>Checked</ui-check-box>
                                <ui-check-box v-model="chkVal" checked disabled>Checked Disabled</ui-check-box>
                                <div>value : {{ chkVal }}</div>
                            </div>
                            <button ref="toggleCodeButton" type="button" class="btn-toggle-code" @click="toggleCode">
                                <span class="offscreen">code view</span>
                            </button>
                        </div>
                        <div class="component-code">
                            <code-highlight lang="javascript" :code="defaultCheckbox"></code-highlight>
                        </div>
                    </div>
                </div>
                <div class="g-component-section-sub">
                    <h5>Size</h5>
                    <div class="component-info">
                        <div class="component-ex">
                            <div class="component-tag">
                                <div class="flex">
                                    <ui-check-box v-model="chkVal2" value="small" small>small</ui-check-box>
                                    <ui-check-box v-model="chkVal2" value="default">default</ui-check-box>
                                    <ui-check-box v-model="chkVal2" value="large" large>large</ui-check-box>
                                </div>
                                <div>value : {{ chkVal2 }}</div>
                            </div>
                            <button ref="toggleCodeButton" type="button" class="btn-toggle-code" @click="toggleCode">
                                <span class="offscreen">code view</span>
                            </button>
                        </div>
                        <div class="component-code">
                            <code-highlight lang="javascript" :code="sizeCheckbox"></code-highlight>
                        </div>
                    </div>
                </div>
                <div class="g-component-section-sub">
                    <h5>Box</h5>
                    <div class="component-info">
                        <div class="component-ex">
                            <div class="component-tag">
                                <div class="flex">
                                    <ui-check-box v-model="chkVal2" value="1" box>box 1</ui-check-box>
                                    <ui-check-box v-model="chkVal2" value="2" box>box 2</ui-check-box>
                                </div>
                                <div>value : {{ chkVal2 }}</div>
                            </div>
                            <button ref="toggleCodeButton" type="button" class="btn-toggle-code" @click="toggleCode">
                                <span class="offscreen">code view</span>
                            </button>
                        </div>
                        <div class="component-code">
                            <code-highlight lang="javascript" :code="boxCheckbox"></code-highlight>
                        </div>
                    </div>
                </div>
                <div class="g-component-section-sub">
                    <h5>Button</h5>
                    <div class="component-info">
                        <div class="component-ex">
                            <div class="component-tag">
                                <div class="flex">
                                    <ui-check-box v-model="chkVal2" value="1" button>button 1</ui-check-box>
                                    <ui-check-box v-model="chkVal2" value="2" button>button 2</ui-check-box>
                                </div>
                                <div>value : {{ chkVal2 }}</div>
                            </div>
                            <button ref="toggleCodeButton" type="button" class="btn-toggle-code" @click="toggleCode">
                                <span class="offscreen">code view</span>
                            </button>
                        </div>
                        <div class="component-code">
                            <code-highlight lang="javascript" :code="buttonCheckbox"></code-highlight>
                        </div>
                    </div>
                </div>
                <div class="g-component-section-sub">
                    <h5>Boolean</h5>
                    <div class="component-info">
                        <div class="component-ex">
                            <div class="component-tag">
                                <div class="flex">
                                    <ui-check-box v-model="chkVal3" true-value="Y" false-value="N">
                                        <template v-if="chkVal3 == 'Y'">선택하면 Y</template>
                                        <template v-if="chkVal3 == 'N'">선택안하면 N</template>
                                    </ui-check-box>
                                </div>
                                <div>value : {{ chkVal3 }}</div>
                            </div>
                            <button ref="toggleCodeButton" type="button" class="btn-toggle-code" @click="toggleCode">
                                <span class="offscreen">code view</span>
                            </button>
                        </div>
                        <div class="component-code">
                            <code-highlight lang="javascript" :code="booleanCheckbox"></code-highlight>
                        </div>
                    </div>
                </div>
                <div class="g-component-section-sub">
                    <h5>Switch</h5>
                    <div class="component-info">
                        <div class="component-ex">
                            <div class="component-tag">
                                <div class="flex">
                                    <ui-check-box v-model="chkVal" switch/>
                                </div>
                                <div>value : {{ chkVal }}</div>
                            </div>
                            <button ref="toggleCodeButton" type="button" class="btn-toggle-code" @click="toggleCode">
                                <span class="offscreen">code view</span>
                            </button>
                        </div>
                        <div class="component-code">
                            <code-highlight lang="javascript" :code="switchCheckbox"></code-highlight>
                        </div>
                    </div>
                </div>
            </div>
            <div class="g-component-section">
                <h4>Select</h4>
                <div class="g-component-section-sub">
                    <h5>Default</h5>
                    <div class="component-info">
                        <div class="component-ex">
                            <div class="component-tag">
                                <div style="width: 360px;">
                                    <ui-select
                                        v-model="selectVal1"
                                        :options="selectOpt1"
                                    />
                                </div>
                                <div>value : {{ selectVal1 }}</div>
                            </div>
                            <button ref="toggleCodeButton" type="button" class="btn-toggle-code" @click="toggleCode">
                                <span class="offscreen">code view</span>
                            </button>
                        </div>
                        <div class="component-code">
                            <code-highlight lang="javascript" :code="defaultCheckbox"></code-highlight>
                        </div>
                    </div>
                </div>
                <div class="g-component-section-sub">
                    <h5>Inline</h5>
                    <div class="component-info">
                        <div class="component-ex">
                            <div class="component-tag">
                                <div style="width: 360px;">
                                    <ui-select
                                        v-model="selectVal1"
                                        :options="selectOpt1"
                                        inline
                                    />
                                </div>
                                <div>value : {{ selectVal1 }}</div>
                            </div>
                            <button ref="toggleCodeButton" type="button" class="btn-toggle-code" @click="toggleCode">
                                <span class="offscreen">code view</span>
                            </button>
                        </div>
                        <div class="component-code">
                            <code-highlight lang="javascript" :code="defaultCheckbox"></code-highlight>
                        </div>
                    </div>
                </div>
                <div class="g-component-section-sub">
                    <h5>BottomSheet</h5>
                    <div class="component-info">
                        <div class="component-ex">
                            <div class="component-tag">
                                <div style="width: 360px;">
                                    <ui-select
                                        v-model="selectVal2"
                                        :options="selectOpt2"
                                        :title="'다른 인증수단 선택'"
                                        bottom
                                    />
                                </div>
                                <div>value : {{ selectVal2 }}</div>
                            </div>
                            <button ref="toggleCodeButton" type="button" class="btn-toggle-code" @click="toggleCode">
                                <span class="offscreen">code view</span>
                            </button>
                        </div>
                        <div class="component-code">
                            <code-highlight lang="javascript" :code="defaultCheckbox"></code-highlight>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, nextTick, onMounted, onUpdated } from 'vue'
import uiInput from '../../components/global/uiInput.vue'
import codeHighlight from './codeHighlight.vue'


export default {
    components: { 
        uiInput,
        codeHighlight
    },
    setup() {
        const inpVal = ref('')
        const selectDate = ref('')
        const rdoVal = ref('')
        const chkVal = ref('')
        const chkVal2 = ref([])
        const chkVal3 = ref('N')
        const selectVal1 = ref('')
        const selectOpt1 = [
            { text: '선택하기', value: '' },
            { text: 'selectA', value: 'selectA' },
            { text: 'selectB', value: 'selectB' },
            { text: 'disabled', value: 'disabled', disabled: true },
            { text: 'selectD', value: 'selectD' },
        ]
        const selectVal2 = ref('')
        const selectOpt2 = [
            { text: '카카오 인증서', value: '카카오 인증서' },
            { text: '네이버 인증서', value: '네이버 인증서' },
            { text: '휴대폰 본인인증', value: '휴대폰 본인인증' },
        ]

        const defaultInput = ref(
`<ui-input v-model="inpVal" type="text" id="text" label="default" />`)

        const unitInput = ref(
`<ui-input v-model="inpVal" type="tel" id="unit" label="단위" unit="원" right />`)

        const emailInput = ref(
`<ui-input v-model="inpVal" type="email" id="email" label="이메일" email />`)

        const defaultRadio = ref(
`<ui-radio v-model="rdoVal" value="Default">Default</ui-radio>
<ui-radio v-model="rdoVal" value="Default Disabled" disabled>Default Disabled</ui-radio>
<ui-radio v-model="rdoVal" value="Checked" checked>Checked</ui-radio>
<ui-radio v-model="rdoVal" value="Checked Disabled" checked disabled>Checked Disabled</ui-radio>`)

    const sizeRadio = ref(
`<ui-radio v-model="rdoVal" value="small" small>small</ui-radio>
<ui-radio v-model="rdoVal" value="default">default</ui-radio>
<ui-radio v-model="rdoVal" value="large" large>large</ui-radio>`)

        const boxRadio = ref(
`<ui-radio v-model="rdoVal" value="1" box>1</ui-radio>
<ui-radio v-model="rdoVal" value="2" box>2</ui-radio>`)

        const buttonRadio = ref(
`<ui-radio v-model="rdoVal" value="1" button>button 1</ui-radio>
<ui-radio v-model="rdoVal" value="2" button>button 2</ui-radio>`)

        const defaultCheckbox = ref(
`<ui-check-box v-model="chkVal">Default</ui-check-box>
<ui-check-box v-model="chkVal" disabled>Default Disabled</ui-check-box>
<ui-check-box v-model="chkVal" checked>Checked</ui-check-box>
<ui-check-box v-model="chkVal" checked disabled>Checked Disabled</ui-check-box>`)

        const sizeCheckbox = ref(
`<ui-check-box v-model="chkVal" value="small" small>small</ui-check-box>
<ui-check-box v-model="chkVal" value="default">default</ui-check-box>
<ui-check-box v-model="chkVal" value="large" large>large</ui-check-box>`)

        const boxCheckbox = ref(
`<ui-check-box v-model="chkVal" box>box1</ui-check-box>
<ui-check-box v-model="chkVal" box>box2</ui-check-box>`)

        const buttonCheckbox = ref(
`<ui-check-box v-model="chkVal2" value="1" button>button 1</ui-check-box>
<ui-check-box v-model="chkVal2" value="2" button>button 2</ui-check-box>`)

        const booleanCheckbox = ref(
`<ui-check-box v-model="chkVal3" true-value="Y" false-value="N">
    <template v-if="chkVal3 == 'Y'">선택하면 Y</template>
    <template v-if="chkVal3 == 'N'">선택안하면 N</template>
</ui-check-box>`)

        const switchCheckbox = ref(
`<ui-check-box v-model="chkVal" switch/>`)

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
            inpVal,
            selectDate,
            rdoVal,
            chkVal,
            chkVal2,
            chkVal3,
            selectVal1,
            selectOpt1,
            selectVal2,
            selectOpt2,
            defaultInput,
            unitInput,
            emailInput,
            defaultRadio,
            sizeRadio,
            boxRadio,
            buttonRadio,
            defaultCheckbox,
            sizeCheckbox,
            boxCheckbox,
            buttonCheckbox,
            booleanCheckbox,
            switchCheckbox,
            toggleCode,
            snbSet
        }
    }
}
</script>