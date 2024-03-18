<template>
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
    </ui-tabs><br><br>
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
    </ui-tabs><br><br>
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
</template>

<script>
import { ref } from 'vue'

export default {
    setup() {
        const tabVal = ref(0)
        const tabList = ref([
            { title: '탭메뉴1', color: 'black', txt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.' },
            { title: '탭메뉴2', color: 'blue', txt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.' },
            { title: '탭메뉴3', color: 'blueviolet', txt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.' },
            { title: '탭메뉴4', color: 'aquamarine', txt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.' },
            { title: '탭메뉴5', color: 'brown', txt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
            { title: '탭메뉴6', color: 'burlywood', txt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.' }
        ])
        return {
            tabVal,
            tabList
        }
    }
}
</script>