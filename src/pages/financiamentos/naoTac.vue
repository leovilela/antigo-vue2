<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-sm-1 col-md-1"></div>
      <div class="col-sm-10 col-md-10">
        <h3 class="text-center">Termo para Isenção de TCCC - Documentos obrigatórios</h3>
        <p>A Tarifa de Concessão de Crédito e Cadastro (TCCC) é uma tarifa cobrada, de acordo com leis reguladas por órgãos públicos, para início de relacionamento do cliente com um Banco, Financeira ou SCD, momento em que são realizadas pesquisas em serviços de proteção ao crédito, base e tratamento de dados e informações necessárias para análise de crédito.</p>
        <p>Ao optar pela isenção da Tarifa de Concessão de Crédito e Cadastro, você deverá apresentar ao <strong>Listo Sociedade de Crédito Direto</strong>, no momento da formalização do financiamento, os seguintes documentos: </p>
        <ul>
          <li>Documento de Identificação com foto;</li>
          <li>CPF;</li>
          <li>Comprovante de residência; </li>
          <li>Comprovante de renda ou de patrimônio, sendo eles cópia do holerite ou da declaração anual de imposto de renda;</li>
          <li>Pesquisa em bancos de dados e de proteção ao crédito. As pesquisas podem ser executadas na SERASA Experian ou na Boavista ou no SPC Brasil, à escolha do consumidor;</li>
          <li>Certidões de cartórios de protesto do local do domicílio do consumidor;</li>
          <li>Certidão de regularidade do CPF do consumidor expedida pela Receita Federal do Brasil.</li>
        </ul>
        <p>A isenção só ocorrerá após a apresentação de todos os documentos ao Estabelecimento Comercial cadastrado junto à <strong>Listo Sociedade de Crédito Direto</strong>, e estes devem ser apresentados no seu devido prazo de validade (até 30 dias antecedentes a efetivação da proposta).</p>
        <p>Maiores informações favor entrar em contato com a <strong>Listo SCD</strong> pelo telefone <strong>0800-942-1835</strong>.</p>
      </div>
      <div class="col-sm-1 col-md-1"></div>
    </div>
    <div class="row">
      <div class="col-sm-5 col-md-5"></div>
      <div class="col-sm-2 col-md-2">
        <button @click="$router.go(-1)">Voltar</button>
      </div>
      <div class="col-sm-5 col-md-5"></div>
    </div>
  </div>
</template>

<script>
/* eslint-disable func-names */
/* eslint-disable no-debugger */
const myExport = {
  data() {
    return {
      text: {
        alertCobrancaTxt: "A Listo SCD não exige ou solicita de seus clientes nenhum tipo de depósito antecipado, principalmente em conta de terceiros, para aprovação de empréstimos.",
      },
    };
  },
};

export default myExport;

</script>

<style lang="less" scoped>
  button {
    margin: 10%;
  }
</style>
