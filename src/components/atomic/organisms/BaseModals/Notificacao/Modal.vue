<template>
  <Base-Modal v-if="active" class="notificacao">
    <template #header>
      <img src="~/assets/img/logo-listo-smartphone.png" alt="" />
    </template>
    <template #body>
      <h3>Notificação</h3>
      <div class="documentos">
        <p>Falta pouco! Acabamos de solicitar ao cliente a assinatura de alguns documentos através do nosso aplicativo.</p>
      </div>
    </template>
    <template #footer>
      <Base-Button
        class="btn-modal-continuar"
        aria-label="Close modal"
        @click="$emit('close')"
      >
        FECHAR
      </Base-Button>
    </template>
  </Base-Modal>
</template>

<script>
export default {
  props: {
    active: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="less">
@import "~assets/vars.less";
  .notificacao {
  width: 60%;
  h3 {
    font-family: 'newjunebold';
    font-size: 20px;
    color: @color1;
    font-weight: bold;
    margin: 30px 0 20px 0;
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
}

</style>
