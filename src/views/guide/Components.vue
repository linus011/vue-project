<template>
    <header id="gHeader">
        <h1><span class="offscreen">오케어</span></h1>
        <div class="g-util">
        </div>
    </header>
    <div id="gContainer">
        <div class="g-titles">
			<h2>Components</h2>
		</div>
        <div class="g-lnb">
            <div class="box">
                <div ref="lnbTrack" class="track">
                    <ul>
                        <li v-for="(item, index) in componentList" :key="index">
                            <button type="button"
                                :class="{ 'active': channelIndex === index }"
                                @click="lnbEvt($event, index)"
                            >
                                {{ item }}
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="g-content">
            <component :is="currentComponent"></component>
        </div>
    </div>
</template>

<script>
import { ref, reactive, computed, onMounted, watchEffect } from 'vue'
import ButtonComponent from './Buttons.vue'
import CardsComponent from './Cards.vue'
import DialogsComponent from './Dialogs.vue'
import TabsComponent from './Tabs.vue'
import FormsComponent from './Forms.vue'
import CollapseComponent from './Collapse.vue'
import ChartsComponent from './Charts.vue'

export default {
    components: {
        ButtonComponent,
        CardsComponent,
        DialogsComponent,
        TabsComponent,
        FormsComponent,
        CollapseComponent,
        ChartsComponent
    },
    setup() {

        const componentList = ref(['Buttons', 'Cards', 'Dialogs', 'Tabs', 'Forms', 'Collapse', 'Charts'])
        const channelIndex = ref(0)

        const lnbEvt = (e, i) => {
            channelIndex.value = i
        }

        const currentComponent = computed(() => {
            switch (channelIndex.value) {
                case 0:
                    return 'ButtonComponent'
                case 1:
                    return 'CardsComponent'
                case 2:
                    return 'DialogsComponent'
                case 3:
                    return 'TabsComponent'
                case 4:
                    return 'FormsComponent'
                case 5:
                    return 'CollapseComponent'
                case 6:
                    return 'ChartsComponent'
                default:
                    return 'ButtonComponent'
            }
        })
        
        
        watchEffect(() => {
            
        })

        onMounted(() => {

        })

        return {
            componentList,
            channelIndex,
            lnbEvt,
            currentComponent
        }
    }
}
</script>