<template>
<div id="tableEditarUsuarios">
  <table id="table-result">
    <thead>
      <th class="nome">{{ text.th_name }}</th>
      <th class="login">{{ text.th_login }}</th>
      <th class="status">{{ text.th_status }}</th>
      <!-- <th class="editar"></th> -->
    </thead>
    <tbody>
      <tr v-for="(usuario, index) in usuarios" :key="index" v-show="usuario.roleId != 2">
        <!-- <td>{{usuario}}</td> -->
        <td>{{usuario.fullNameUser}}</td>
        <td>{{usuario.userName}}</td>
        <td>
          <span v-if="usuario.isEnabled">Ativo</span>
          <span v-else>Bloqueado</span>
        </td>
        <!-- <td class="userEdit"><span class="glyphicon glyphicon-pencil"></span><a @click.prevent="toggleModal({api: 'editarUsuario', modalContent: usuario})">{{text.user_edit}}</a></td> -->
      </tr>
    </tbody>
  </table>

</div>
</template>

<style lang="less" scoped>
@import "~assets/vars.less";
@import "~assets/variables.less";

#tableEditarUsuarios {
  display: block;
  width: 100%;

  #table-result {
    width: 100%;
    thead th,
    tbody tr td {
      padding: 5px 10px;
      text-align: center;
    }

    thead {
      border-bottom: 1px solid @color10;
      border-top: 1px solid @color10;
    }

    tbody {
      tr {
        &:nth-child(odd) {
          background-color: @color18;
        }
      }
    }
  }

}
</style>

<script>
export default {
  data() {
    return {
      text: {
        th_name: "Nome",
        th_login: "Login",
        th_status: "Status",
        th_simulador: "Simulador",
        th_transacao: "Transação",
        th_conta: "Menu Conta",
        th_dadosCadatrais: "Dados Cadastrais",
        th_usuarios: "Usuários",
        th_agenda: "Agenda",
        th_antecipar: "Antecipar",
        th_extrato: "Extrato",
        th_conciliacao: "Conciliação",
        th_historico: "Histórico de transações",
        th_relatorios: "Relatórios de pagamento",
        user_edit: "Editar",
        user_active: "Ativo",
        user_inactive: "Inativo",
        user_blocked: "Bloqueado",
      },
    };
  },
  props: ["usuarios"],
  methods: {
    // abre modal de editar usuario
    toggleModal(data) {
      this.$nuxt.$emit("toggleModal", data);
    },
  },
};
</script>
