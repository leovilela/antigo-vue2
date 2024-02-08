<template>
  <div id="contentNovaTransacao">
    <a class="page-back-arrow glyphicon glyphicon-arrow-left" v-on:click="navegacaoB('painel')" v-if="$mq === 'mobile'"></a>
    <component-content-section>
      <div id="transacao" slot="content">
        <h2 id="content-section-title">{{text.dados_transacao}}</h2>
        <form-transacao></form-transacao>
      </div>
    </component-content-section>
  </div>
</template>

<script>
import contentSection from "~/components/mainContentSection.vue";
import contentTabs from "~/components/mainContentTabs.vue";

import formTransacao from "~/components/formTransacao.vue";

export default {
  components: {
    "component-content-section": contentSection,
    "component-content-tabs": contentTabs,
    "form-transacao": formTransacao,
  },

  data() {
    return {
      text: {
        dados_transacao: "Dados da transação",
      },
    };
  },

  methods: {
    // uma função "getter" computada (computed getter)
    navegacaoB(pp) {
      this.$nuxt.$emit("navMobileInternal", pp);
    },
  },
};
</script>
