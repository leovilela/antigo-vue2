<template>
  <div id="contato">
    <div id="duvidas">
      <span id="headset"><img src="~/assets/img/user-data-headset.png" alt="headset"></span>
      <p id="text">{{text.duvidas}}</p>
    </div>
    <p id="telefone">{{text.telefone}}</p>

    <div id="email" v-if="getAuth">
      <p @click="modalContato">
        <span class="glyphicon glyphicon-envelope"></span>{{text.fale_comigo}}
      </p>
    </div>

    <div id="suporte" @click.prevent="popupSuporte">
      <a @click.prevent href="https://get.teamviewer.com/listofacil_acessoremoto">
        <span><img src="~/assets/img/ico-team-viewer.svg" alt="team viewer"></span> {{text.suporte_remoto}}
      </a>
    </div>
  </div>
</template>

<style lang="less" scoped>
@import "~assets/vars.less";
@import "~assets/variables.less";

#contato {
  margin-top: 10px;
  // width: 100%;

  p {
    margin: 0;
  }

  #duvidas {
    color: @color12;
    font-family: @mainFontRegular;
    font-weight: bold;
    font-size: @ftSizeLarge;
    margin: 0 20px;

    * {
      display: inline-block;
      vertical-align: middle;
    }

    #headset {
      img {
        width: 24px;
        vertical-align: bottom;
      }
    }

    p {
      @media (max-width: @screen-xs-max) {
        max-width: 150px;
        vertical-align: bottom;
      }
      @media (min-width: @screen-sm-min) {
        max-width: unset;
        margin: 0 5px;
      }
      @media (min-width: @screen-md-min) {
      }
      @media (min-width: @screen-lg-min) {
      }
    }
  }

  #telefone {
    font-size: @ftSizeExtraLarge;
    font-family: @mainFontRegular;
    font-weight: bold;
    color: @color1;
    margin-bottom: 10px;
  }

  #email,
  #suporte {
    padding: 10px;
    font-size: @ftSizeLarge;
    font-family: @mainFontRegular;

    img, p, a {
      display: inline-block;
    }

    img {
      height: 20px;
      width: 20px;
      vertical-align: text-top;
    }
    p, a {
      color: @color2;
      user-select: none;
    }
    p {
      &:hover {
        cursor: pointer;
      }
    }
    span {
      margin-right: 10px;
      color: @color2;
    }
  }

  #email {
    background-color: @color3;
  }

  #suporte {
    background-color: @color13;
  }
}
</style>

<script>
export default {
  data() {
    return {
      text: {
        fale_comigo: "Fale com a Listo",
        suporte_remoto: "Suporte remoto",
        duvidas: "Dúvidas?",
        telefone: "0800.942.1835",
      },
    };
  },
  methods: {
    modalContato() {
      const self = this;

      // console.log("abre contato");

      self.$nuxt.$emit("toggleModal", {
        api: "faleComigo",
        modalContent: "",
      });
    },
    popupSuporte() {
      window.open("https://get.teamviewer.com/listofacil_acessoremoto", "_blank", "location=yes,height=570,width=520,scrollbars=yes,status=yes");
    },
  },
  computed: {
    getAuth() {
      return $nuxt.$store.state.autenticado;
    },
  },
};
</script>
