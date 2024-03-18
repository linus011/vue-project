<template>
    <header id="gHeader">
        <h1><span class="offscreen">오케어</span></h1>
        <div class="g-util">
            <div class="g-search">
                <input type="text" 
                    v-model="searchValue" 
                    @input="filterSearch"
                    @focus="filterFocus"
                    @blur="filterBlur"
                    placeholder="검색어를 입력하세요"
                >
                <button type="button" class="btn-del"
                    v-if="isBtnDel"
                    @click="searchValReset"
                ><span class="offscreen">검색창초기화</span></button>
                <button type="button" class="btn-search"><span class="offscreen">검색하기</span></button>
            </div>
            <button type="button" class="btn-responsive"
                @click="toggleDevice"
            ><i><i><i class="offscreen">메뉴</i></i></i></button>
        </div>
    </header>
    <div id="gContainer">
        <div class="g-titles">
			<h2>Worksheet</h2>
			<div class="g-project-status">
				<div class="g-count">
					<span class="lb">총본수</span>
                    <strong class="num">
                        {{ totalList.length }}
                    </strong>
				</div>
				<div class="g-count">
					<span class="lb">총진행본수</span>
                    <strong class="num">
                        {{ totalList.filter((i)=> i.상태 === '완료' || i.상태 === '삭제').length }}
                    </strong>
				</div>
				<div class="g-count">
					<span class="lb">총완료본수</span>
                    <strong class="num">
                        {{ totalList.filter((i)=> i.상태 === '완료').length }}
                    </strong>
				</div>
				<div class="g-project-ing">
					<span class="ing">진행률 : 
                        <strong class="num">
                            {{ Math.round((100 / totalList.length) * totalList.filter((i)=> i.상태 === '완료').length) }}
                        </strong>
                    %</span> 
                    <span class="graph">
                        <span class="bar" :style="`width: ${Math.round((100 / totalList.length) * totalList.filter((i)=> i.상태 === '완료').length)}%;`"></span>
                    </span>
				</div>
			</div>
		</div>
        <div class="g-lnb">
            <div class="box">
                <div ref="lnbTrack" class="track">
                    <ul>
                        <li v-for="(item, index) in channel" :key="index">
                            <button type="button"
                                :class="{ 'active': channelIndex === index }"
                                @click="channelEvt($event, index)"
                            >
                                {{ item }}
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="g-content">
            <div class="g-board-panel">
                <div class="channel-info">
                    <div class="channel-sub">
                        <div ref="channelSubTrack" class="track">
                            <ul>
                                <li v-for="(item, index) in channelSub" :key="index">
                                    <button type="button" 
                                        :data-target="'target-'+index"
                                        :class="{ 'active': channelSubIndex === index }"
                                        @click="channelSubEvt($event, index)"
                                    >
                                        {{ item }}
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="channel-status">
                        <div class="g-count">
                            본수
                            <strong>
                                {{ workList.length }}
                            </strong>
                        </div>
                        <div class="g-count">
                            진행본수
                            <strong>
                                {{ workList.filter((i)=> i.상태 === '완료' || i.상태 === '삭제').length }}
                            </strong>
                        </div>
                        <div class="g-count">
                            완료본수
                            <strong>
                                {{ workList.filter((i)=> i.상태 === '완료').length }}
                            </strong>
                        </div>
                        <div class="channel-ing">
                            <span class="ing">진행률 : 
                                <span class="num">
                                    {{ Math.round((100 / workList.length) * workList.filter((i)=> i.상태 === '완료').length) }}
                                </span>
                            %</span> 
                            <span class="graph">
                                <span class="bar" :style="`width: ${Math.round((100 / workList.length) * workList.filter((i)=> i.상태 === '완료').length)}%;`"></span>
                            </span>
                        </div>
                    </div>
                </div>
                <div class="g-board">
                    <div class="box">
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
                                <col style="width:200px">
                            </colgroup>
                            <thead>
                                <tr>
                                    <th scope="col">No</th>
                                    <th scope="col" v-for="(item, index) in workHead" :key="index">
                                        <select v-if = "item === '작업자'"
                                            @change="selectEvt"
                                        >
                                            <option value="">{{ item }}</option>
                                            <option v-for="(item, i) in pubWorker" :key="i" :value=item>{{ item }}</option>
                                        </select>
                                        <select v-else-if = "item === '작업일'"
                                            @change="selectEvt"
                                        >
                                            <option value="">{{ item }}</option>
                                            <option v-for="(item, i) in workDate" :key="i" :value=item>{{ item }}</option>
                                        </select>
                                        <select v-else-if = "item === '수정일'"
                                            @change="selectEvt"
                                        >
                                            <option value="">{{ item }}</option>
                                            <option v-for="(item, i) in editDate" :key="i" :value=item>{{ item }}</option>
                                        </select>
                                        <template v-else>{{ item }}</template>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <template v-for="(item, index) in workList" :key="index">
                                    <tr>
                                        <td>{{ index+1 }}</td>
                                        <td class="id" v-html="htmlBuilding('화면ID', item.화면ID, searchValue, item.화면명)"></td>
                                        <td v-html="htmlBuilding('화면타입', item.화면타입, searchValue)"></td>
                                        <td v-html="htmlBuilding('Depth1', item.Depth1, searchValue)"></td>
                                        <td class="dep2" v-html="htmlBuilding('Depth2', item.Depth2, searchValue)"></td>
                                        <td v-html="htmlBuilding('Depth3', item.Depth3, searchValue)"></td>
                                        <td v-html="htmlBuilding('Depth4', item.Depth4, searchValue)"></td>
                                        <td class="name t-left" v-html="htmlBuilding('화면명', item.화면명, searchValue)"></td>
                                        <td v-html="htmlBuilding('작업자', item.작업자, searchValue)"></td>
                                        <td v-html="htmlBuilding('작업일', item.작업일, searchValue)"></td>
                                        <td v-html="htmlBuilding('수정일', item.수정일, searchValue)"></td>
                                        <td v-html="htmlBuilding('상태', item.상태, searchValue)"></td>
                                        <td class="etc" v-html="htmlBuilding('비고', item.비고, searchValue, item.화면명, item.화면ID)"></td>
                                    </tr>
                                </template>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div v-if="isMobile" class="frame-device">
                <div ref="frameHead" class="head">
                    <div class="screen-info">
                        <strong class="screen-id"></strong>
                        <span class="screen-name"></span>
                    </div>
                    <div class="screen-size">
                        <button type="button" @click="screenSize($event, 320)">320</button>
                        <button type="button" @click="screenSize($event, 360)">360</button>
                        <button type="button" @click="screenSize($event, 390)">390</button>
                        <button type="button" @click="screenSize($event, 717)">717</button>
                    </div>
                </div>
                <div class="device">
                    <iframe ref="deviceFrame" src="" frameborder="0" name="device"></iframe>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, reactive, computed, onMounted, watchEffect } from 'vue'
import axios from 'axios'


export default {
    setup() {
        const isMobile = ref(false)
        const isBtnDel = ref(false)
        const totalList = ref([])
        const workList = ref([])
        const filteredWorkList = ref([])
        const workHead = ref([])
        const channel = ref([])
        const channelSub = ref([])
        const filteredChannelSub = ref([])
        const pubWorker = ref([])
        const workDate = ref([])
        const editDate = ref([])
        const filteredPubWorker = ref([])
        const filteredWorkDate = ref([])
        const filteredEditDate = ref([])
        const lnbTrack = ref()
        const channelSubTrack = ref()
        const channelIndex = ref(0)
        const channelSubIndex = ref()
        const searchValue = ref('')
        const deviceFrame = ref('')
        const frameHead = ref('')

        const loadData = async() => {
            try {
                const response = await axios.get('/src/assets/guide/json/workList.json')
                totalList.value = response.data
                workList.value = response.data
                workHead.value = Object.keys(workList.value[0])
                channel.value = [...new Set(workList.value.map(item => item.Depth1))]
                channel.value.unshift('전체')
                channelSub.value = [...new Set(workList.value.map(item => item.Depth2))]
                channelSub.value = channelSub.value.filter(i => i !== null && i !== '')
                pubWorker.value = [...new Set(workList.value.map(item => item.작업자))]
                pubWorker.value = pubWorker.value.filter(i => i !== null && i !== '')
                workDate.value = [...new Set(workList.value.map(item => item.작업일))]
                workDate.value = workDate.value.filter(i => i !== null && i !== '')
                editDate.value = [...new Set(workList.value.map(item => item.수정일))]
                editDate.value = editDate.value.filter(i => i !== null && i !== '')
                filterWorkList()
            } catch (error) {
                console.error('Error loading data:', error)
            }
        }

        let isDragging = false

        const autoPos = (el) => {
            const track = el
            const trackW = track.offsetWidth;
            setTimeout(function () {
                const current = track.querySelector('.active');
                const trackSclW = track.scrollWidth;
                const tLeft = current.offsetLeft;
                const tWidth = current.offsetWidth;
                const sclLeft = tLeft - (trackW / 2) + (tWidth / 2);
                const speed = Math.max(300, Math.abs(sclLeft * 2));
                if(trackW < trackSclW) track.scrollTo({ left: sclLeft, behavior: 'smooth'});
            }, 50);
        }

        const scrollDrag = (el) => {
            const scrollArea = el
            let startX, startScrollLeft;
            scrollArea.addEventListener('mousedown', function (e) {
                isDragging = true;
                startX = e.clientX;
                startScrollLeft = scrollArea.scrollLeft;
            });
            scrollArea.addEventListener('mousemove', function (e) {
                if (!isDragging) return;
                const deltaX = e.clientX - startX;
                scrollArea.scrollLeft = startScrollLeft - deltaX;
                scrollArea.classList.add('dis')

            });
            scrollArea.addEventListener('mouseup', function () {
                isDragging = false
                setTimeout(function () {
                    scrollArea.classList.remove('dis')
                }, 100)
            });
        }

        const filterChannelList = () => {
            const selectedChannel = channel.value[channelIndex.value];
            if(selectedChannel === '전체') {
                filteredWorkList.value = workList.value
            } else {
                filteredWorkList.value = workList.value.filter(item => item.Depth1 === selectedChannel)
            }
        }

        const filterChannelSubList = () => {
            const selectedChannel = channel.value[channelIndex.value];
            if(selectedChannel === '전체') {
                filteredChannelSub.value = channelSub.value
            } else {
                filteredChannelSub.value = [...new Set(filteredWorkList.value.map(item => item.Depth2))]
                filteredChannelSub.value = filteredChannelSub.value.filter(i => i !== null && i !== '')
            }
        }

        const filterSortList = () => {
            const selectedChannel = channel.value[channelIndex.value];
            if(selectedChannel === '전체') {
                filteredPubWorker.value = pubWorker.value
                filteredWorkDate.value = workDate.value
                filteredEditDate.value = editDate.value
            } else {
                filteredPubWorker.value = [...new Set(filteredWorkList.value.map(item => item.작업자))]
                filteredPubWorker.value = filteredPubWorker.value.filter(i => i !== null && i !== '')
                filteredWorkDate.value = [...new Set(filteredWorkList.value.map(item => item.작업일))]
                filteredWorkDate.value = filteredWorkDate.value.filter(i => i !== null && i !== '')
                filteredEditDate.value = [...new Set(filteredWorkList.value.map(item => item.수정일))]
                filteredEditDate.value = filteredEditDate.value.filter(i => i !== null && i !== '')
            }
        }

        const filterWorkList = () => {
            filterChannelList()
            filterChannelSubList()
            filterSortList()
            channelSubTargeting()
        }

        const channelEvt = (e, i) => {
            channelIndex.value = i
            filterWorkList()
            autoPos(lnbTrack.value)
        }
        
        const channelSubEvt = (e, i) => {
            channelSubIndex.value = i
            autoPos(channelSubTrack.value)
            const _gBoard = document.querySelector('.g-board')
            const theadH = _gBoard.querySelector('thead').offsetHeight
            const _target = document.querySelector('#'+e.target.getAttribute('data-target'))
            _target.classList.add('focus')
            setTimeout(function() {
                _target.classList.remove('focus');
            }, 1500)
            _gBoard.scrollTo({ top : _target.offsetTop - theadH, behavior : "smooth" });
        }

        const channelSubTargeting = () => {
            let isTxt
            let no = 0
            document.querySelectorAll('.g-board tr').forEach((item) => {
                item.removeAttribute('id')
            })
            setTimeout(() => {
                document.querySelectorAll('td.dep2').forEach((item, index) => {
                    const txt = item.textContent
                    const tr = item.parentNode
                    if(isTxt !== txt && txt !== '') {
                        tr.setAttribute('id', 'target-' + no)
                        no++
                        isTxt = txt
                    }
                })
            }, 100)
        }

        const filterSearch = () => {
            if (searchValue.value.trim() !== '') {
                isBtnDel.value = true
                const trimmedQuery = searchValue.value.trim().toLowerCase()
                filteredWorkList.value = filteredWorkList.value.filter(item => {
                    for (const key in item) {
                        if (Object.prototype.hasOwnProperty.call(item, key)) {
                            const value = item[key];
                            if (typeof value === 'string' && value.includes(trimmedQuery)) return true
                        }
                    }
                    return false
                })
            } else {
                isBtnDel.value = false
                filterWorkList()
            }
        }

        const filterFocus = () => {
            searchValue.value.trim() !== '' ? isBtnDel.value = true : isBtnDel.value = false
        }

        const filterBlur = (e) => {
            if ((e.relatedTarget && !e.relatedTarget.classList.contains('btn-del')) || e.relatedTarget == null) isBtnDel.value = false
            if (searchValue.value.trim() === '') filterWorkList()
        }

        const searchValReset = () => {
            isBtnDel.value = true
            searchValue.value = ''
            isBtnDel.value = false
            filterWorkList()
        }

        const htmlBuilding = (key, text, query, name, id) => {
            if (key === '화면ID') {
                text = `<button type="button" class="link-screen">${text}</button>`
            }
            if (key === '비고') {
                text = `${(text == null) ? '' : text } <button type="button" class="hover-screen"></button>`
            }
            if (!query.trim()) return text
            if (typeof text === 'string' && text.includes(query)) {
                const regex = new RegExp(`(${query})`, 'gi')
                return text.replace(regex, '<span class="highlighted">$1</span>')
            } else {
                return text
            }
        }

        const selectEvt = (e) => {
            const label = e.target.querySelectorAll('option')[0].textContent
            if(e.target.value !== '') {
                filterChannelList()
                switch (label) {
                    case "작업자": 
                    filteredWorkList.value = filteredWorkList.value.filter(item => item.작업자 === e.target.value)
                    break;
                    case "작업일": 
                    filteredWorkList.value = filteredWorkList.value.filter(item => item.작업일 === e.target.value)
                    break;
                    case "수정일": 
                    filteredWorkList.value = filteredWorkList.value.filter(item => item.수정일 === e.target.value)
                    break;
                }
                filterChannelSubList()
                channelSubTargeting()
            } else {
                filterWorkList()
            }
        }

        const toggleDevice = () => {
            const html = document.querySelector('html')
            if(!isMobile.value) {
                html.classList.add('m')
                isMobile.value = true
            } else {
                html.classList.remove('m')
                isMobile.value = false
            }
            if(isMobile.value) {
                document.addEventListener('mouseover', function(e) {
                    if (e.target.matches('.hover-screen')) {
                        let id
                        let name
                        getSiblings(e.target.parentNode).forEach( t => {
                            if(t.classList.contains('id')) id = t.textContent
                            if(t.classList.contains('name')) name = t.textContent
                        })
                        document.querySelector('.screen-id').innerHTML = id
                        document.querySelector('.screen-name').innerHTML = name
                        deviceFrame.value.setAttribute('src', id)
                        frameHead.value.classList.add('active')
                        setTimeout(function() {
                            frameHead.value.classList.remove('active')
                        }, 600)
                    }
                })
            }
        }

        const screenSize = (e, size) => {
            getSiblings(e.target).forEach( b => {
                if(b.classList.contains('active')) b.classList.remove('active')
            })
            e.target.classList.add('active')
            deviceFrame.value.style.width = `${size}px`
        }

        const clickEvts = () => {
            document.addEventListener('click', function(e) {
                if (e.target.matches('.link-screen')) {
                    const id = e.target.textContent
                    let name
                    getSiblings(e.target.parentNode).forEach( t => {
                        if(t.classList.contains('name')) name = t.textContent
                    })
                    if(isMobile.value) {
                        document.querySelector('.screen-id').innerHTML = id
                        document.querySelector('.screen-name').innerHTML = name
                        deviceFrame.value.setAttribute('src', id)
                        frameHead.value.classList.add('active')
                        setTimeout(function() {
                            frameHead.value.classList.remove('active')
                        }, 500)
                    } else {
                        window.open(id, '_blank')
                    }
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
        
        watchEffect(() => {
            loadData()
        })

        onMounted(() => {
            scrollDrag(lnbTrack.value)
            scrollDrag(channelSubTrack.value)
            channelSubTargeting()
            clickEvts()
        })

        return {
            isMobile,
            isBtnDel,
            totalList,
            workList: filteredWorkList,
            workHead,
            channel,
            channelSub: filteredChannelSub,
            pubWorker: filteredPubWorker,
            workDate: filteredWorkDate,
            editDate: filteredEditDate,
            lnbTrack,
            channelSubTrack,
            channelEvt,
            channelSubEvt,
            channelIndex,
            channelSubIndex,
            channelSubTargeting,
            selectEvt,
            searchValue,
            deviceFrame,
            frameHead,
            filterSearch,
            filterFocus,
            filterBlur,
            searchValReset,
            htmlBuilding,
            toggleDevice,
            screenSize,
            clickEvts,
            getSiblings
        }
    }
}
</script>