<template>
  <div class="container-fluid"  v-if="detran.resultDetranPayments">
    <div class="row">
      <a name="top" />
    <div class="row">
      <ul class="pagamentos-tabs">
        <nuxt-link class="pagamentos-tabs-link" to="/debitos-veiculares/detran/ipva">Detran</nuxt-link>
        <nuxt-link class="pagamentos-tabs-link" to="/debitos-veiculares/detran/relatorios">{{$t('titles.relatorios')}}</nuxt-link>
        <nuxt-child></nuxt-child>
      </ul>
    </div>
    </div>
  </div>
  <div class="container-fluid"  v-else>
    <div class="row">
      <h1>Operação não permitida</h1>
    </div>
  </div>

</template>

<script>

import { mapState, mapActions, mapMutations } from "vuex";

const menuExport = {
  data() {
    return {
      detran: {
        resultDetranPayments: true,
      },

    };
  },
  async mounted() {
    const self = this;
    this.detran.resultDetranPayments = false;
    const detranPayments = this.typesOfservices;
    if (detranPayments) {
      this.detran.resultDetranPayments = detranPayments.find(service => service.serviceName === "DETRAN - Pagamento de Taxas");
    } else {
      this.detran.resultDetranPayments = false;
    }
  },
  methods: {
    ...mapMutations(["startLoading", "finishLoading"]),
    // uma função "getter" computada (computed getter)
  },
  computed: {
    ...mapState({
      typesOfservices: state => state.transaction.typesOfservices,
      transactionType: state => state.transaction.transactionTypes,
      fields: state => state.transaction.fields,
    }),
  },
};

export default menuExport;

</script>

<style lang="less" scoped>
@import "~assets/vars.less";
.page-pagamentos {
  #conteudo-pagamentos {
    .pagamentos-tabs {
      list-style: none;
      padding: 0;

      &-link {
        color: @color1;
        text-decoration: none;
        font-size: @ftSizeLarge;
        padding: 0 10px;
        padding-bottom: 5px;

        &.nuxt-link-exact-active {
          border-bottom: 1px solid @color1;
        }
      }
    }
  }
  .alertCobranca {
    position: relative;
    width: 100%;
    padding: 1%;
    background: black;
    color:white;
    font-size: 1.9rem;
    font-weight: bold;
    margin-top: 3px;
    a{
      color: yellow;
      &:hover{
        text-decoration: underline;
      }
    }
    span{
      color:white;
      cursor: pointer;
      position: absolute;
      top: 10%;
      right: 0.5%;
    }
  }
  .alertCobrancaBlock{
    height: 100px;
  }
}
</style>
