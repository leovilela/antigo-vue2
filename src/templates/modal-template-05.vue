<template>
  <div id="modalCriarUsuario" class="container-fluid">
    <!-- <p>User info: {{ $v.userInfo }}</p> -->
    <h2 class="modalTitle">{{text.modal_title}}</h2>
    <form class="row" name="createUser">
      <div class="col-xs-11 col-sm-6">
        <div class="col-xs-12" :class="{'form-invalid': $v.userInfo.nome.$invalid}">
          <label for="formName">{{ text.form_name}}</label>
          <input type="text" id="formName" v-model.trim="$v.userInfo.nome.$model">
        </div>
        <div class="col-xs-12" :class="{'form-invalid': $v.userInfo.documento.$invalid}">
          <label for="formDocument">{{ text.form_document}}</label>
          <the-mask type="text" id="formDocument" v-model.trim="$v.userInfo.documento.$model" :mask="'###.###.###-##'"></the-mask>
        </div>
        <div class="col-xs-12" :class="{'form-invalid': $v.userInfo.email.$invalid}">
          <label for="formEmail">{{ text.form_email}}</label>
          <input type="email" id="formEmail" v-model.trim="$v.userInfo.email.$model">
        </div>
        <div class="col-xs-12" :class="{'form-invalid': $v.userInfo.login.$invalid}">
          <label for="formLogin">{{ text.form_login}}</label>
          <input type="text" id="formLogin" v-model.trim="$v.userInfo.login.$model">
        </div>
        <div class="col-xs-12" :class="{'form-invalid': $v.userInfo.password.$invalid}">
          <label for="formPassword">{{ text.form_password}}</label>
          <input type="password" id="formPassword" v-model.trim="$v.userInfo.password.$model">
        </div>
        <div class="col-xs-12" :class="{'form-invalid': $v.userInfo.passwordRepeat.$invalid}">
          <label for="formConfirmPassword">{{ text.form_confirmPassword}}</label>
          <input type="password" id="formConfirmPassword" v-model.trim="$v.userInfo.passwordRepeat.$model">
        </div>
      </div>
      <div class="col-xs-11 col-sm-6">
        <fieldset>
          <legend>{{ text.form_permissions }}</legend>
          <ul class="permissions">
            <li>
              <label for="simulador"><input class="permissionInput" v-model="userInfo.permissions.simulador" type="checkbox" id="simulador">{{text.permissions.simulador}}</label>
              <ul>
                <li>
                  <label for="transacao"><input class="permissionInput" v-model="userInfo.permissions.transacao" type="checkbox" id="transacao">{{text.permissions.transacao}}</label>
                </li>
              </ul>
            </li>
            <li>
              <label for="conta"><input class="permissionInput" v-model="userInfo.permissions.conta" type="checkbox" id="conta">{{text.permissions.conta}}</label>
              <ul>
                <li>
                  <label for="dadosCadastrais"><input class="permissionInput" v-model="userInfo.permissions.dadosCadastrais" type="checkbox" id="dadosCadastrais">{{text.permissions.dadosCadastrais}}</label>
                </li>
                <li>
                  <label for="usuarios"><input class="permissionInput" v-model="userInfo.permissions.usuarios" type="checkbox" id="usuarios">{{text.permissions.usuarios}}</label>
                </li>
                <!-- <li>
                  <label for="agenda"><input class="permissionInput" v-model="userInfo.permissions.agenda" type="checkbox" id="agenda">{{text.permissions.agenda}}</label>
                  <ul>
                    <li>
                      <label for="antecipar"><input class="permissionInput" v-model="userInfo.permissions.antecipar" type="checkbox" id="antecipar">{{text.permissions.antecipar}}</label>
                    </li>
                  </ul>
                </li> -->
                <li>
                  <label for="extrato"><input class="permissionInput" v-model="userInfo.permissions.extrato" type="checkbox" id="extrato">{{text.permissions.extrato}}</label>
                </li>
                <li>
                  <label for="conciliacao"><input class="permissionInput" v-model="userInfo.permissions.conciliacao" type="checkbox" id="conciliacao">{{text.permissions.conciliacao}}</label>
                </li>
                <li>
                  <label for="pagamentos"><input class="permissionInput" v-model="userInfo.permissions.pagamentos" type="checkbox" id="pagamentos">{{text.permissions.pagamentos}}</label>
                </li>
                <li>
                  <label for="historico"><input class="permissionInput" v-model="userInfo.permissions.historico" type="checkbox" id="historico">{{text.permissions.historico}}</label>
                </li>
                <li>
                  <label for="relatorios"><input class="permissionInput" v-model="userInfo.permissions.relatorios" type="checkbox" id="relatorios">{{text.permissions.relatorios}}</label>
                </li>
              </ul>
            </li>
          </ul>
        </fieldset>
      </div>
      <div class="col-xs-12">
        <button @click.prevent="createUser(userInfo)" class="pull-right btnSave" :disabled="$v.userInfo.$invalid">{{text.modal_save}}</button>
      </div>
    </form>
  </div>
</template>

<style lang="less" scoped>
@import "~assets/vars.less";
@import "~assets/variables.less";

#modalCriarUsuario {
  label {
    user-select: none;
  }
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
  .btnSave {
    border: 1px solid @color5;
    background-color: @color5;
    border-radius: 4px;
    font-size: @ftSizeNormal;
    font-family: @mainFont;
    padding: 10px 20px;
    color: @color2;
  }
}
</style>

<script>
import { TheMask } from "vue-the-mask";
import {
  required,
  minLength,
  helpers,
  email,
  sameAs,
} from "vuelidate/lib/validators";

// const validatePermissions = (value) => {
//   let hasTrue = false;

//   Object.keys(value).map((p) => {
//     if (value[p]) hasTrue = true;
//   });
// };

export default {
  data() {
    return {
      text: {
        modal_title: "Criar usuário",
        modal_save: "Salvar",
        form_name: "Nome",
        form_document: "CPF",
        form_email: "E-mail",
        form_login: "Login",
        form_password: "Senha",
        form_confirmPassword: "Repita a nova senha",
        form_permissions: "Permissões",
        permissions: {
          simulador: "Painel do Cliente",
          transacao: "Transação",
          conta: "Menu Conta",
          dadosCadastrais: "Meus dados cadastrais",
          usuarios: "Usuários",
          agenda: "Agenda",
          antecipar: "Antecipar",
          extrato: "Extrato",
          conciliacao: "Conciliação",
          pagamentos: "Pagamentos",
          historico: "Histórico de transações",
          relatorios: "Relatórios de pagamento",
        },
      },
      userInfo: {
        nome: null,
        login: null,
        documento: null,
        email: null,
        status: 0,
        admin: 0,
        password: null,
        passwordRepeat: null,
        permissions: {
          simulador: true,
          transacao: true,
          conta: true,
          dadosCadastrais: true,
          usuarios: true,
          // agenda: true,
          // antecipar: true,
          extrato: true,
          conciliacao: true,
          historico: true,
          relatorios: true,
          pagamentos: true,
        },
      },
    };
  },
  methods: {
    // selecionar checkboxes filhas
    selectChildCheckboxes(event) {
      const inputs = event.target.parentElement.querySelectorAll(
        ".permissionInput",
      );
      // console.log(inputs);

      for (const i in inputs) {
        if (inputs[i].id != undefined) {
          inputs[i].checked = !inputs[i].checked;
        }
      }
    },

    // atualizar permissoes
    // updatePermissions() {
    //   console.log("change");
    // },

    // registra usuario
    createUser() {
      // console.log('Criou usuario ', this.userInfo);
      if (this.userInfo.login != "") {
        this.$nuxt.$emit("createUser", this.userInfo);
      }
      this.$nuxt.$emit("toggleModal", null);
    },
  },
  components: {
    TheMask,
  },
  validations: {
    userInfo: {
      nome: {
        required,
      },
      documento: {
        required,
        // cpf,
        minLength: minLength(11),
      },
      email: {
        required,
        email,
      },
      login: {
        required,
      },
      password: {
        required,
        // password,
        forcaSenha(value) {
          if (value == "" || value == null || value == undefined) return true;

          return new Promise((resolve, reject) => {
            resolve(
              $nuxt.$axios
                .post(process.env.API_PASSWORDSTRONG, { password: value }, { progress: false })
                .then(response => (response.data.score > 2 ? true : false)).catch(err => console.log("Err:", err)),
            );
          });
        },
      },
      passwordRepeat: {
        required,
        sameAsPassword: sameAs("password"),
      },
      permissions: {
        validatePermissions(value) {
          if (value == "" || value == null || value == undefined) return true;

          return new Promise((resolve) => {
            resolve(Object.keys(value).some(k => (value[k] == true ? true : false)));
          });
        },
      },
    },
  },
};
</script>
