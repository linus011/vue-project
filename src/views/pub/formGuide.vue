<template>
    <ui-input v-model="inpVal1" type="text" id="text" label="default" />
    value : {{ inpVal1 }}<br><br>
    <ui-input v-model="inpVal2" type="email" id="email" label="이메일" email />
    value : {{ inpVal2 }}<br><br>
    <ui-input v-model="inpVal3" type="tel" id="unit" label="단위" unit="원" right />
    value : {{ inpVal3 }}<br><br>
    <div>
        <ui-radio v-model="rdoVal" value="1">1</ui-radio>
        <ui-radio v-model="rdoVal" value="2">2</ui-radio>
    </div>
    value: {{ rdoVal }}<br><br>
    <div>
        <ui-check-box v-model="chkVal"/>
        <ui-check-box v-model="chkVal">텍스트 있음</ui-check-box>
    </div>
    value: {{ chkVal }}
    <div class="flex">
        <ui-check-box v-model="chkVal2" value="1" small>1</ui-check-box>
        <ui-check-box v-model="chkVal2" value="2">2</ui-check-box>
        <ui-check-box v-model="chkVal2" value="3" large>3</ui-check-box>
    </div>
    value: {{ chkVal2 }}
    <div class="flex">
        <ui-check-box v-model="chkVal3" true-value="Y" false-value="N">
            <template v-if="chkVal3 == 'Y'">선택하면 Y</template>
            <template v-if="chkVal3 == 'N'">선택안하면 N</template>
        </ui-check-box>
    </div>
    value: {{ chkVal3 }}
    <div class="flex">
        <ui-check-box v-model="chkVal4" @dblclick="dblclickEvt" box>dblclick</ui-check-box>
    </div>
    value: {{ chkVal4 }}
    <div class="flex">
        <ui-check-box v-model="chkVal5" switch/>
    </div>
    value: {{ chkVal5 }}
    <div>
        <ui-select
            v-model="selectVal1"
            :options="selectOpt1"
        />
    </div>
    value: {{ selectVal1 }}
    <div>
        <ui-select
            v-model="selectVal1"
            :options="selectOpt1"
            inline
        />
    </div>
    value: {{ selectVal1 }}
    <div>
        <ui-select
            v-model="selectVal2"
            :options="selectOpt2"
            :title="'다른 인증수단 선택'"
            bottom
        />
    </div>
    value: {{ selectVal2 }}
</template>

<script>
import { ref } from 'vue'

export default {
    setup() {
        const inpVal1 = ref('')
        const inpVal2 = ref('')
        const inpVal3 = ref('')
        const rdoVal = ref('')
        const chkVal = ref('')
        const chkVal2 = ref([])
        const chkVal3 = ref('N')
        const chkVal4 = ref('')
        const chkVal5 = ref('')
        const selectVal1 = ref('')
        const selectOpt1 = [
            { text: '선택하기', value: '' },
            { text: 'A', value: 'A' },
            { text: 'B', value: 'B' },
            { text: 'C', value: 'C', disabled: true },
            { text: 'D', value: 'D' },
        ]
        const selectVal2 = ref('')
        const selectOpt2 = [
            { text: '카카오 인증서', value: '카카오 인증서' },
            { text: '네이버 인증서', value: '네이버 인증서' },
            { text: '휴대폰 본인인증', value: '휴대폰 본인인증' },
        ]
        const dblclickEvt = () => {
            console.log('dblclickEvt')
        }
        return {
            inpVal1,
            inpVal2,
            inpVal3,
            rdoVal,
            chkVal,
            chkVal2,
            chkVal3,
            chkVal4,
            chkVal5,
            dblclickEvt,
            selectVal1,
            selectOpt1,
            selectVal2,
            selectOpt2
        }
    }
}
</script>