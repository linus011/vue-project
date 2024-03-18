import { createStore } from 'vuex';
import moduleA from './platform/sample';
const store = createStore({
    namespaced: true,
    modules: {
        //모듈별로 추가
        moduleA
    }
});

export default store;
