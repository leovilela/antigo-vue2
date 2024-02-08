<template>
  <div id="layout-container">
    <Base-Loading />
    <div id="internal-layout">
      <div
        class="layoutDesktop"
        v-if="$mq === 'laptop' || $mq === 'desktop' || $mq === 'bigScreen'"
      >
        <div class="colunaMenu">
          <menu id="layout-sidebar" v-bind:class="{ menuActive: !menu }">
            <InternalMenuEsquerdo />
          </menu>
        </div>
        <div class="coluna" :class="{ menuDeactivate: menu }">
          <div id="layout-main" v-bind:class="{ menuActive: !menu }">
            <div id="layout-header">
              <HeaderDesktop />
            </div>

            <div id="desktop-main-content">
              <nuxt></nuxt>
            </div>

            <div id="desktop-footer">
              <FooterInterno :isSCD="isScd" />
            </div>
          </div>
        </div>
      </div>

      <div class="layoutMobile" v-if="$mq === 'mobile' || $mq === 'tablet'">
        <menu id="layout-sidebar" v-bind:class="{ menuActive: menu }">
          <InternalMenuEsquerdo />
        </menu>

        <div id="layout-header-mobile">
          <HeaderMobile />
        </div>

        <div id="layout-main">
          <nuxt />
        </div>
      </div>
    </div>
    <div id="modalMobile" v-if="$mq === 'mobile' || $mq === 'tablet'">
      <Modal />
    </div>
    <div
      id="modalDesktop"
      v-if="$mq === 'laptop' || $mq === 'desktop' || $mq === 'bigScreen'"
    >
      <Modal />
      <Print />
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import InternalMenuEsquerdo from "~/components/InternalMenuEsquerdo.vue";
import HeaderDesktop from "~/components/header-interna-desktop.vue";
import HeaderMobile from "~/components/header-interna-mobile.vue";
import FooterInterno from "~/components/InternalFooter.vue";
import ConteudoInterno from "~/templates/listoInternalContent.vue";
import Modal from "~/components/modal.vue";
import Print from "~/components/print.vue";

export default {
  components: {
    InternalMenuEsquerdo,
    HeaderMobile,
    HeaderDesktop,
    FooterInterno,
    ConteudoInterno,
    Modal,
    Print
  },
  computed: {
    ...mapState(["isScd"])
  },
  data() {
    return {
      menu: false
    };
  },
  mounted() {
    this.finishLoading();
    this.disableScd()
    this.$nuxt.$on("activeMenu", data => {
      this.menu = data;
    });
  },
  methods: {
    ...mapMutations(["disableScd", "finishLoading"])
  }
};
</script>

<style lang="less" scoped>
@import "../assets/vars.less";
@import "../assets/variables.less";

.disableOverflow {
  overflow: hidden;
}

#internal-layout {
  background-color: @color18;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
  .coluna {
    width: 800px;
    max-width: 100%;
    margin-left: 28rem;
    transition: all 0.3s;
  }

  .layoutDesktop {
    .colunaMenu {
      background-color: @color4;
      position: fixed;
      z-index: 14;
    }
    .menuDeactivate {
      margin-left: 7rem;
      transition: all 0.3s;
    }

    #layout-header {
      // overflow: hidden;
      background-color: @color2;
      height: 50px;
      bottom: 70px;
      right: 15px;
      width: calc(100% - 67px);
      transition: all 0.3s;
      z-index: 10;
      position: fixed;
      top: 0;
      right: 0;
    }

    #layout-sidebar {
      left: 0;
      width: 67px;
      position: relative;
      overflow: -webkit-paged-x;
      overflow-x: hidden;
      display: inline-block;
      -moz-transition: width 0.3s;
      -ms-transition: width 0.3s;
      transition: width 0.3s;
      padding: 0;
      height: 100vh;
      z-index: 15;

      // position: fixed;
      left: 0;
      top: 0;

      &.menuActive {
        width: 272px;
        -moz-transition: width 0.3s;
        -ms-transition: width 0.3s;
        transition: width 0.3s;
      }
    }

    #layout-main {
      display: flex;
      flex-direction: column;
      height: 100%;
      padding: 64px 0 0 0;
      width: calc(100vw - 70px);

      &.menuActive {
        width: calc(100vw - 272px);
        -moz-transition: width 0.3s;
        -ms-transition: width 0.3s;
        transition: width 0.3s;
        //padding-left: 280px;

        #layout-header {
          width: 100vw;
          padding-left: 288px;
          transition: all 0.3s;
        }
      }

      #desktop-main-content {
        display: flex;
        background-color: transparent;
        height: auto;
        min-height: calc(100vh - 113px);
        // overflow: hidden;
      }
    }
  }
  .layoutMobile {
    #layout-sidebar {
      width: 100vw;
      left: -100vw;
      position: fixed;
      -webkit-transition: all 0.25s linear;
      -moz-transition: all 0.25s linear;
      -ms-transition: all 0.25s linear;
      transition: all 0.25s linear;
      z-index: 11;
      &.menuActive {
        -webkit-transform: translateX(100vw);
        -moz-transform: translateX(100vw);
        -ms-transform: translateX(100vw);
        transform: translateX(100vw);
      }
    }

    #layout-header-mobile {
      position: relative;
      top: 0;
      width: 100vw;
      min-height: 49px;
      overflow: hidden;
      background-color: green;
      z-index: 10;
    }

    #modalMobile {
      position: absolute;
      top: 0px;
      left: 0px;
    }

    #layout-main {
      width: 100vw;
      margin-left: 0px;
      position: relative;
      background-color: @color2;

      @media (max-width: @screen-xs-max) {
        width: 100%;
      }
      @media (min-width: @screen-sm-min) {
      }
      @media (min-width: @screen-md-min) {
      }
      @media (min-width: @screen-lg-min) {
      }
    }

    #layout-footer {
      width: 100vw;
      border-top: 1px solid @color12;
      height: 64px;
      position: fixed;
      display: block;
      bottom: 0;
      background-color: @color2;
    }

    #layout-header {
      position: fixed;
      top: 0;
      width: 100%;
      // overflow: hidden;
      background-color: @color2;
    }
  }

  #layout-sidebar {
    position: absolute;
    top: 0;
    height: 100vh;
    background-color: @color4;
    color: @color4;
    z-index: 1;
    margin: 0;
  }

  #internal-footer {
    background: transparent;
    margin-left: 67px;
    transition: all 0.3s;
    position: fixed;
    bottom: 0;
    right: 0;
    width: calc(100% - 67px);

    &.menuActive {
      width: calc(100% - 272px);
      transition: all 0.3s;
    }
  }
}
</style>
