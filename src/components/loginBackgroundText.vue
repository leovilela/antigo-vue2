<template>
  <div id="background-text">
    <p class="hello"><b>{{text.ola}}</b>,<br><span>{{text.seja_bem_vindo}}</span></p>
    <div class="contato">
      <span><img src="~assets/img/user-data-headset-branco.png" alt="headset"></span>
      <div class="texto">
        <p id="duvidas">{{text.duvidas}}</p>
        <p id="telefone">0800.942.1835</p>
      </div>
    </div>
    <img v-if="$mq !== 'mobile' && $mq !== 'tablet'" class="logo-large" src="~assets/img/logo-listofacil.png" alt="logo Listo">
  </div>
</template>

<script>
export default {
  data() {
    return {
      text: {
        ola: "Olá",
        seja_bem_vindo: "Quer saber o que a gente faz?",
        duvidas: "Dúvidas? Fale com a Listo",
      },
    };
  },
};
</script>

<style lang="less" scoped>
@import "~assets/vars.less";
@import "~assets/variables.less";

#background-text {
  height: 90vh;
  z-index: 1;
  position: relative;
  font-family: @mainFontLight;

  .hello {
    color: @color2;
    font-size: @ftBigTitSize;
    margin: 0;

    b {
      font-family: @mainFontBold;
      font-size: 50px;
    }
  }

  .contato {
    font-size: @ftSizeLarge;
    position: absolute;
    bottom: 50px;
    left: 0;

    & > * {
      display: inline-block;
      vertical-align: middle;
    }

    img {
      margin-right: 10px;
    }

    .texto {
      color: @color2;

      p {
        margin: 0;
      }

      #telefone {
        font-size: @ftSizeExtraLarge;
        font-weight: bold;
      }
    }
  }

  .logo-large {
    max-width: 60%;
    position: absolute;
    bottom: 0;
    left: 0;
  }
}
</style>
