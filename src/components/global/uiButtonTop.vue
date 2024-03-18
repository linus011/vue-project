<template>
    <Transition>
        <v-btn variant="text" class="btn-top"
            ref="btnTop"
            @click="clickEvt"
        >
            <span class="offscreen">상단으로 이동</span>
        </v-btn>
    </Transition>
</template>
<script>
import { ref, onMounted, onUnmounted } from 'vue'
export default {
    setup() {
        const btnTop = ref(null)
        const wrap = document.querySelector('#mainWrap')

        const scrollEvt = () => {
            if(wrap.scrollTop > 200) {
                btnTop.value.$el.style.display = 'block'
                setTimeout(() => {
                    btnTop.value.$el.style.transform = 'scale(1) translateY(0)'
                    btnTop.value.$el.style.opacity = '1'
                }, 10);
            } else {
                btnTop.value.$el.style.transform = 'scale(0) translateY(100%)'
                btnTop.value.$el.style.opacity = '0'
                if(btnTop.value.$el.classList.contains('show')) {
                    btnTop.value.$el.addEventListener('transitionend', () => {
                        btnTop.value.$el.style.display = 'none'
                    });
                }
            }
        }
        const btnTopSet = () => {
            const btnFix = document.querySelector('.btn-bottom .btn-area')
            if(btnFix) {
                btnTop.value.$el.style.bottom = `${btnFix.offsetHeight - 18}px`
            } else {
                btnTop.value.$el.removeAttribute('style')
            }
        }

        wrap.addEventListener('scroll', scrollEvt)
        
        const clickEvt = () => {
            wrap.scrollTo({ top : 0, behavior : "smooth" });
        }

        onMounted(() => {
            btnTopSet()
            scrollEvt()
        })

        onUnmounted(() => {
            wrap.removeEventListener('scroll', scrollEvt)
        });

        return {
            btnTop,
            scrollEvt,
            clickEvt,
            btnTopSet
        }
    }
}
</script>
