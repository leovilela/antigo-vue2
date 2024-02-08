<template>
  <div class="page-interno page-emprestimos">
    <layout v-if="controls.access">
      <menu-esquerdo slot="sidebar"></menu-esquerdo>
      <header-desktop slot="header"></header-desktop>
      <header-mobile slot="headerMobile"></header-mobile>
      <conteudo-interno slot="main">
        <conteudo-emprestimos slot="content"></conteudo-emprestimos>
      </conteudo-interno>
      <footer-interno :isSCD="true" slot="desktop-footer"></footer-interno>
      <modal slot="modal"></modal>
    </layout>
  </div>
</template>

<script>
import layout from "~/layouts/internal_nopanel.vue";
import menuEsquerdo from "~/components/InternalMenuEsquerdo.vue";
import headerDesktop from "~/components/header-interna-desktop.vue";
import headerMobile from "~/components/header-interna-mobile.vue";
import footerInterno from "~/components/InternalFooter.vue";
import conteudoInterno from "~/templates/listoInternalContent.vue";
import conteudoEmprestimos from "~/components/emprestimos/contentEmprestimos.vue";
import modal from "~/components/modal.vue";

// const jwt = require("jsonwebtoken");

export default {
  validate() {
    this.$router.push("/painel-do-cliente");
    return false;
  },
  components: {
    layout,
    menuEsquerdo,
    headerDesktop,
    headerMobile,
    footerInterno,
    conteudoInterno,
    conteudoEmprestimos,
    modal,
  },
  data() {
    return {
      controls: {
        access: true,
      },
    };
  },
  beforeMount() {
    return this.$axios.get(`${process.env.API_CREDIT}/OnlyReport`).then((response) => {
      this.$store.commit("setLoanOnlyReport", response.data);
      return this.$axios.get(`${process.env.API_CUSTOMER_DATA}/Form/Status/1`);
    })
      .then((response) => {
        if (response.status == 200) {
          this.$store.commit("setLoanFormCompleted", response.data.completed);
          this.$store.commit("setLoanFormSigned", response.data.signed);
          this.$store.commit("setLoanFormActive", response.data.active);
        }
        return this.$axios.get(`${process.env.API_CUSTOMER_DATA}/Form/Status/2`);
      })
      .then((response) => {
        const cadComplete = $nuxt.$store.state.emprestimos.completed;
        const cadAssign = $nuxt.$store.state.emprestimos.signed;
        const cadActive = $nuxt.$store.state.emprestimos.active;
        const ccbStatus = $nuxt.$store.state.emprestimos.ccbStatus;
        const onlyReport = $nuxt.$store.state.emprestimos.onlyReport;

        if (onlyReport) {
          this.$store.commit("setLoanCurrentTab", "relatorio");
        } else if (cadComplete && !cadAssign && !ccbStatus) {
          this.$store.commit("setLoanCurrentTab", "limites");
        } else if (cadComplete && cadAssign && !ccbStatus) {
          this.$store.commit("setLoanCurrentTab", "limites");
        } else if (ccbStatus) {
          this.$store.commit("setLoanCurrentTab", "transacao");
        } else {
          this.$store.commit("setLoanCurrentTab", "limites");
        }
        this.$store.commit("setLoanCCBStatus", response.data.active && response.data.completed && !response.data.signed);
      })
      .catch((err) => { console.log("Err:", err); return false; });

    // const getOnlyReport = new Promise((resolve, reject) => {
    //   this.$axios.get(`${globals.API_CREDIT}/OnlyReport`).then((response) => {
    //     this.$store.commit("setLoanOnlyReport", response.data);
    //     resolve(response);
    //   }).catch((error) => {
    //     reject(error);
    //   });
    // });

    // const getFormStatus = new Promise((resolve, reject) => {
    //   // 1 para Ficha Cadastral
    //   // 2 para CCB
    //   this.$axios.get(`${globals.API_CUSTOMER_DATA}/Form/Status/1`).then((response) => {
    //     if (response.status == 200) {
    //       this.$store.commit("setLoanFormCompleted", response.data.completed);
    //       this.$store.commit("setLoanFormSigned", response.data.signed);
    //       this.$store.commit("setLoanFormActive", response.data.active);
    //     }
    //     resolve(response);
    //   }).catch((error) => {
    //     console.log("err: ", error);
    //     reject(error);
    //   });
    // });

    // const getCCBStatus = new Promise((resolve, reject) => {
    //   this.$axios.get(`${globals.API_CUSTOMER_DATA}/Form/Status/2`).then((response) => {
    //     this.$store.commit("setLoanCCBStatus", response.data.active && response.data.completed && !response.data.signed);
    //     resolve(response);
    //   }).catch(error => reject(error));
    // });

    // return Promise.all([getOnlyReport, getFormStatus, getCCBStatus]).then(() => {
    //   const cadComplete = $nuxt.$store.state.emprestimos.completed;
    //   const cadAssign = $nuxt.$store.state.emprestimos.signed;
    //   const cadActive = $nuxt.$store.state.emprestimos.active;
    //   const ccbStatus = $nuxt.$store.state.emprestimos.ccbStatus;
    //   const onlyReport = $nuxt.$store.state.emprestimos.onlyReport;

    //   if (onlyReport) {
    //     this.$store.commit("setLoanCurrentTab", "relatorio");
    //   } else if (cadComplete && !cadAssign && !ccbStatus) {
    //     this.$store.commit("setLoanCurrentTab", "limites");
    //   } else if (cadComplete && cadAssign && !ccbStatus) {
    //     this.$store.commit("setLoanCurrentTab", "limites");
    //   } else if (ccbStatus) {
    //     this.$store.commit("setLoanCurrentTab", "transacao");
    //   } else {
    //     this.$store.commit("setLoanCurrentTab", "limites");
    //   }
    // }).catch(console.log);
  },
};
</script>

<style lang="less">

</style>
