<template>
  <div id="modalEditarUsuario" class="container-fluid">
    <!-- <p>{{usuario}}</p> -->
    <h2 class="modalTitle">{{text.modal_title}}</h2>
    <form class="row" name="editUser">
      <div class="col-xs-12">
        <label for="name">{{text.user.name}}</label>
        <input type="text" id="name" v-model="usuario.nome">
      </div>
      <div class="col-xs-12">
        <label for="document">{{text.user.document}}</label>
        <input type="text" id="document" v-model="usuario.documento" v-mask="'###.###.###-##'">
      </div>
      <div class="col-xs-12">
        <label for="email">{{text.user.email}}</label>
        <input type="email" id="email" v-model="usuario.email">
      </div>
      <div class="col-xs-12" v-show="usuario.admin == false">
        <fieldset>
          <legend>{{ text.form_permissions }}</legend>
          <ul class="permissions">
            <li>
              <label for="simulador"><input class="permissionInput" v-model="usuario.permissions.simulador" type="checkbox" id="simulador">{{text.permissions.simulador}}</label>
              <ul>
                <li>
                  <label for="transacao"><input class="permissionInput" v-model="usuario.permissions.transacao" type="checkbox" id="transacao">{{text.permissions.transacao}}</label>
                </li>
              </ul>
            </li>
            <li>
              <label for="conta"><input class="permissionInput" v-model="usuario.permissions.conta" type="checkbox" id="conta">{{text.permissions.conta}}</label>
              <ul>
                <li>
                  <label for="dadosCadastrais"><input class="permissionInput" v-model="usuario.permissions.dadosCadastrais" type="checkbox" id="dadosCadastrais">{{text.permissions.dadosCadastrais}}</label>
                </li>
                <li>
                  <label for="usuarios"><input class="permissionInput" v-model="usuario.permissions.usuarios" type="checkbox" id="usuarios">{{text.permissions.usuarios}}</label>
                </li>
                <li>
                  <label for="agenda"><input class="permissionInput" v-model="usuario.permissions.agenda" type="checkbox" id="agenda">{{text.permissions.agenda}}</label>
                  <ul>
                    <li>
                      <label for="antecipar"><input class="permissionInput" v-model="usuario.permissions.antecipar" type="checkbox" id="antecipar">{{text.permissions.antecipar}}</label>
                    </li>
                  </ul>
                </li>
                <li>
                  <label for="extrato"><input class="permissionInput" v-model="usuario.permissions.extrato" type="checkbox" id="extrato">{{text.permissions.extrato}}</label>
                </li>
                <li>
                  <label for="conciliacao"><input class="permissionInput" v-model="usuario.permissions.conciliacao" type="checkbox" id="conciliacao">{{text.permissions.conciliacao}}</label>
                </li>
                <li>
                  <label for="historico"><input class="permissionInput" v-model="usuario.permissions.historico" type="checkbox" id="historico">{{text.permissions.historico}}</label>
                </li>
                <li>
                  <label for="relatorios"><input class="permissionInput" v-model="usuario.permissions.relatorios" type="checkbox" id="relatorios">{{text.permissions.relatorios}}</label>
                </li>
              </ul>
            </li>
          </ul>
        </fieldset>
      </div>

    </form>
  </div>
</template>

<style lang="less" scoped>
  @import "~assets/vars.less";
  @import "~assets/variables.less";

  #modalEditarUsuario {
    user-select: none;
    .modalTitle {
      border-bottom: 1px solid @color9;
      font-family: @mainFontBold;
      font-size: @ftSizeExtraLarge;
    }
    ul {
      list-style-type: none;

      &.permissions {
        padding: 0;
        margin: 0;
      }

      input {
        &[type="checkbox"] {
          margin-right: 10px;
        }
      }
    }
  }
</style>

<script>
import { mask } from "vue-the-mask";

export default {
  data() {
    return {
      text: {
        modal_title: "Editar usuário",
        form_permissions: "Permissões",
        user: {
          name: "Nome",
          document: "CPF",
          email: "E-mail",
        },
        permissions: {
          simulador: "Simulador",
          transacao: "Transação",
          conta: "Menu Conta",
          dadosCadastrais: "Dados cadastrais",
          usuarios: "Usuários",
          agenda: "Agenda",
          antecipar: "Antecipar",
          extrato: "Extrato",
          conciliacao: "Conciliação",
          historico: "Histórico de transações",
          relatorios: "Relatórios de pagamento",
        },
      },
    };
  },
  props: ["usuario"],
  directives: {
    mask,
  },
};
</script>
