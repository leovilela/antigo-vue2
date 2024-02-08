<template>
  <div id="moduloModal" v-if="modal == true">

    <div class="modal" v-if="($mq === 'laptop' || $mq === 'desktop' || $mq === 'bigScreen')">
      <!-- <p>{{ api }}</p> -->
      <!-- <p>{{ modalContent}}</p> -->
      <!-- <p>{{modal}}</p> -->

      <div class="bgModal" v-on="(api != 'transacaostatus' && api != 'transacaoresposta' && api != 'emprestimostatus' && api != 'emprestimoresposta') ? { click: () => $nuxt.$emit('toggleModal', null) } : {}"></div>

      <div class="modalPrincipal container-fluid" :class="api">
        <div v-if="code !== 403"><button v-if="(api != 'transacaostatus' && api != 'transacaoresposta' && api != 'emprestimostatus' && api != 'emprestimoresposta')" v-on:click.stop="$nuxt.$emit('toggleModal', null)" class="fechar">x</button></div>
        <div class="conteudoModal row">
          <div class="col-xs-12">
            <component-modal-template-01 v-if="api === 'historicoTransacoes'" :transactionObj="modalContent"></component-modal-template-01>
            <component-modal-template-03 v-if="api === 'conciliacao'" :contentModalConciliacao="modalContent"></component-modal-template-03>
            <component-modal-template-04 :contentRecibo="modalContent" v-if="api === 'recibo'"></component-modal-template-04>
            <component-modal-template-05 v-if="api === 'criarUsuario'"></component-modal-template-05>
            <component-modal-template-06 v-if="api === 'editarUsuario'" :usuario="modalContent"></component-modal-template-06>
            <modal-fale-comigo v-if="api === 'faleComigo'"></modal-fale-comigo>
            <modal-transacao-status v-if="api === 'transacaostatus'" :transactionObj="modalContent"></modal-transacao-status>
            <modal-transacao-resposta v-if="api === 'transacaoresposta'" :transactionObj="modalContent"></modal-transacao-resposta>
            <modal-erro v-if="api === 'erro'" :transactionObj="modalContent"></modal-erro>
            <modal-sucesso v-if="api === 'sucesso'" :transactionObj="modalContent"></modal-sucesso>
            <modal-email-simulacao v-if="api === 'send'" :transactionObj="modalContent"></modal-email-simulacao>
            <modal-salvar-emprestimo v-if="api === 'salvarEmprestimo'" :emprestimo="modalContent"></modal-salvar-emprestimo>
            <modal-editar-endereco v-if="api === 'editarEndereco'" :endereco="modalContent"></modal-editar-endereco>
            <modal-editar-endereco-email v-if="api === 'editarEnderecoEmail'" :emailPrincipal="email" :infoComplementarys="modalContent"></modal-editar-endereco-email>
            <modal-emprestimo-status v-if="api === 'emprestimostatus'" :transactionObj="modalContent"></modal-emprestimo-status>
            <modal-emprestimo-resposta v-if="api === 'emprestimoresposta'" :transactionObj="modalContent"></modal-emprestimo-resposta>
            <modal-emprestimo-erro v-if="api === 'emprestimoerro'" :transactionObj="modalContent"></modal-emprestimo-erro>
            <modal-emprestimo-erro-pj v-if="api === 'emprestimoerroPJ'" :transactionObj="modalContent"></modal-emprestimo-erro-pj>
            <modal-recibo-detran :contentRecibo="modalContent" v-if="api === 'reciboDetran'"></modal-recibo-detran>
          </div>

        </div>
      </div>

    </div>
    <transition name="left">
      <div v-if="($mq === 'mobile' || $mq === 'tablet')  && modal==true" id="paginaModal">
        <div>
          <div v-if="code !== 403"><button v-if="(api != 'transacaostatus' && api != 'transacaoresposta')" v-on:click="$nuxt.$emit('toggleModal', null)" class="fechar">X</button></div>
          <component-modal-template-01 v-if="api === 'historicoTransacoes'" :transactionObj="modalContent"></component-modal-template-01>
          <component-modal-template-03 v-if="api === 'conciliacao'" :contentModalConciliacao="modalContent"></component-modal-template-03>
          <component-modal-template-04 :contentRecibo="modalContent" v-if="api === 'recibo'"></component-modal-template-04>
          <component-modal-template-05 v-if="api === 'criarUsuario'"></component-modal-template-05>
          <component-modal-template-06 v-if="api === 'editarUsuario'" :usuario="modalContent"></component-modal-template-06>
          <modal-fale-comigo v-if="api === 'faleComigo'"></modal-fale-comigo>
          <modal-transacao-status v-if="api === 'transacaostatus'" :transactionObj="modalContent"></modal-transacao-status>
          <modal-transacao-resposta v-if="api === 'transacaoresposta'" :transactionObj="modalContent"></modal-transacao-resposta>
          <modal-erro v-if="api === 'erro'" :transactionObj="modalContent"></modal-erro>
          <modal-sucesso v-if="api === 'sucesso'" :transactionObj="modalContent"></modal-sucesso>
          <modal-email-simulacao v-if="api === 'send'" :transactionObj="modalContent"></modal-email-simulacao>
          <modal-salvar-emprestimo v-if="api === 'salvarEmprestimo'" :emprestimo="modalContent"></modal-salvar-emprestimo>
          <modal-emprestimo-status v-if="api === 'emprestimostatus'" :transactionObj="modalContent"></modal-emprestimo-status>
          <modal-emprestimo-resposta v-if="api === 'emprestimoresposta'" :transactionObj="modalContent"></modal-emprestimo-resposta>
          <modal-emprestimo-erro v-if="api === 'emprestimoerro'" :transactionObj="modalContent"></modal-emprestimo-erro>
          <modal-emprestimo-erro-pj v-if="api === 'emprestimoerroPJ'" :transactionObj="modalContent"></modal-emprestimo-erro-pj>
          <modal-recibo-detran :contentRecibo="modalContent" v-if="api === 'reciboDetran'"></modal-recibo-detran>
        </div>
      </div>
    </transition>

  </div>

</template>


<style lang="less" scoped>
  @import "../assets/vars.less";
  @import "../assets/variables.less";

  .left-enter-active,
  .left-leave-active {
    transition: all 0.3s;
  }

  .left-leave /* .fade-leave-active em versões anteriores a 2.1.8 */ {
    transform: translateX(0px);
  }

  .left-enter {
    transform: translateX(110vw);
  }

  #moduloModal {
    position: fixed;
    width: 100vw;
    height: 100vh;
    z-index: 999;
    top: 0;
    left: 0;
    padding: 50px;
    padding-top: 100px;

    .modal {
      width: 100%;
      height: 100%;
      .bgModal {
        position: absolute;
        width: 100vw;
        height: 100vh;
        background: #00000088;
        top: 0;
        left: 0;
        z-index: 800;
      }
      .modalPrincipal {
        background: @color2;
        // padding: 20px 70px 20px 20px;
        // padding-right: 80px;
        padding: 20px;
        position: relative;
        z-index: 900;
        min-width: 150px;
        width: 80vw;
        
        margin: auto;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        max-width: 50vw;
        // max-width: 430px;
        border-radius: 5px;
        // height: 100%;

        .conteudoModal {
          width: 100%;
          overflow-x: hidden;
          overflow-y: auto;
          padding: 10px;
          max-height: 60vh;
          margin-right: 10px;
        }

        &.recibo {
          height: 100%;
          .conteudoModal {
            height: 100%;
          }
        }

        &.erro {
          background:none;
          width: 450px;
          padding-right: unset;
        }

        &.emprestimoerro {
          background:none;
          width: 450px;
          padding-right: unset;
        }

        &.emprestimoerroPJ {
          background:none;
          width: 450px;
          padding-right: unset;
        }

        &.sucesso {
          background:none;
          width: 320px;
          padding-right: unset;
        }

        &.criarUsuario, &.editarUsuario, &.recibo, &.transacaostatus, &.faleComigo {
          padding: 20px 0;
        }
      }
      .modalPrincipal.editarEnderecoEmail{
        max-width: 450px;
      }
      .fechar {
        position: absolute;
        top: 0;
        right: 10px;
        padding: 0;
        background-color: transparent;
        color: #C8C8C8;
        width: 25px;
        height: 25px;
        border: 0;
        font-size: @ftBigTitSize;
        margin: 0;
        z-index: 1000;
        // transition: all 0.25s;
        font-family: cursive;
        font-weight: bold;

        // &:hover {
        //   filter: brightness(1.25);
        //   transform: rotateZ(90deg);
        //   transform-origin: 70% 50%;
        // }
      }
    }
    #paginaModal {
      position: absolute;
      top: 0px;
      left: 0px;
      background: @color2;
      width: 100vw;
      height: calc(100vh - 55px);
      z-index: 9;
    }
  }
</style>

<script>
import { EventBus } from '~/utils/eventBus.utils.js';
import modalLayout01 from "~/templates/modal-template-01.vue";
import modalLayout02 from "~/templates/modal-template-02.vue";
import modalLayout03 from "~/templates/modal-template-03.vue";
import modalLayout04 from "~/templates/modal-template-04.vue";
import modalLayout05 from "~/templates/modal-template-05.vue";
import modalLayout06 from "~/templates/modal-template-06.vue";
import modalFaleComigo from "~/templates/modal-fale-comigo.vue";
import modalTransacaoStatus from "~/templates/modal-transacao-status.vue";
import modalTransacaoResposta from "~/templates/modal-transacao-resposta.vue";
import modalErro from "~/templates/modal-erro.vue";
import modalSucesso from "~/templates/modal-ok.vue";
import modalEmailSimulacao from "~/templates/modal-email-simulacao.vue";
import modalSalvarEmprestimo from "~/templates/temp_modal-salvar-emprestimo.vue";
import modalEditarEndereco from "~/templates/modal-editar-endereco.vue";
import modalEditarEnderecoEmail from "~/templates/modal-editar-endereco-email.vue";
import modalEmprestimoStatus from "~/templates/modal-emprestimo-status.vue";
import modalEmprestimoResposta from "~/templates/modal-emprestimo-resposta.vue";
import modalEmprestimoErro from "~/templates/modal-emprestimo-erro.vue";
import modalEmprestimoErroPJ from "~/templates/modal-emprestimo-erro-pj.vue";
import modalReciboDetran from "~/templates/modal-template-detran.vue";

export default {
  data() {
    return {
      modal: false,
      api: null,
      code: null,
      modalContent: {},
      email: null,
      
    };
  },

  components: {
    "component-modal-template-01": modalLayout01,
    "component-modal-template-02": modalLayout02,
    "component-modal-template-03": modalLayout03,
    "component-modal-template-04": modalLayout04,
    "component-modal-template-05": modalLayout05,
    "component-modal-template-06": modalLayout06,
    modalFaleComigo,
    modalTransacaoStatus,
    modalTransacaoResposta,
    modalErro,
    modalSucesso,
    modalEmailSimulacao,
    modalSalvarEmprestimo,
    modalEditarEndereco,
    modalEditarEnderecoEmail,
    modalEmprestimoResposta,
    modalEmprestimoStatus,
    modalEmprestimoErro,
    "modal-emprestimo-erro-pj": modalEmprestimoErroPJ,
    modalReciboDetran,
  },
  mounted() {
    this.$nuxt.$on("toggleModal", (data) => {
      this.modal = !this.modal;

      if (data != null || data != undefined) {
        this.api = data.api;
        this.code = data.code;
        this.modalContent = data.modalContent;
        this.email = data.email;
        
        document.body.classList.add("activeModal");
      } else {
        EventBus.$emit('onModalClosed');
        document.body.classList.remove("activeModal");
      }
    });

    this.$nuxt.$on("openModal", (data) => {
      this.modal = true;


      this.api = data.api;
      this.code = data.code;
      this.modalContent = data.modalContent;


      document.body.classList.add("activeModal");
    });

    this.$nuxt.$on("closeModal", (data) => {

      this.modal = false;
      this.api = data.api;
      this.code = data.code;
      this.modalContent = data.modalContent;
      document.body.classList.remove("activeModal");
    });
  },
  beforeDestroy() {
    this.$nuxt.$off("toggleModal");
    this.$nuxt.$off("closeModal");
  },
};
</script>
