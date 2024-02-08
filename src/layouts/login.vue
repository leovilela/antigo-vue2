<template>
  <div id="login-layout">

    <div class="login-header">
      <slot name="header"></slot>
    </div>
    <div class="page container">
      <div class="row">

        <div id="login-left-content" class="col-xs-7" v-if="$mq === 'laptop' || $mq === 'desktop' || $mq === 'bigScreen'">
          <slot name="background" id="background"></slot>
          <slot name="left-content" id="content"></slot>
        </div>

        <div id="login-right-content" class="col-xs-5">
          <div id="right-form-container">
            <slot name="right-content" id="content"></slot>
          </div>
        </div>

      </div>
      <div id="login-footer" class="row" v-if="$mq !== 'mobile' && $mq !== 'tablet'">
        <slot name="footer"></slot>
      </div>
    </div>

  </div>
</template>

<style lang="less">
@import "~assets/vars.less";
@import "~assets/variables.less";
#login-layout {
  height: 100vh;
  background-image: linear-gradient(180deg, @color5, @color1);
  padding: 0 50px 68px;
  position: relative;
  overflow: hidden;
  user-select: none;

  @media (max-width: @screen-xs-max) {
    padding: 0;
  }
  @media (min-width: @screen-sm-min) {
  }
  @media (min-width: @screen-md-min) {
  }
  @media (min-width: @screen-lg-min) {
  }

  .page {
    width: 100%;
    max-width: 960px;

    & > .row {
      // height: 100vh;

      @media (max-width: @screen-xs-max) {
      }
      @media (min-width: @screen-sm-min) {
      }
      @media (min-width: @screen-md-min) {
      }
      @media (min-width: @screen-lg-min) {
      }
    }

    #login-left-content,
    #login-right-content {
      padding: 15px;
      box-sizing: border-box;
      position: relative;
      min-height: 410px;
      overflow: hidden;
      @media (max-width: @screen-xs-max) {
        height: 100vh;
      }
      @media (min-width: @screen-sm-min) {
        height: 95vh;
      }
      @media (min-width: @screen-md-min) {
        height: 95vh;
      }
      @media (min-width: @screen-lg-min) {
        height: 95vh;
      }
    }

    #login-right-content {
      background-color: @color2;
      @media (max-width: @screen-xs-max) {
        width: 100%;
        padding-bottom: 0;
      }
      @media (min-width: @screen-sm-min) {
      }
      @media (min-width: @screen-md-min) {
      }
      @media (min-width: @screen-lg-min) {
      }

      #right-form-container {
        height: 100%;
        overflow-y: auto;
        overflow-x: hidden;
      }
    }

    #login-footer {
      // color: @tf_color4;
      // font-family: "tt_normslight";
      // opacity: 0.5;
      // font-size: @ftSizeSmall;
      // width: 100vw;
      // min-height: 50px;
      // height: 5vh;

      @media (max-width: @screen-xs-max) {
        // display: none;
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
  }
}
</style>
