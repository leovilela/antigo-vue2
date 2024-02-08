<template>
  <div id="formAlterarSenha" class="container-fluid">
    <form id="form-AlterarSenha" class="row" v-on:submit.prevent>

      <div class="row">


        <div class="col-xs-12 col-lg-6">
          <div class="form-group">
             <div class="form-group" :class="{ 'form-invalid': ($v.currentPassword.$error)}">
              <label for="senha-atual">{{text.form_atual}}</label>
              <vue-password id="senha-atual" v-model="$v.currentPassword.$model" classes="input" :disableStrength="true" :disableToggle="true">
                <template slot="password-input" class="control has-icons-left">
                  <input type="password" v-model="$v.currentPassword.$model" class="form__input verificaforcasenha" :placeholder="text.digite_senha" name="password" @copy.stop.prevent @paste.stop.prevent>
                </template>
              </vue-password>
            </div>
          </div>
          <div class="form-group" :class="{ 'form-invalid': ($v.password.$invalid && $v.password.required)}">
              <label class="form__label">{{text.novaSenha}}</label>
              <vue-password v-model.trim="$v.password.$model" :disableToggle="true" :disableStrength="true">
                <template #password-input="props" class="form__input verificaforcasenha">
                  <input type="password" :value="props.value" @input="props.updatePassword" class="form__input verificaforcasenha" :placeholder="text.digite_senha" name="password" @copy.stop.prevent @paste.stop.prevent>
                </template>
              </vue-password>
              <password v-model="$v.password.$model" :strength-meter-only="true" :secureLength="secureLength" @score="showScore"/>
              <div  class="col-xs-12 passStrength" :style="colorPassStrengh" >{{passStrength}}</div>
            </div>
            <div class="form-group">
            <div :class="{'form-invalid': ($v.passwordRepeat.$invalid && $v.passwordRepeat.required)}">              
              <label class="form__label">{{text.repitaSenha}}</label>
              <input type="password" id="passwordRepeat" v-model="$v.passwordRepeat.$model">        
            </div>            
            <div class="containerErrorMessages">              
            <Base-ErrorMessages
              :validatorErrors="newPasswordsCurrentErrors"
              v-if="$v.currentPassword.$error"
              class="errorMessages"
            />
            <Base-ErrorMessages
                :validatorErrors="newPasswordsErrors"
                v-if="$v.password.$invalid"
                class="errorMessages"
              />
            <Base-ErrorMessages
                :validatorErrors="newPasswordsRepeatErrors"
                v-if="$v.passwordRepeat.$invalid  && $v.passwordRepeat.required"
                class="errorMessages"
              />
              </div>
          </div>

          <div class="form-group">

            <div :class="{'form-invalid': $v.validationGroup.$invalid, 'form-group': !$v.validationGroup.$invalid }">
              <button :disabled="$v.validationGroup.$invalid || submitStatus == 'ENVIANDO' || submitStatus == 'SUCESSO'" @click="changePassword">{{text.btnConfirmar}}</button>
            </div>


            <div class="col-xs-12">
              <div class="alert alert-warning" v-if="submitStatus == 'ENVIANDO'">Carregando</div>
              <div class="alert alert-danger" v-if="submitStatus == 'ERRO'">Não foi possível efetuar a alteração de senha.</div>
              <div class="alert alert-success" v-if="submitStatus == 'SUCESSO'">Sua senha foi alterada com sucesso.</div>
            </div>

          </div>

        </div>

      </div>

    </form>


  </div>
</template>

<script>
import { VuePassword } from "vue-password";
import Password from 'vue-password-strength-meter'
import {
  required,
  sameAs,
  minLength,
  maxLength,
} from "vuelidate/lib/validators";
import { mapState, mapActions, mapMutations } from "vuex";
import { validatePassword, strengthPassword } from "~/utils/validate.utils"

export default {
  components: {
    VuePassword, Password
  },
  methods: {
    showScore (score) {      
      const objStrength = strengthPassword(score);
      this.passStrength = objStrength.message;
      this.colorPassStrengh = "color:" + objStrength.color;
    },
    async changePassword() {
      this.submitStatus = "ENVIANDO";
      const currentPassword = this.currentPassword;
      const password = this.password;
      const passwordConfirm = this.passwordRepeat;
      try {
        const { data: { login } } = await this.$axios          
          .post(`${process.env.API_AFFILIATE}/affiliateUsers/ChangePassword`, {
            Password: currentPassword,
            NewPassword: password,
            NewPasswordConfirmation: passwordConfirm,
          });
        this.submitStatus = "SUCESSO";

        this.$nuxt.$router.push("/login");
      } catch (error) {
        console.warn({ error });
        this.submitStatus = "ERRO";
      }

    },
  },
  data() {
    return {
      currentPassword: "",
      password: "",
      passwordRepeat: "",
      login: null,
      submitStatus: null,
      score: 0,
      secureLength: 5,
      passStrength: "",
      colorPassStrengh: "white",
      text: {
        form_atual: "Senha atual",        
        title: "Seja Listo",
        infoText: "Observe as regras abaixo e crie sua senha:",
        novaSenha: "Nova senha",
        repitaSenha: "Confirme a nova senha",
        senhaFraca: "Sua senha é fraca. Melhore a segurança",
        senha_obrigatorio: "Senha é obrigatória.",
        senha_minimo_1: "A senha deve ter no mínimo",
        senha_minimo_2: "caracteres.",
        senhaDiferente: "As senhas informadas não coincidem.",
        preenchaCampos: "Preencha todos os campos.",
        btnConfirmar: "CONFIRMAR",
        btnCancelar: "CANCELAR",
      },                  
    };
  },
  validations() {
    return {      
      currentPassword: {
        required,
        minLength: minLength(1)
      },      
      password: {
        ...validatePassword,
        required,
      },
      passwordRepeat: {
        required,
        sameAs: sameAs("password"),
      },
      validationGroup: ["currentPassword", "password", "passwordRepeat"],
    };
  },
  computed: {
    getReadOnly() {
      if ($nuxt.$store.state.roles.indexOf("ec_read") >= 0 || ($nuxt.$store.state.afiliado.affiliate && $nuxt.$store.state.afiliado.affiliate.affiliateStatusID < 0)) {
        return true;
      }
      return false;
    },
    newPasswordsErrors() {
      return [
        {
          error: !this.$v.validationGroup.password.minLength,
          message: this.$t("pages.new-password.errors.min-length"),
        },
        {
          error: !this.$v.validationGroup.password.maxLength,
          message: this.$t("pages.new-password.errors.max-length"),
        },
        {
          error: !this.$v.validationGroup.password.oneLowercase,
          message: this.$t("pages.new-password.errors.min-one-lowercase"),
        },
        {
          error: !this.$v.validationGroup.password.oneUppercase,
          message: this.$t("pages.new-password.errors.min-one-uppercase"),
        },
        {
          error: !this.$v.validationGroup.password.oneNumber,
          message: this.$t("pages.new-password.errors.min-one-number"),
        },
        {
          error: !this.$v.validationGroup.password.oneSpecialCharacter,
          message: this.$t(
            "pages.new-password.errors.min-one-special-character",
          ),
        },
      ];
    },
    newPasswordsRepeatErrors() {
      return [
        {
          error: this.$v.validationGroup.passwordRepeat.required,
          message: this.$t(
            "pages.new-password.errors.confirm-password-required",
          ),
        },
        {
          error: this.$v.validationGroup.passwordRepeat.sameAs,
          message: this.$t("pages.new-password.errors.confirm-password-same-as"),
        },
      ];
    },
    newPasswordsCurrentErrors() {
      return [
        {
          error: this.$v.validationGroup.currentPassword.minLength,
          message: this.$t(
            "pages.new-password.errors.password-field-required",
          ),
        }
      ];
    },
  },
};
</script>



<style lang="less">
@import "~assets/vars.less";
@import "~assets/variables.less";
#formAlterarSenha {
  #btnEnviar {
    width: 100%;
  }

  .passStrength {
      text-align: center;
      font-weight: bold;
      margin-top: -12px;
      margin-bottom: 8px;
    }

  #success-message {
    height: 100%;
    max-width: 500px;
    margin-top: 20px;

    .header-img, .footer-img {
      background-repeat: no-repeat;
      background-size: contain;
      display: block;
      width: 100%;
    }

    .header-img {
      background-image: url(https://sou.listofacil.com.br/img/email-header-alterarsenha.jpg);
      height: 130px;
      background-size: 100% 100%;
      background-position-x: center;
      margin-bottom: 10px;
    }

    .footer-img {
      background-image: url("https://sou.listofacil.com.br/img/email1-footer.jpg");
      height: 50px;
    }

    table {
      display: inline-table;
      width: 100%;
    }
  }
}
</style>
