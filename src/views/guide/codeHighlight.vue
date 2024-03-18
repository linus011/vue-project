<template>
    <div class="code-viewer">
        <div class="line-numbers">
            <span v-for="n in lineCount" :key="n">{{ n }}</span>
        </div>
        <pre v-highlightjs="{ language: language }">
            <code ref="codeValue" :class="language">{{ codeContent }}</code>
        </pre>
        <button ref="copyButton" type="button" class="btn-copy" :class="{ copy: isCopy }" @click="copyToClipboard">
            <span class="offscreen">{{ copyText }}</span>
        </button>
    </div>
</template>

<script>
import { ref, onMounted, computed, watch } from 'vue'

export default {
    props: {
        code: {type: String, required: true},
        language: {type: String, default: ''}
    },
    setup(props) {
        const codeValue = ref()
        const codeContent = ref(props.code)
        const copyButton = ref()
        const isCopy = ref(false)

        const copyText = computed(() => {
            return isCopy.value ? 'Copied!' : 'Copy to Clipboard';
        })

        const lineCount = computed(() => {
            return (props.code.match(/\n/g) || []).length + 1
        })

        const copyToClipboard = () => {
            const script = document.createElement('script');
            script.src = '/src/assets/guide/js/clipboard.min.js';
            script.onload = () => {
                const clipboard = new ClipboardJS(copyButton.value, {
                    text: () => codeContent.value
                })
                clipboard.on('success', (e) => {
                    isCopy.value = true
                    setTimeout(() => {
                        isCopy.value = false;
                    }, 2000)
                    e.clearSelection();
                });
                clipboard.on('error', (e) => {
                    console.log('Error copying:', e.action);
                });
            };
            document.head.appendChild(script);
        }

        onMounted(() => {
            copyToClipboard()
        })

        return {
            codeValue,
            codeContent,
            copyButton,
            isCopy,
            copyText,
            lineCount,
            copyToClipboard
        };
    }
};
</script>