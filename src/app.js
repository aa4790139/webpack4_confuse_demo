import Vue from 'vue';
import antiDebugUtils from "../utls/AntiDebugUtil";
// antiDebugUtils.hook();

Vue.component('hello-component', require('./components/HelloComponent').default);

new Vue({
    el: '#app',
    data: {
        message: 'Hello from Webpack'
    }
});

