<template>
    <div id="loginBackgroundImage">
        <div id="mobile-bg" v-if="$mq === 'mobile' || $mq === 'tablet'"></div>
        <div id="laptop-bg" v-else>
          <carousel :perPage="1" :paginationEnabled="false" :navigationEnabled="false" :mouseDrag="false" :loop="true" :autoplay="true" :autoplayHoverPause="false" :speed="1000" :autoplayTimeout="5000">
            <slide id="slide1"></slide>
            <slide id="slide2"></slide>
            <slide id="slide3"></slide>
            <slide id="slide4"></slide>
          </carousel>
        </div>
    </div>

</template>

<script>
import { Carousel, Slide } from "vue-carousel";

export default {
  components: {
    Carousel,
    Slide,
  },
};
</script>

<style lang="less" scoped>
@import "~assets/vars.less";
@import "~assets/variables.less";

#loginBackgroundImage {
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;

  #mobile-bg {
    width: 100%;
    height: 100vh;
    // background-image: url("~assets/img/login-img-principal-mobile.png");
    background-size: cover;
    background-repeat: no-repeat;
  }

  #laptop-bg {
    width: 100%;
    height: 100%;
    box-sizing: border-box;

    .VueCarousel-slide {
      width: inherit;
      height: inherit;
      background-size: cover;
      background-repeat: no-repeat;
      background-position-y: 0;
      background-position-x: 70%;

      &#slide1 {
        background-image: url("~assets/img/bg-login-1.jpg");
      }

      &#slide2 {
        background-image: url("~assets/img/bg-login-2.jpg");
      }

      &#slide3 {
        background-image: url("~assets/img/bg-login-3.jpg");
        background-position-x: 90%;
      }

      &#slide4 {
        background-image: url("~assets/img/bg-login-4.jpg");
      }
    }
  }

  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    background: rgba(0,0,0,0.25);
    width: 100%;
    height: 100%;
  }
}
</style>
