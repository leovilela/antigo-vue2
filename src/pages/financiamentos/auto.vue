<template>
  <div class="container-fluid content-box">
    <div class="row" >
      <div class="alertCobranca alertCobrancaBlock" v-if="showMsg">
        <p>{{text.alertCobrancaTxt}}</p>
        <span class='icon-cancel' aria-hidden='true' @click="hideMsg"></span>
      </div>
      <ul class="financiamentos-tabs">
        <nuxt-link class="financiamentos-tabs-link" to="/financiamentos/auto/" exact>Financiamento</nuxt-link>
        <nuxt-link class="financiamentos-tabs-link" to="/financiamentos/auto/relatorio/">Relatórios</nuxt-link>
      </ul>
      <nuxt-child></nuxt-child>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  data() {
    return {
      showMsg: true,
      text: {
        alertCobrancaTxt: this.$t("alerts.noChargeText"),
      },
    };
  },
  mounted() {
    this.finishLoading();
  },
  computed: {
    linkClass() {
      return this.$route.fullPath.includes("relatorio") ? "disabled" : "active";
    },
  },
  methods: {
    ...mapMutations(["finishLoading"]),
    hideMsg(event) {
      this.showMsg = false;
    },
  },
};

</script>

<style lang="less">
@import "~assets/vars.less";


.page-financiamentos {
  #conteudo-financiamentos {
    .financiamentos-tabs {
      list-style: none;
      margin-top: 40px;
      margin-bottom: 30px;
      padding: 0;

      &-link {
        font-family: 'newjuneregular';
        font-size: @ftSizeNormal;
        color: @color1;
        text-decoration: none;
        padding: 0 10px;
        padding-bottom: 5px;
        opacity: .65;

      }
      .nuxt-link-exact-active {
        border-bottom: 1px solid @color1;
        opacity: 1;
      }
      .nuxt-link-active {
        border-bottom: 1px solid @color1;
        opacity: 1;
      }
      .disabled {
          opacity: .65;
        }
    }
  }

  .alertCobranca {
    font-family: 'newjuneregular';
    font-size: @ftSizeSmall;
    position: absolute;
    top: -30px;
    right: 6px;
    width: 99.1%;
    padding: 10px 10px 0 10px;
    background: @color1;
    color:@color2;
    z-index: 1;
    a{
      color: @color7;
      &:hover{
        text-decoration: underline;
      }
    }
    span{
      color:@color7;
      cursor: pointer;
      position: absolute;
      top: 30%;
      right: 0.5%;
    }
  }
}
</style>
