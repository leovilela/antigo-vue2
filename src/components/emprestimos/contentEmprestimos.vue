<template>
  <div id="conteudo-emprestimos" class="page-emprestimos" v-if="!controls.loading">

    <!-- <p>{{verificaAssinatura}}</p> -->
    <!-- <p>{{verificaEmprestimoAtivo}}</p> -->
    <!-- <p>Tipo de emprestimo: {{verificaTipoEmprestimo}}</p> -->
    <!-- <p>getCurrentTab :{{getCurrentTab}}</p> -->

    <ul class="tabs-emprestimos">
      <!-- <li v-for="(tab, index) in tabs" :key="index" :id="tab.id" :class="{'active': controls.currentTab == tab.id, 'disabled': !tab.isEnabled}" @click="controls.currentTab = tab.id">{{tab.text}}</li> -->
      <li :id="tabs.limites.id" @click="changeTab('limites')" :class="{
        'disabled': (getLoanOnlyReport || showCCBtoSign) ,
        'active': getCurrentTab == 'limites'
      }">{{tabs.limites.text}}</li>
      <li :id="tabs.transacao.id" @click="changeTab('transacao')" :class="{
        'disabled': getLoanOnlyReport || !enableTransactionTab,
        'active': getCurrentTab == 'transacao',
      }">{{tabs.transacao.text}}</li>
      <li :id="tabs.relatorio.id" @click="changeTab('relatorio')" :class="{
        'active': getCurrentTab == 'relatorio',
      }">{{tabs.relatorio.text}}</li>
    </ul>

    <content-section v-if="getCurrentTab == 'limites'">
      <form-limites slot="content"></form-limites>
    </content-section>

    <content-section v-if="getCurrentTab == 'transacao'">
      <form-novo-emprestimo slot="content"></form-novo-emprestimo>
    </content-section>

    <content-section v-if="getCurrentTab == 'relatorio'">
      <content-relatorio slot="content"></content-relatorio>
    </content-section>
  </div>
</template>

<script>
import contentSection from "~/components/mainContentSection.vue";
import formLimites from "~/components/emprestimos/limites/formLoanLimits.vue";
import formNovoEmprestimo from "~/components/emprestimos/formNovoEmprestimo.vue";
import signDocument from "~/components/emprestimos/signDocument.vue";
import contentRelatorio from "~/components/emprestimos/relatorio/contentRelatorioEmprestimos.vue";

export default {
  data() {
    return {
      controls: {
        // currentTab: "limites",
        // loading: true,
      },
      tabs: {
        limites: {
          id: "limites",
          text: "Meus limites",

        },
        transacao: {
          id: "dados",
          text: "Dados da transação",

        },
        relatorio: {
          id: "relatorio",
          text: "Relatório empréstimo",

        },
      },
    };
  },
  methods: {
    changeTab(valor) {
      const self = this;
      $nuxt.$store.commit("setLoanCurrentTab", valor);
    },
  },
  components: {
    contentSection,
    formLimites,
    formNovoEmprestimo,
    contentRelatorio,
  },
  computed: {
    getLoanOnlyReport() {
      return $nuxt.$store.state.emprestimos.onlyReport;
    },
    enableTransactionTab() {
      return $nuxt.$store.state.emprestimos.completed && $nuxt.$store.state.emprestimos.signed && $nuxt.$store.state.emprestimos.active;
    },
    getCurrentTab() {
      return $nuxt.$store.state.emprestimos.currentTab;
    },
    getLoanFormCompleted() {
      return $nuxt.$store.state.emprestimos.completed;
    },
    getLoanFormSigned() {
      return $nuxt.$store.state.emprestimos.signed;
    },
    getLoanFormActive() {
      return $nuxt.$store.state.emprestimos.active;
    },
    showCCBtoSign() {
      return $nuxt.$store.state.emprestimos.ccbStatus;
    },
  },

};
</script>

<style lang="less">
@import "~assets/main.less";
@import "~assets/vars.less";

.page-emprestimos {
  .tabs-emprestimos {
    padding: 0;
    margin: 0;
    user-select: none;

    li {
      display: inline-block;
      font-size: @ftSizeLarge;
      color: @color10;
      padding: 5px 20px;
      border-bottom: 2px solid @color2;
      cursor: pointer;

      &.active {
        color: @color5;
      }

      &:hover {
        color: @color5;
      }

      &:hover {
        border-bottom: 2px solid @color5;
      }

      &.active {
        border-bottom: 2px solid @color5;
      }

      &.disabled {
        opacity: 0.5;
        pointer-events: none;
      }
    }
  }
}
</style>
