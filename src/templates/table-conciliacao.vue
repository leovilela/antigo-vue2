<template>
<div id="tableConciliacao">
  <table>
    <thead>
      <th>{{ content.text.th_extrato }}</th>
      <th>{{ content.text.th_transacoes }}</th>
    </thead>
    <tbody>
      <item-tabela v-for="(con, index) in conciliacoes" :conciliacao="con" :key="index" :index="index"></item-tabela>
    </tbody>
  </table>
</div>

</template>

<style lang="less" scoped>
  @import "~assets/vars.less";
  @import "~assets/variables.less";

#tableConciliacao {
  table {
    width: 100%;

    & > thead {
      border-bottom: 1px solid @color10;
      border-top: 1px solid @color10;
      th {
        width: 50%;
        padding: 10px;

        &:first-child{
          width: 25%;
        }

        &:last-child {
          width: 75%;
        }
      }
    }
  }
}

</style>

<script>
import itemConciliacao from "~/components/itemTabelaConciliacao.vue";

export default {
  data() {
    return {
      content: {
        text: {
          th_extrato: "Extrato",
          th_transacoes: "Transações",
        },
      },
    };
  },
  props: ["conciliacoes"],
  components: {
    "item-tabela": itemConciliacao,
  },

};
</script>
