<template>
<transition name="fade" >
  <Base-Modal center class="cadastro-digital" v-if="active">
    <template #header>
      <img src="~/assets/img/logo-listo.png" alt="" />
    </template>
    <template #body>
      <h3>Aguardando cadastro digital</h3>
      <p>Informe ao cliente que é necessário se cadastrar no aplicativo Listo, enviado por SMS para o número de celular informado por ele.</p>
      <p>A partir destas informações será possível oferecer melhores condições de financiamento.</p>
    </template>
    <template #footer>
      <Base-Button
        class="btn-modal-cancelar"
        aria-label="Fechar"
        @click="$emit('cancel')"
      >
        FECHAR
      </Base-Button>
    </template>
  </Base-Modal>
</transition>
</template>

<script>
export default {

  props: ["active"],

};
</script>

<style lang="less" scoped>
@import "~assets/vars.less";
  .cadastro-digital {
  h3 {
    font-family: 'newjunebold';
    font-size: 24px;
    color: @color1;
    font-weight: bold;
    margin-bottom: 12px;
  }
  p {
    font-family: 'newjuneregular';
    font-size: 14px;
    color: @color1;
    text-align: left;
  }
  .btn-modal-continuar {
    font-family: 'newjunebold';
    font-size: 14px;
    color: @color7;
    text-transform: uppercase;
  }
  .btn-modal-cancelar {
    font-family: 'newjunebold';
    font-size: 14px;
    width: auto;
    background: @color1;
    color: @color7;
    margin-top: 40px;
    padding: 0 50px;
    text-transform: uppercase;
  }
}
</style>
