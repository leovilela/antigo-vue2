<template>
  <ul id="menu-navegacao-principal">
    <nuxt-link tag="li" class="item-menu" :class="item.className"  :to="item.url" v-for="(item, index) in activeMenuItems" :key="index" >
      <template v-if="item.isEnabled">
        <div class="image"></div><span class="link-menu">{{item.textPtBr}}</span>
      </template>
    </nuxt-link>
  </ul>
</template>

<style lang="less" scoped>
@import "~assets/vars.less";
@import "~assets/variables.less";

#menu-navegacao-principal {
  margin: 0;
  padding: 0;
  list-style: none;

  @media (max-width: @screen-xs-max) {
    width: 100%;
  }
  @media (min-width: @screen-sm-min) {
    width: 280px;
  }
  @media (min-width: @screen-md-min) {
    width: 280px;
  }
  @media (min-width: @screen-lg-min) {
    width: 280px;
  }

  .search {
    &:hover {
      padding-left: 0px;
    }
  }

  #search {
    padding: 0;
    margin-left: 10px;
    position: relative;
    min-width: 150px;
    width: 100%;

    &:hover {
      margin-left: 10px;
    }

    .search-icon {
      position: relative;
      display: inline-block;
      color: @color2;
      font-size: @ftSizeExtraLarge;
      top: 8px;
    }
  }

  #profile {
    margin-top: 10px;
    margin-bottom: 10px;
    color: @color1;
    font-family: @mainFontRegular;
    font-size: 15px;
    padding: 0;
    padding-left: 15px;
    max-width: 250px;
    display: inline-block;
    .welcome {
      color: @color6;
      font-family: @mainFontLight;
      font-size: @ftSizeNormal;
    }

    * {
      display: inline-block;
    }

    .profile-button {
      color: @color1;
      padding: 0;

      span {
        font-size: 10px;
        padding-left: 5px;
      }

      &:hover {
        text-decoration: none;
      }

      &:focus {
        text-decoration: none;
        outline: 0;
      }
    }

    .profile-picture {
      border-radius: 100%;
      padding: 0 10px;
      margin-top: -3px;
      max-height: 40px;
    }

    .profile-notifications {
      margin: 0;
      padding: 0;
    }
  }

  .item-menu {
    width: 96%;
    padding-left: 5px;
    @media (max-width: @screen-xs-max) {
      width: calc(100vw);
    }
    @media (min-width: @screen-sm-min) {
      width: calc(100vw);
      opacity: 0.34;
    }
    @media (min-width: @screen-md-min) {
      opacity: 0.34;
    }
    @media (min-width: @screen-lg-min) {
      opacity: 0.34;
    }

    &:hover {
      cursor: pointer;
    }

    .image {
      position: relative;
      display: inline-block;
      width: 40px;
      height: 40px;
      background-size: contain;
      margin: 10px 13px 10px 8px;
      background-size: contain;
      background-repeat: no-repeat;
      background-position: 0 0;
      background-color: transparent;
      @media (min-width: @screen-sm-min) {
        width: 35px;
        height: 35px;
      }
      @media (min-width: @screen-md-min) {
        width: 35px;
        height: 35px;
      }
    }

    &:hover,
    &.nuxt-link-exact-active,
    &.nuxt-link-active  {
      background-color: @color5;
      border-left: 5px @color7 solid;
      opacity: 1;
      .image {
        margin-left: 3px;
      }
    }
    .link-menu {
      font-family: @mainFontLight;
      font-size: @ftSizeNormal;
      color: @color7;
      text-decoration: none;
      width: calc(100% - 70px);
      position: relative;
      display: inline-block;
      bottom: 22px;
    }
    &.newTransaction {
      .image {
        background-image: url("~assets/img/ico-nova-transacao-pq.png");
      }
    }
    &.financing {
      .image {
        background-image: url("~assets/img/ico-financiamentos.png");
      }
    }
    // &.search {
    //   .image {
    //     background-image: url("~assets/img/ico-simulacao-menu-pq.png");
    //   }
    // }
    // &.newSimulation {
    //   .image {
    //     background-image: url("~assets/img/ico-simulacao-menu-pq.png");
    //   }
    // }
    &.exchangeApproval {
      .image {
        background-image: url("~assets/img/ico-aprovacoes.png");
      }
    }

    &.clientPanel {
      .image {
        background-image: url("~assets/img/ico-painel-cliente-pq.png");
      }
    }
    &.register {
      .image {
        background-image: url("~assets/img/ico-meus-dados-cadastrais-pq.png");
      }
    }
    &.schedule {
      .image {
        background-image: url("~assets/img/ico-agenda-pq.png");
      }
    }
    &.settlement {
      .image {
        background-image: url("~assets/img/ico-extrato-pq.png");
      }
    }
    &.conciliation {
      .image {
        background-image: url("~assets/img/ico-conciliacao-pq.png");
      }
    }
    &.transactions {
      .image {
        background-image: url("~assets/img/ico-historico-transacoes-pq.png");
      }
    }
    &.paymentReports {
      .image {
        background-image: url("~assets/img/ico-relatorios-pagamentos-pq.png");
      }
    }
    &.externalTransactions {
      .image {
        background-image: url("~assets/img/ico_transacoes_externas-pq.png");
      }
    }
    &.paymentAccount {
      .image {
        background-image: url("~assets/img/ico-conta-virtual-pq.png");
      }
    }
    &.messages {
      .image {
        background-image: url("~assets/img/ico-mensagens-pq.png");
      }
    }
    &.configurations {
      .image {
        background-image: url("~assets/img/ico-configuracoes-pq.png");
      }
    }
    &.payments {
      .image {
        background-image: url("../assets/img/ico-debVeiculoDetran.png");
      }
    }
    &.loans {
      .image {
        background-image: url("~assets/img/ico-emprestimos.png");
      }
    }
  }
}
</style>

<script>
/* eslint-disable */

const menuPrincipalEsquerdo = {
  computed: {
    activeMenu(url, check) {
      this.switchUrl = url === check ? true : false;
      return this.switchUrl;
    },
  },
  props: {
    menuItensChild: {
      type: Array,
      required: true,
    },
  },

  computed: {
    activeMenuItems() {
      return this.menuItensChild
    }
  },

  data: () => ({
    url: "",
    urlAtual: false,
    switchUrl: false,
  }),
};

export default menuPrincipalEsquerdo;
</script>
