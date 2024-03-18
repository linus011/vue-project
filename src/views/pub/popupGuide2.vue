
<template>
    <button type="button" @click="pop1=true">팝업열기1</button>
    <button type="button" @click="pop2=true">팝업열기2</button>

    <ui-pop 
        v-model="pop1"
        title="팝업타이틀"
        bottom
        @close="pop1=false"
    >
        <div style="background-color: aqua; height: 200px">팝업내용1</div>
        <template #foot>
            <div class="flex full">
                <ui-button primary sl @click="pop1=false">확인</ui-button>
            </div>
        </template>
    </ui-pop>

    <ui-pop title="팝업타이틀" v-model="pop2" @close="pop1=false">
        <div style="background-color:bisque; height: 1000px">팝업내용2</div>
    </ui-pop>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    const pop1 = ref(false)
    const pop2 = ref(false)
    return {
        pop1,
        pop2
    }
  }
}
</script>