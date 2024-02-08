<template>
      <Base-Modal v-if="active" class="formalizacao">
        <template #header>
          <img src="~/assets/img/logo-aperto-de-maos.png" alt="" />
        </template>
        <template #body>
          <h3>Financiamento concluído!</h3>
          <p>Parabéns! Transação efetuada com sucesso.</p>
          <p>Agora, formalize este financiamento.</p>
        </template>
        <template #footer>
          <Base-Button
            class="btn-modal-formalizacao"
            aria-label="Close modal"
            @click="$emit('formalization')"
          >
            FORMALIZAÇÃO
          </Base-Button>
        </template>
      </Base-Modal>
</template>

<script>
export default {
  props: {
    active: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
};
</script>

<style lang="less">
@import "~assets/vars.less";
@import "vue2-dropzone/dist/vue2Dropzone.min.css";
.formalizacao {
  width: 60%;
  h3 {
    font-family: 'newjunebold';
    font-size: 20px;
    color: @color1;
    font-weight: bold;
    line-height: 40px;
  }
  p {
    font-family: 'newjuneregular';
    font-size: 16px;
    color: @color1;
    line-height: 28px;
    margin: 0;
    text-align: left;
  }
  .btn-modal-formalizacao {
    font-family: 'newjunebold';
    font-size: 14px;
    width: auto;
    background: @color1;
    color: @color7;
    margin-top: 40px;
    padding: 0 50px;
    text-transform: uppercase;
  }
  .btn-modal-fechar {
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
