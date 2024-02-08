<template>
  <div>
    <ul v-for="item in items" v-bind:key="item.id">
      <li>{{ item.ccb }}</li>
      <li>{{ item.loja }}</li>
      <li>{{ item.vendedor }}</li>
      <li>{{ item.valor }}</li>
      <li>{{ item.dataInicial }}</li>
      <li>{{ item.dataFinal }}</li>
      <li>{{ item.status }}</li>
      <li>{{ item.acoes }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          ccb: "3211827",
          loja: "Nome da Loja Ltda",
          vendedor: "José Maria da Silva",
          valor: "52.980,00",
          dataInicial: "01.08.2019",
          dataFinal: "15.08.2019",
          status: "Finalizado",
          acoes: "Ações",
        },
        {
          ccb: "3211827",
          loja: "Nome da Loja Parafuzeta Ltda",
          vendedor: "José Maria da Silva Nostragildo Pereira",
          valor: "52.980,00",
          dataInicial: "01.08.2019",
          dataFinal: "15.08.2019",
          status: "Finalizado",
          acoes: "Ações",
        },
      ],
    };
  },
};
</script>

<style scoped>
  ul {
    width: 100vw;
    list-style-type: none;
    overflow-wrap: break-word;
    padding: 0;
  }
  li {
    display: inline-block;
    margin-right: 20px;
  }
</style>
