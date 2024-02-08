<template>
  <div id="mobile-login-home">
    <div id="logo-listo">
      <img src="~assets/img/logo-listofacil.svg" alt="logo listo fácil">
    </div>
    <div id="welcome">
      <p><b>{{text.ola}}</b>,</p>
      <p>{{text.seja_bem_vindo}}</p>
    </div>
    <div id="buttons">
      <button class="acessar" @click="submit">
        <nuxt-link to="/login/acesso">{{text.ja_sou}}</nuxt-link>
      </button>
      <button class="cadastrar">
        <nuxt-link to="/novo-cadastro">{{text.seja_listo}}</nuxt-link>
      </button>
    </div>
    <div id="footer">
      <slot name="mobile-home-footer"></slot>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      toggle: true,
      text: {
        bem_vindo: "<span>Olá,</span><br>Seja Bem Vindo!",
        ja_sou: "JÁ SOU LISTO",
        seja_listo: "SEJA LISTO",
        ola: "Olá",
        seja_bem_vindo: "Quer saber o que a gente faz?",
        duvidas: "Dúvidas? Fale com a Listo",
      },
    };
  },
  methods: {
    submit() {
      // console.log("clicou acessar");
      this.toggle = !this.toggle;
      this.$nuxt.$emit("acessar", this.toggle);
    },
  },
};
</script>

<style lang="less" scoped>
@import "~assets/vars.less";
@import "~assets/variables.less";

#mobile-login-home {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  padding-bottom: 100px;
  background-image: url("~assets/img/bg-login-4.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position-x: 67%;
  padding: 15px 20px;
  overflow-y: auto;
  z-index: 0;

  &:after {
    content: '';
    z-index: 1;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: rgba(0,0,0,0.55);
  }

  #logo-listo, #welcome, #footer, #buttons {
    z-index: 2;
    position: relative;
    color: @color2;
    padding: 20px 0;
  }

  #logo-listo {
    padding-top: 0;
    img {
      padding: 0;
    }
  }

  #welcome {
    font-size: @ftSizeLarge;
    font-size: @ftSizeExtraLarge;
    // font-size: @ftSizeBig;
    // font-size: @ftBigTitSize;
    text-align: left;
    margin-top: 25px;

    p {
      margin: 0;
      line-height: initial;
    }
    b {
      font-family: @mainFontBold;
      font-size: 45px;
    }
  }

  #buttons {
    z-index: 3;
    position: absolute;
    top: 40%;
    margin: auto;
    left: 20px;
    right: 20px;

    button {
      width: 100%;
      background: @color5;

      a {
        text-decoration: none;
      }

      // &.acessar {
      //   background-color: @color11;
      // }

      // &.cadastrar {
      //   background-color: @color17;
      // }
    }
  }

  #footer {
    position: absolute;
    margin: auto;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 2;
    text-align: center;
    padding-bottom: 10px;
  }
}
</style>
