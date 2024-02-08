<template>
  <div>
    <h4 class="report-ficha-cadastral__sub-title">Confira sua Ficha Cadastral antes de assiná-la</h4>

    <section class="report-ficha-cadastral">
      <Base-FieldSet
        class="report-ficha-cadastral__field"
        v-for="(field, index) in list"
        :key="index"
        :title="field.title || ''"
      >
        <Base-ReportListFichaCadastral :list="field.values" />
      </Base-FieldSet>
    </section>

    <h3 class="report-ficha-cadastral__title">Todas as informações do seu Contrato estão CORRETAS?</h3>

    <nav class="report-ficha-cadastral__buttons">
      <Base-Button
        class="report-ficha-cadastral__button report-ficha-cadastral__button-not"
       @click="$emit('onBack')"
      >Não, editar</Base-Button>
      <Base-Button
        class="report-ficha-cadastral__button report-ficha-cadastral__button-yes"
        @click="$emit('onNext')"
      >Sim, continuar</Base-Button>
    </nav>
  </div>
</template>



<script>
import { createNamespacedHelpers } from 'vuex';

const blocksMapped = new Map();

blocksMapped.set("registerDataPf", "Dados Cadastrais")
blocksMapped.set("registerDataPj", "Dados Cadastrais")
blocksMapped.set("spouse", "Cônjuge/ Companheiro (a)")
blocksMapped.set("personalAddress", "Residência")
blocksMapped.set("dataProfessional", "Dados Profissionais")
blocksMapped.set("bankReferences", "Referências Bancárias")
blocksMapped.set("dataPatrimony", "Dados Patrimoniais")
blocksMapped.set("pep", "Declaração Obrigatória Pessoa Exposta Politicamente")
blocksMapped.set("shareholder", "Acionistas (Sócios, Administradores ou Procuradores)")
blocksMapped.set("corporatePartnerShareHolder", "Participação em Outras Empresas")
blocksMapped.set("dataPatrimony", "Dados Patrimoniais")
blocksMapped.set("bankReferences", "Referências Bancárias")
blocksMapped.set("revenues", "Faturamento (Últimos 02 anos)")
blocksMapped.set("vehicleFinancing", "Financiamento de Veículos") 
blocksMapped.set("shareholders", "Acionistas")

const {
  mapActions: loanActions,
} = createNamespacedHelpers("loan/simulation");

const {
  mapState: loanState,
} = createNamespacedHelpers("loan");
export default {
  data() {
    return {
      item: [],
    }
  },
  methods: {
    ...loanActions(['getResumeFichaCadastral']),
    tratament(value) {
      let li;

      if(Array.isArray(value)) {        
        value.forEach(el => {
          Object.values(el);
        })
        
      
      }

      return value;
    },
  },
  computed: {
    ...loanState(['simulation']),
    fieldSets() {
      return this.simulation.getResumeFichaCadastral
    },
    list() {
      if (this.fieldSets && Array.isArray(this.fieldSets)) {
        return this.fieldSets.map(block => ({
          title: blocksMapped.get(block.name),
          values: Object.entries(block.model)
        }))
        .filter( item => item.values.length > 0)
      }
      else {
        return []
      }
    },
  },
  async mounted() {
    await this.getResumeFichaCadastral();
  }
}

</script>

<style lang="less" scoped>
@import "./style.less";
</style>
