<template>
  <Base-Modal center v-if="active" class="tc3" ref="tc3">
      <template #header>
        <img src="~/assets/img/logo-lupa-lista.png" alt="" />
      </template>
      <template #body>
        <h3>TC3</h3>
        <h4>Tarifa de Concessão de Crédito e Cadastro</h4>
        <p>A Tarifa de Concessão de Crédito e Cadastro (TC3) é cobrada de acordo com leis reguladas por órgãos públicos - para início de relacionamento do cliente com um banco, financeira ou SCD -, no momento em que são realizadas pesquisas em serviços de proteção ao crédito, base e tratamento de dados e demais informações necessárias para análise de crédito e manutenção de cadastro. Ela tem valor único  de R$ 1.100,00.</p>
        <p>Ao optar pela isenção da Tarifa de Concessão de Crédito e Cadastro você deverá enviar à Listo Sociedade de Crédito Direto (Listo SCD) os documentos abaixo relacionados, que serão analisados pela área de Concessão de Crédito:</p>
        <ul>
          <li>Documento de Identificação com foto;</li>
          <li>CPF;</li>
          <li>Comprovante de residência;</li>
          <li>Comprovante de renda ou de patrimônio, sendo eles cópia do holerite ou da declaração anual de imposto de renda;</li>
          <li>Pesquisa em bancos de dados e de proteção ao crédito. As pesquisas podem ser executadas na SERASA Experian ou na Boavista ou no SPC Brasil, à escolha do consumidor;</li>
          <li>Certidões de cartórios de protesto do local do domicílio do consumidor;</li>
          <li>Certidão de regularidade do CPF do consumidor expedida pela Receita Federal do Brasil.</li>
        </ul>
        <p>A isenção só ocorrerá após o envio e aprovação de todos os documentos através do e-mail <a href="mailto:tc3@soulisto.com.br">tc3@soulisto.com.br</a>. Todos os documentos devem ser apresentados dentro do seu devido prazo de validade (até 07 dias corridos).</p>
        <p>Para mais informações favor entrar em contato com a Listo SCD pelo telefone 0800-942-1835.</p>
      </template>
      <template #footer>
        <div class="row" :class="{hideButtons: !showButtons}">
          <div class="col-xs-6">
            <Base-Button
              class="btn-modal-imprimir"
              @click="printTC3"
            >
              IMPRIMIR
            </Base-Button>
          </div>
          <div class="col-xs-6">
          <Base-Button
            class="btn-modal-fechar"
            aria-label="Close modal"
            @click="$emit('close')"
          >
             FECHAR
          </Base-Button>
        </div>
      </div>
    </template>
  </Base-Modal>
</template>

<script>
export default {
  props: ["active"],
  data() {
    return {
      showButtons: true,
    };
  },
  methods: {
    printTC3() {
      this.showButtons = false;
      const cssComponent = getComputedStyle(this.$refs.tc3.$el);

      this.$services.tools.printComponent(this.$refs.tc3.$el, cssComponent.cssText);
      // this.showButtons = true;
    },
  },
};
</script>

<style lang="less">
@import "~assets/vars.less";
  .tc3 {
    .modal {
      width: 100%;
    }
    .hideButtons {
      display: none;
    }
  h3 {
    font-family: 'newjunebold';
    font-size: 20px;
    color: @color1;
    font-weight: bold;
    line-height: 18px;
    margin-bottom: 12px;
  }
  h4 {
    font-family: 'newjuneregular';
    font-size: 16px;
    color: @color1;
    font-weight: bold;
    margin: 0;
    line-height: 14px;
  }
  ul{
    list-style-type: disc;
    li{
      font-family: 'newjuneregular';
      font-size: 12px;
      color: @color1;
      text-align: left;
    }
  }
  p {
    font-family: 'newjuneregular';
    font-size: 14px;
    color: @color1;
    text-align: left;
  }
  .btn-modal-imprimir {
    font-family: 'newjunebold';
    font-size: 14px;
    width: auto;
    background: @color1;
    color: @color7;
    padding: 0 50px;
    text-transform: uppercase;
  }
  .btn-modal-fechar {
    font-family: 'newjunebold';
    font-size: 14px;
    width: auto;
    background: @color1;
    color: @color7;
    padding: 0 50px;
    text-transform: uppercase;
  }
}

</style>
