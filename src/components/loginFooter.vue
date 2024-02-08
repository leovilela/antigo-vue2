<template>
  <div id="login-footer" class="col-xs-12">
    <p v-if="$mq !== 'mobile'" id="desktop">® {{copyRightYear}} Listo Tecnologia S.A. Todos os direitos reservados.</p>
    <div v-else id="mobile">
        <div id="contato">
          <span><img src="~assets/img/user-data-headset-branco.png" alt="headset"></span>
          <div class="texto">
            <p id="duvidas">{{text.duvidas}}</p>
            <p id="telefone">0800.942.1835</p>
          </div>
        </div>
        <p id="empresa">® {{copyRightYear}} Listo Tecnologia S.A.</p>
      </div>
  </div>
</template>

<style lang="less" scoped>
@import "~assets/vars.less";
@import "~assets/variables.less";

#login-footer {
  text-align: center;
  font-size: @ftSizeSmall;
  color: @tf_color4;
  #desktop {
    text-align: center;
    margin: 0;
    margin-top: 8px;
  }
  #mobile {
    #contato {
      font-size: @ftSizeNormal;

      & > * {
        display: inline-block;
        vertical-align: middle;
      }

      img {
        margin-right: 10px;
        max-width: 30px;
      }

      .texto {
        color: @color2;

        p {
          margin: 0;
        }

        #telefone {
          font-size: @ftSizeLarge;
          font-weight: bold;
          text-align: left;
        }
      }
    }
    #empresa {
      opacity: 0.5;
      color: @color2;
      padding-top: 5px;
    }
  }
}
</style>

<script>
export default {
  data() {
    return {
      text: {
        duvidas: "Dúvidas? Fale com a Listo",
      },
    };
  },
  computed: {
    copyRightYear() {
      return new Date().getFullYear();
    },
  },

};
</script>
