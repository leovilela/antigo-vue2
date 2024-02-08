<template>
  <div id="nova-senha" class="form-definir-senha container-fluid">

    <div class="row">

      <div class="col-xs-12">
        <h1 class="title">{{text.title}}</h1>
        <p class="description">{{text.infoText}}</p>
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
        <button :disabled="$v.validationGroup.$invalid || submitStatus == 'ENVIANDO' || submitStatus == 'SUCESSO'" @click="newPassword">{{text.btnConfirmar}}</button>
      </div>


      <div class="col-xs-12">
        <div class="alert alert-warning" v-if="submitStatus == 'ENVIANDO'">Carregando</div>
        <div class="alert alert-danger" v-if="submitStatus == 'ERRO'">Não foi possível efetuar a alteração de senha.</div>
        <div class="alert alert-success" v-if="submitStatus == 'SUCESSO'">Sua senha foi alterada com sucesso.</div>
      </div>

      <div>
        <nuxt-link to="/login"><button :disabled="submitStatus == 'ENVIANDO' || submitStatus == 'SUCESSO'">{{text.btnCancelar}}</button></nuxt-link>
      </div>

    </div>

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
import { validatePassword, strengthPassword } from "../../utils/validate.utils";

export default {
  data() {
    return {
      password: "",
      passwordRepeat: "",
      login: null,  
      score: 0,
      secureLength: 5,
      passStrength: "",
      colorPassStrengh: "white",
      text: {
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
      submitStatus: null,
    };
  },
  components: {
    VuePassword,
    Password
  },
  computed: {
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
  },
  validations() {
    return {
      password: {
        ...validatePassword,
        required,
      },
      passwordRepeat: {
        required,
        sameAs: sameAs("password"),
      },
      validationGroup: ["password", "passwordRepeat"],
    };
  },
  methods: {
    showScore (score) {      
      const objStrength = strengthPassword(score);
      this.passStrength = objStrength.message;
      this.colorPassStrengh = "color:" + objStrength.color;
    },
    async newPassword() {
      const self = this;
      const passwordGuide = $nuxt.$warehouse.get("password_guide");
      self.submitStatus = "ENVIANDO";
      const password = this.password;
      const passwordConfirm = self.passwordRepeat;
      try {
        const { data: { login } } = await self.$axios
          .put(`${process.env.API_AFFILIATE}/login/ChangePassword`, {
            idRequest: passwordGuide,
            password,
            passwordConfirm,
          });
        self.submitStatus = "SUCESSO";

        self.$nuxt.$router.push("/login");
      } catch (error) {
        console.warn({ error });
        self.submitStatus = "ERRO";
      }
    },
  },

};
</script>

<style lang="less" scoped>
  #nova-senha {
    .containerErrorMessages{
      margin: 15px 0;
    }
    .passStrength {
      text-align: center;
      font-weight: bold;
      margin-top: -12px;
      margin-bottom: 8px;
    }
    .title{
       font-family: @mainFontBold;
      font-size: @ftSizeBig;
      display: block;
      margin: 10px 0;
    }
    .form-group {
      margin: 0;
      min-height: 73px;
      position: relative;
    }
    .description {
      font-weight: bold;
    }
    .form__label{
      font-weight: bold;
    }
    
    
    .errorMessages {
      margin:0 5px
    }
  }  
</style>