<template>
  <div id="conteudo-relatorio-emprestimos" class="page-emprestimos">
    <form-emprestimos></form-emprestimos>
    <results-table></results-table>
  </div>
</template>

<script>
import formEmprestimos from "~/components/emprestimos/relatorio/formRelatorioEmprestimo.vue";
import resultsTable from "~/components/searchResultsTable.vue";

export default {
  components: {
    formEmprestimos,
    resultsTable,
  },
  data() {
    return {
    };
  },
};
</script>

<style lang='less'>
</style>
