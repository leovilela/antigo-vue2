<template>
  <div id="internalContent">
    <div class="conteudoInternoNav">
      <transition name="slide-fade">
        <div id="content">
          <slot name="content"></slot>
        </div>
      </transition>
    </div>
  </div>
</template>

<style lang="less" scoped>
  @import "~assets/vars.less";
  @import "~assets/variables.less";

  #internalContent {
    width: 100%;
    height: 100%;

    @media (max-width: @screen-xs-max) {
      .slide-fade-enter-active {
        transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
      }
      .slide-fade-leave-active {
        transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
      }
      .slide-fade-enter, .slide-fade-leave-to
        /* .slide-fade-leave-active em versões anteriores a 2.1.8 */ {
          transform: translateX(400px);
        opacity: 0;
      }
    }
    @media (min-width: @screen-sm-min) {
      //height: calc(100vh - 106px);
    }
    @media (min-width: @screen-md-min) {
    }
    @media (min-width: @screen-lg-min) {
    }

    .conteudoInternoNav {
      @media (max-width: @screen-xs-max) {
        width: 100%;
        overflow-y: auto;
        overflow-x: hidden;
        position: relative;
        height: calc(100vh - 104px);
        //overflow: hidden;
      }
      @media (min-width: @screen-sm-min) {
      }
      @media (min-width: @screen-md-min) {
      }
      @media (min-width: @screen-lg-min) {
      }
    }

    @media (max-width: @screen-xs-max) {
    }
    @media (min-width: @screen-sm-min) {
    }
    @media (min-width: @screen-md-min) {
    }
    @media (min-width: @screen-lg-min) {
    }

    #panel,
    #content {
      background-color: #fff;
      display: inline-block;
      box-shadow: 0 2px 6px 0px rgba(0, 0, 0, 0.07);

      @media (max-width: @screen-xs-max) {
        height: calc(100vh - 144px);
        width: 100vw;
        margin: 0;
        box-shadow: none;
      }
      @media (min-width: @screen-sm-min) {
        height: calc(100% - 88px);
        min-height: calc(100% - 88px);
        margin-bottom: 10px;
      }
      @media (min-width: @screen-md-min) {
        margin: 5px;
      }
      @media (min-width: @screen-lg-min) {
      }
    }

    #panel {
      @media (max-width: @screen-xs-max) {
        width: 100vw;
        display: inline-block;
        vertical-align: top;
      }
      @media (min-width: @screen-sm-min) {
        width: 98%;
        display: block;
      }
      @media (min-width: @screen-md-min) {
        // width: 48%;
        max-width: 230px;
        display: inline-block;
        vertical-align: top;
      }
      @media (min-width: @screen-lg-min) {
        // width: 48%;
        // max-width: 230px;
        // display: inline-block;
        // vertical-align: top;
      }
    }
    #content {
      // padding: 10px;
      z-index: 30;
      @media (max-width: @screen-xs-max) {
        width: 100%;
        vertical-align: top;
      }
      @media (min-width: @screen-sm-min) {
        width: 98%;
        display: inline-block;
      }
      @media (min-width: @screen-md-min) {
        width: calc(100% - 13px);
        display: inline-block;
        vertical-align: top;
      }
      @media (min-width: @screen-lg-min) {
        // width: calc(100% - 241px);
        // display: inline-block;
        // vertical-align: top;
      }
    }
  }
</style>

<script>
export default {
  data() {
    return {
      panel: true,
      content: false,
      url: "painel",
    };
  },
  created() {
    this.url = window.location.pathname.split("/")[2];
    this.$nuxt.$on("navMobileInternal", (data) => {
      this.content = data === "conteudo" ? true : false;
      this.panel = data === "painel" ? true : false;
      this.url = data;
      this.navegURL(data);
    });
  },
  watch: {
    url(valor) {
      const urlWatch = window.location.pathname.split("/")[2];
      this.panel = urlWatch === "painel" ? true : false;
      this.content = urlWatch === "conteudo" ? true : false;
    },
  },

  methods: {
    navegURL(valor) {
      window.history.pushState(
        null,
        `Listofácil ${valor}`,
        `../${valor}/0`,
      );

      this.panel = valor === "painel" ? true : false;
      this.content = valor === "conteudo" ? true : false;
    },
  },
};
</script>
