<template>
    <ui-button primary sl @click="pop1 = true">bottom sheet</ui-button><br />
    <ui-button primary sl @click="pop2 = true">full popup</ui-button><br />
    <ui-button primary sl @click="pop3 = true">modal popup</ui-button>

    <ui-pop v-model="pop1" title="bottom sheet" bottom @close="pop1 = false">
        <div style="background-color: aqua; height: 200px">팝업내용1</div>
        <template #foot>
            <div class="flex full">
                <ui-button primary sl @click="pop3 = true">확인</ui-button>
            </div>
        </template>
    </ui-pop>

    <ui-pop v-model="pop2" title="full popup" full @close="pop2 = false">
        <div style="background-color: bisque; height: 1000px">팝업내용2</div>
        <template #foot>
            <div class="flex full">
                <ui-button primary sl @click="pop2 = false">확인</ui-button>
            </div>
        </template>
    </ui-pop>

    <ui-pop v-model="pop3" title="modal popup" modal @close="pop3 = false">
        <div style="background-color: bisque; height: 1000px">팝업내용2</div>
        <template #foot>
            <div class="flex full">
                <ui-button primary sl @click="pop3 = false">확인</ui-button>
            </div>
        </template>
    </ui-pop>
</template>

<script>
import { ref } from 'vue'
import uiButton from '../../components/global/uiButton.vue'

export default {
    components: { uiButton },
    setup() {
        const pop1 = ref(false)
        const pop2 = ref(false)
        const pop3 = ref(false)
        return {
            pop1,
            pop2,
            pop3
        }
    }
}
</script>