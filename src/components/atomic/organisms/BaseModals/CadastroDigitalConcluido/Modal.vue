<template>
  <Base-Modal center v-if="active" class="cadastro-digital">
    <template #header>
      <img src="~/assets/img/loading.gif" alt="" />
    </template>
    <template #body>
      <h3>Cadastro digital concluído.</h3>
      <p>Próximo passo: Escolha o veículo a ser financiado.</p>
    </template>
    <template #footer>
      <Base-Button
        class="btn-modal-continuar"
        aria-label="Botão Continuar"
        @click="$emit('continue')"
      >
        CONTINUAR
      </Base-Button>
    </template>
  </Base-Modal>
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
}
</style>
