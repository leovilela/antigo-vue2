/* eslint-disable */
import Vue from 'vue'
import VueMq from 'vue-mq'
Vue.use(VueMq, {
  breakpoints: {
    mobile: 480,
    tablet: 768,
    laptop: 992,
    desktop: 1200,
    bigScreen: Infinity
  }
})
