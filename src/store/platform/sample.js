const moduleA = {
    namespaced: true,
    state: {
        counter: 0
    },
    getters: {
        time2(state) {
            return state.counter * 2;
        }
    },
    mutations: {
        setCounter(state, value) {
            state.counter = value;
            console.log(state, value);
        }
    }
};
export default moduleA;