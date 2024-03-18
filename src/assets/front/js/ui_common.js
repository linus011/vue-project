import anime from 'animejs/lib/anime.es.js'

const methods = {
    numRolling(el, val) {
        let currNum
        let ticks;
        let fresh = true;
        const time = 1000;

        function scrollNumber(digits) {
            el.querySelectorAll('span[data-value]').forEach((tick, i) => {
                if(digits[i] === ',') {
                    tick.classList.add('comma');
                    tick.style.transform = `translateY(-1000%)`;
                } else {
                    tick.style.transform = `translateY(-${100 * parseInt(digits[i])}%)`;   
                }
            })

            setTimeout(() => {
                el.classList.add('on');
            }, 100)
        }

        function addDigit(digit, fresh) {
            const spanList = Array(11)
                .join(0)
                .split(0)
                .map((x, j) => `<span>${j > 9 ? ',' : j}</span>`)
                .join('')
            el.insertAdjacentHTML(
                "beforeend",
                `<span style="transform: translateY(-1100%)" data-value="${digit}">${spanList}</span>`
            )

            const firstDigit = el.lastElementChild

            setTimeout(() => {
                firstDigit.className = "visible";
            }, fresh ? 0 : 2000);
        }

        function removeDigit() {
            const firstDigit = el.lastElementChild
            firstDigit.classList.remove("visible");
            setTimeout(() => {
                firstDigit.remove();
            }, 1000);
        }

        function setup(val) {
            const digits = val.toString().split('')

            for (let i = 0; i < digits.length; i++) {
                addDigit('0', true)
            }

            scrollNumber(['0'])

            setTimeout(() => scrollNumber(digits), 1000)
            currNum = val
        }

        function rollToNumber(idx, num) {
            el.style.transform = `translateY(-${100 - num * 10}%)`;
        }

        function update(num) {
            if (!num) {
                num = Math.round(Math.random() * 100)
            }
            const toDigits = num.toString().split('')
            const fromDigits = currNum.toString().split('')

            for (let i = fromDigits.length - toDigits.length; i > 0; i--) {
                removeDigit()
            }
            for (let i = toDigits.length - fromDigits.length; i > 0; i--) {
                addDigit(toDigits[i]);
            }

            scrollNumber(toDigits)
            currNum = num
        }

        setup(val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
    },
    numCounter(el, start, end, duration) {
        setTimeout(() => {
            el.classList.add('on');
        }, 100)
        let current = start,
            range = end - start,
            increment = end > start ? 1 : -1,
            step = Math.abs(Math.floor(duration / range)),
            timer = setInterval(() => {
                (end == 0) ? current = 0 : current += increment;
                el.textContent = current.toString().replace(/\B(?=(\d{3})+(?!\d))/g,',');
                if (current == end) {
                    clearInterval(timer);
                }
            }, step);
    },
    scrollTo(el, option, speed, fn) {
        let wrap = window.document.scrollingElement || window.document.body || window.document.documentElement;
        if (el !== 'window') {
            if (typeof el === 'string') {
            wrap = document.querySelector(el);
            } else {
            wrap = el;
            }
        }
        if (wrap === null) return;
        let leftVal = wrap.scrollLeft;
        let topVal = wrap.scrollTop;
        
        if (option) {
            if (option.left !== undefined) leftVal = option.left;
            if (option.top !== undefined) topVal = option.top;
        }
        
        anime({
            targets: wrap,
            scrollLeft: leftVal,
            scrollTop: topVal,
            duration: speed,
            easing: 'easeInOutQuad',
            complete: () => {
                if (fn) fn();
            }
        });
    },
    keyPadDetect() {
        let windowHeight = window.innerHeight;
 
        function resizeHandler() {
            windowHeight = window.innerHeight;
        }
        
        function viewportHandler(event) {
            const viewport = event.target;
            const viewportHeight = viewport.height;
            const htmlElement = document.querySelector('html');
            
            if (windowHeight > viewportHeight) {
                htmlElement.classList.add('is-keypad');
            } else {
                htmlElement.classList.remove('is-keypad');
            }
        }
        
        window.addEventListener('resize', resizeHandler);
        window.visualViewport.addEventListener('resize', viewportHandler);
    }
}

export default {
    install: (Vue) => { 
        Vue.config.globalProperties.$numRolling = methods.numRolling;
        Vue.config.globalProperties.$numCounter = methods.numCounter;
        Vue.config.globalProperties.$scrollTo = methods.scrollTo;
        Vue.config.globalProperties.$keyPadDetect = methods.keyPadDetect;
    },
}