<template>
  <div id="contentSimulacao">
    <a class="page-back-arrow glyphicon glyphicon-arrow-left" v-on:click="navegacaoB('painel')" v-if="$mq === 'mobile' || $mq === 'tablet'"></a>
    <component-content-section>
      <div id="simulacao" slot="content">
        <h2 id="content-section-title">{{text.dados_simulação}}</h2>
        <form-simulacao></form-simulacao>

      </div>
    </component-content-section>
  </div>
</template>

<script>
import contentSection from "~/components/mainContentSection.vue";
import contentTabs from "~/components/mainContentTabs.vue";
import formSimulacao from "~/components/formSimulacao.vue";

export default {
  components: {
    "component-content-section": contentSection,
    "component-content-tabs": contentTabs,
    "form-simulacao": formSimulacao,
  },

  data() {
    return {
      text: {
        dados_simulação: "Dados da Simulação",
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
