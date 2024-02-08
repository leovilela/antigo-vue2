<template>
    <div id="modalConciliacao">
      <table id="tabelaModalConciliacao">
        <tbody>
          <item-conciliacao :conciliacao="contentModalConciliacao" :key="contentModalConciliacao.id"></item-conciliacao>
        </tbody>
      </table>
    </div>
</template>

<script>
import conciliacao from "~/components/itemTabelaConciliacao";

export default {
  components: {
    "item-conciliacao": conciliacao,
  },
  props: ["contentModalConciliacao"],
};
</script>

<style lang="less" scoped>
#modalConciliacao {
  height: 100%;
  #tabelaModalConciliacao {
    height: 100%;
    margin: auto;
    display: block;
    width: fit-content;
    max-width: 100%;
    overflow-x: auto;
  }
}
</style>
