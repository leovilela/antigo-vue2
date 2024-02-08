<template>
  <div id="contentPainelCliente">
    <a class="page-back-arrow glyphicon glyphicon-arrow-left" v-on:click="navegacaoB('painel')" v-if="$mq === 'mobile' || $mq === 'tablet'"></a>

    <div :class="{'col-xs-12 col-sm-12 col-md-5' : $nuxt.$store.state.podeTransacionar, 'col-xs-12': !$nuxt.$store.state.podeTransacionar}" v-if="$mq !== 'mobile' && $mq !== 'tablet'">
      <component-content-section :class="{ noBorder: true }">
        <div id="noticias" slot="content">
          <component-noticia :alertType="'alert-success'" v-for="(value, index) in alerts.success" :alertText="value.text" :key="index"></component-noticia>
          <component-noticia :alertType="'alert-danger'" v-for="(value, index1) in alerts.danger" :alertText="value.text" :key="index1+1"></component-noticia>
          <component-noticia :alertType="'alert-warning'" v-for="(value, index2) in alerts.warning" :alertText="value.text" :key="index2+2"></component-noticia>
          <component-noticia :alertType="'alert-info'" v-for="(value, index3) in alerts.info" :alertText="value.text" :key="index3+3"></component-noticia>
        </div>
      </component-content-section>
    </div>
    <div class="col-xs-12 col-sm-12 col-md-7" v-if="$nuxt.$store.state.podeTransacionar">
      <component-content-section>
        <div id="simulacao" slot="content">

          <Base-Tab expanded extraClasses="nav-simulacao" animated>
            <Base-TabItem label="Nova transação" v-if="typesOfservices.length !== 0">
              <form-simulacao></form-simulacao>
            </Base-TabItem>
            <Base-TabItem label="Novo financiamento" v-if="allowFinanciamento">
              <Base-SimulacaoFinanciamento></Base-SimulacaoFinanciamento>
            </Base-TabItem>
          </Base-Tab>
        </div>
      </component-content-section>
    </div>

    <div class="col-xs-12 col-sm-12 col-md-7" v-if="$mq !== 'desktop' && $mq !== 'laptop' && $mq !== 'bigScreen'">
      <component-content-section :class="{ noBorder: true }">
        <div id="noticias" slot="content" style="margin-top:30px">
          <component-noticia :alertType="'alert-success'" v-for="(value, index) in alerts.success" :alertText="value.text" :key="index"></component-noticia>
          <component-noticia :alertType="'alert-danger'" v-for="(value, index1) in alerts.danger" :alertText="value.text" :key="index1+1"></component-noticia>
          <component-noticia :alertType="'alert-warning'" v-for="(value, index2) in alerts.warning" :alertText="value.text" :key="index2+2"></component-noticia>
          <component-noticia :alertType="'alert-info'" v-for="(value, index3) in alerts.info" :alertText="value.text" :key="index3+3"></component-noticia>
        </div>
      </component-content-section>
    </div>

  </div>
</template>
<script>
/* no-multi-str */
import { mapState } from "vuex";
import contentSection from "~/components/mainContentSection.vue";
import contentTabs from "~/components/mainContentTabs.vue";

import formSimulacao from "~/components/formSimulacaoPainelCliente.vue";
import noticia from "~/components/notice.vue";

export default {
  components: {
    "component-content-section": contentSection,
    "component-content-tabs": contentTabs,
    "form-simulacao": formSimulacao,
    "component-noticia": noticia,
  },

  data() {
    return {
      text: {
        simulacao_pagamento: "Simulação de Pagamento",
        graficos: "Gráficos",
      },
      alerts: {},
    };
  },
  async mounted() {
    const { data: alerts } = await this.$axios.get(`${window.location.origin}/alerts/alertas_cliente.json`);
    this.alerts = alerts;    
  },

  computed: {
    ...mapState({
      roles: state => state.roles,
      typesOfservices: state => state.transaction.typesOfservices,
    }),
    allowFinanciamento() {
      const ROLE_TRADER = "scd_trader";
      const ROLE_ADMIN = "lf_admin";
      return this.roles.includes(ROLE_TRADER) || this.roles.includes(ROLE_ADMIN);
    },
  },
  methods: {
    formatMoney(val) {
      return val.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });
    },
    formatNumber(val) {      
      return val.toLocaleString("pt-BR");
    },
    
    navegacaoB(pp) {
      this.$nuxt.$emit("navMobileInternal", pp);
    },
    abreModalPai(id) {
      this.$nuxt.$emit("toggleModal", id);
    },
  },
};
</script>

<style lang="less">
@import "~assets/vars.less";
@import "~assets/variables.less";
  .nav-simulacao {
    li {
      background: #fff;

      a {
        &:hover {
          background: #fff;
        }
        color: #c8c8c8;
        border-radius: 0px;
        margin-bottom: -1px;
        padding: 11px;
      }
      &.active {
          background: #c8c8c8;
          a {
            border-radius: 0px;
            margin-bottom: -1px;
            padding: 11px;
          }
      }
    }
  }
</style>
