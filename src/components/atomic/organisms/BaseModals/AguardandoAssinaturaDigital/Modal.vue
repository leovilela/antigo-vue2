<template>
  <Base-Modal v-if="active" class="assinatura-digital">
    <template #header>
      <img src="~/assets/img/logo-listo-smartphone.png" alt="" height="100px" />
    </template>
    <template #body>
      <h3>Assinatura digital</h3>
      <div class="documentos">
        <p>Informe seu cliente que é necessário assinar digitalmente os seguintes documentos:</p>
        <p>- CCB (Cédula de Crédito Bancário);</p>
        <p>- CET (Custo Efetivo Total); e</p>
        <p>- Ficha Cadastral.</p>
        <p>Estes documentos podem ser acessados na página inicial do aplicativo.</p>
      </div>
      <div class="smartphone" v-show="isSmartphone">
        <img src="~/assets/img/modal-assinatura-digital-smartphone.png" alt="" height="527px" />
      </div>
    </template>
    <template #footer>
      <Base-Button
        class="btn-mostrar-exemplo"
        aria-label="Mostrar Exemplo"
        @click="mostrarExemplo()"
      >
        {{ buttonText }}
      </Base-Button>
      <Base-Button
        class="btn-continuar"
        aria-label="Continuar"
        @click="$emit('close')"
      >
        CONTINUAR
      </Base-Button>
    </template>
  </Base-Modal>
</template>

<script>
export default {
  data() {
    return {
      isSmartphone: false,
    };
  },
  props: {
    active: Boolean,
  },
  methods: {
    mostrarExemplo() {
      this.isSmartphone = !this.isSmartphone;
    },
  },
  computed: {
    buttonText() {
      return this.isSmartphone ? "ESCONDER EXEMPLO" : "MOSTRAR EXEMPLO";
    },
  },
};
</script>

<style lang="less">
@import "~assets/vars.less";
  .assinatura-digital {
  width: 70%;
  .modal {
    width: 70%;
    position: relative;
    overflow: visible;
  }
  h3 {
    font-family: 'newjunebold';
    font-size: 30px;
    color: @color1;
    margin: 30px 0 20px 0;
    text-align: center;
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
    list-style-type: none;
    padding: 0;
  }
  p {
    font-family: 'newjuneregular';
    font-size: 16px;
    color: @color1;
    text-align: left;
  }
  .documentos {
    text-align: left;
  }
  .smartphone {
    background: #fff;
    padding: 20px;
    position: absolute;
    top: -140px;
    right: -310px;
    z-index: 9999;
    @media screen and (min-width: 1920px){
      padding: 18.5px;
    }
  }
  .btn-continuar {
    font-family: 'newjunebold';
    font-size: 20px;
    width: auto;
    background: #000;
    color: #fff;
    margin-top: 40px;
    padding: 0 60px;
    text-transform: uppercase;
  }
  .btn-mostrar-exemplo {
    font-family: 'newjunebold';
    font-size: 20px;
    width: auto;
    background: #fff;
    color: #000;
    margin-top: 40px;
    padding: 0 20px;
    text-transform: uppercase;
    border: 1px solid #000;
  }
}

</style>
