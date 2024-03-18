<template>
    <div class="g-content">
        <div class="g-board-panel">
            <div class="g-board-head">

            </div>
            <div class="g-board">
                <table>
                    <caption>코딩리스트</caption>
                    <colgroup>
                        <col style="width:50px">
                        <col style="width:110px">
                        <col style="width:90px">
                        <col class="d1" style="width:100px">
                        <col class="d2" style="width:100px">
                        <col class="d3" style="width:100px">
                        <col class="d4" style="width:100px">
                        <col style="width:auto">
                        <col style="width:80px">
                        <col style="width:100px">
                        <col style="width:100px">
                        <col style="width:80px">
                        <col style="width:100px">
                    </colgroup>
                    <thead>
                        <tr>
                            <th scope="col">No</th>
                            <th scope="col" v-for="(item, index) in workHead" :key="index">{{ item }}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in workList" :key="index">
                            <td>{{ index+1 }}</td>
                            <td>{{ item.화면ID }}</td>
                            <td>{{ item.화면타입 }}</td>
                            <td>{{ item.Depth1 }}</td>
                            <td>{{ item.Depth2 }}</td>
                            <td>{{ item.Depth3 }}</td>
                            <td>{{ item.Depth4 }}</td>
                            <td class="t-left">{{ item.화면명 }}</td>
                            <td>{{ item.작업자 }}</td>
                            <td>{{ item.작업일 }}</td>
                            <td>{{ item.수정일 }}</td>
                            <td>{{ item.상태 }}</td>
                            <td>{{ item.비고 }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, reactive, watchEffect } from 'vue'
import pubList from '/src/assets/guide/json/workList.json'

export default {
    setup() {

        const workList = reactive(pubList)
        const workHead = reactive(Object.keys(workList[0]))

        return {
            workList,
            workHead
        }
    }
}
</script>