<template>
  <div class="ui-tab-group" :class="typeClass">
    <div class="ui-tabs">
      <div ref="tabTrack" class="ui-tab-track">
        <ul>
          <li
            v-for="(tab, i) in tabs"
            :key="tab.props.title"
            :class="{ active: tab.props.title === selectedIndex }"
          >
            <a href="#" class="tab-item" @click.prevent="selectedIndex = tab.props.title, clickEvt($event)">
              <span>{{tab.props.title}}</span>
            </a>
          </li>
        </ul>
        <span 
          ref="tabPos" 
          v-if="bar || box" 
          class="tab-slider"
          :class="{bar: bar, box: box}"
        ></span>
      </div>
    </div>
    <div class="ui-panels">
      <slot />
    </div>
  </div>
</template>

<script>
import { computed, onBeforeMount, onMounted, onBeforeUpdate, provide, ref, reactive, toRefs, getCurrentInstance } from 'vue'

const isTab = (node) => node.type.name === 'uiTabOld'
const isFragment = (node) => typeof node.type === 'symbol' && node.type.description === 'Fragment'
const hasTabs = (node) => node.children && node.children.length && node.children.some(isTab)
const isTabParent = (node) => isFragment(node) && hasTabs(node)

export default {
  name: 'uiTabsOld',
  props: {
    bar: { type: Boolean, default: false },
    box: { type: Boolean, default: false }
  },
  setup(props, { slots }) {
    const typeClass = computed(() => {
      let rtnAry = [
        {
          bar: props.bar,
          box: props.box
        }
      ]
      return rtnAry
    })

    const state = reactive({
      selectedIndex: null,
      tabs: [],
      count: 0
    })
      
    provide('TabsProvider', state)

    const selectTab = (i) => {
      state.selectedIndex = i
    }

    const update = () => {
      if (slots.default) {
        state.tabs = slots.default()
        .filter((node) => isTab(node) || isTabParent(node))
        .flatMap((node) => (isTabParent(node) ? node.children : node))
      }
    }

    const tabTrack = ref();
    const tabPos = ref();
    const scrollTo = getCurrentInstance().proxy.$scrollTo;

    const tabAutoPos = (e) => {
      const track = tabTrack.value;
      const trackW = track.offsetWidth;
      setTimeout(function () {
        const current = track.querySelector('.active').querySelector('span');
        const trackSclW = track.scrollWidth;
        const tLeft = current.offsetLeft;
        const tWidth = current.offsetWidth;
        const sclLeft = tLeft - (trackW / 2) + (tWidth / 2);
        const speed = Math.max(300, Math.abs(sclLeft * 2));
        if(trackW < trackSclW) scrollTo(track, { left: sclLeft }, speed);
      }, 50);
    }

    const tabActivePosSet = (e) => {
      if(!props.bar && !props.box) return false
      setTimeout(function () {
        const current = (!props.box) ? tabTrack.value.querySelector('.active').querySelector('span') : tabTrack.value.querySelector('.active')
        const trackW = tabTrack.value.offsetWidth;
        tabPos.value.style.width = current.offsetWidth + 'px';
        tabPos.value.style.left = current.offsetLeft + 'px';
      }, 50);
    }

    const currentTab = computed(() => {
      let defaultNum = state.tabs.findIndex((t) => t.props.on != undefined);
      defaultNum = (defaultNum >= 0) ? defaultNum : 0;
      return state.tabs[defaultNum].props.title;
    })

    const clickEvt = (e) => {
      tabAutoPos();
      tabActivePosSet();
    }

    onBeforeMount(() => update())
    onBeforeUpdate(() => update())

    onMounted(() => {
      selectTab(currentTab.value)
      tabAutoPos()
      tabActivePosSet()
    })

    return { 
      typeClass,
      ...toRefs(state), 
      selectTab,
      tabTrack,
      tabPos,
      clickEvt,
    }
  }
}
</script>