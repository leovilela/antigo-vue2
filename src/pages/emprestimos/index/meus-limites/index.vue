<template>
  <div class="meus-limites">
    <div class="meus-limites__content">
      <p>{{ $t("pages.emprestimos.meus-limites.text.p1") }}</p>
      <p>{{ $t("pages.emprestimos.meus-limites.text.p2") }}</p>
      <p>{{ $t("pages.emprestimos.meus-limites.text.p3") }}</p>
      <p>{{ $t("pages.emprestimos.meus-limites.text.p4") }}</p>
      <p>{{ $t("pages.emprestimos.meus-limites.text.p5") }}</p>
    </div>
    <Base-Button
      class="meus-limites__button"
      v-if="!status.signed"
      @click.prevent="onGoToRegistrationForm"
      >{{
        $t("pages.emprestimos.meus-limites.updateRegistration")
      }}</Base-Button
    >
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'

const {mapState} = createNamespacedHelpers('loan')

export default {
  layout: "shell",
  computed: {
    ...mapState(['status'])
  },
  methods: {
    onGoToRegistrationForm() {
      this.$router.push("/emprestimos/ficha-cadastral");
    }
  }
};
</script>

<style scoped lang="less">
@import "./style.less";
</style>
