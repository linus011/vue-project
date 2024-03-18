
import { createApp } from 'vue';
import App from '@/App.vue';
import { toast } from 'vue3-toastify';
const app = createApp(App);



window.toast = app.config.globalProperties.$toast = (message, duration, types) => {

    switch (types) {
        case 'success':
            return toast.success(message, {
                autoClose: duration,
                position: toast.POSITION.BOTTOM_CENTER
            });
        case 'error':
            return toast.error(message, {
                autoClose: duration,
                position: toast.POSITION.BOTTOM_CENTER
            });
        case 'default':
            return toast.info(message, {
                autoClose: duration,
                position: toast.POSITION.BOTTOM_CENTER
            });
        
    }
};
window.toastClearAll = app.config.globalProperties.$toastClearAll = () => toast.clearAll();


