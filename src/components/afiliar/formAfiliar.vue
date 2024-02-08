<template>
  <transition name="page">
    <form id="afiliarForm" @submit.prevent="validateAffiliateForm" autocomplete="off">
    <!-- <form id="afiliarForm" @submit.prevent="submit"> -->
      <!-- <p v-for="(vl, key, index) in $v" :key="index">{{key}}: {{vl}}</p> -->
      <!-- <p>validFormInfo {{validFormInfo}}</p> -->
      <h1>{{text.title_afiliar}}</h1>

      <div class="radio" v-if="!$v.documentNumber.$invalid">
        <input type="radio" value="CPF" class="d-none" style="display: none;">
        <span><i v-if="showCPFCheck" class="cr-icon glyphicon glyphicon-ok"></i></span>
        <label v-if="showCPFCheck">CPF</label>

        <input type="radio" value="CNPJ" class="d-none" style="display: none;">
        <span><i v-if="showCNPJCheck" class="cr-icon glyphicon glyphicon-ok"></i></span>
        <label v-if="showCNPJCheck">CNPJ</label>
      </div>

      <div :class="{ 'form-invalid': ($v.documentNumber.$invalid && validFormInfo) || ($v.documentNumber.$invalid && $v.documentNumber.required)}">
        <!-- <p>{{$v.documentNumber}}</p> -->
        <label for="documentNumber">Documento</label>
        <!-- <the-mask :mask="['###.###.###-##', '##.###.###/####-##']" :placeholder="text.documentNumber_digitedocumentNumber" id="documentNumber" name="document" type="text" class="form__input" v-model.trim="$v.documentNumber.$model" @copy.native.prevent @paste.native.prevent/> -->
        <the-mask :mask="['###.###.###-##', '##.###.###/####-##']" :placeholder="text.documentNumber_digitedocumentNumber" id="documentNumber" name="document" type="text" class="form__input" v-model.trim="$v.documentNumber.$model"  @copy.native.prevent @paste.native.prevent />
        <div class="error" v-if="!$v.documentNumber.required && validFormInfo">{{text.documentNumber_obrigatorio}}</div>
        <div class="error" v-if="!$v.documentNumber.validaDocumento && $v.documentNumber.required">{{text.documentNumber_invalido}}</div>
      </div>


      <div :class="{ 'form-invalid': $v.login.$invalid && validFormInfo}">
        <label class="form__label">{{text.login}}</label>
        <the-mask :tokens="loginToken" mask="LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL" :placeholder="text.digite_login" id="login" name="login" type="text" class="form__input" v-model.trim="$v.login.$model" @copy.native.prevent @paste.native.prevent />
        <!-- <input :placeholder="text.digite_login" id="login" type="text" name="login" class="form__input" v-model.trim="$v.login.$model" @copy.stop.prevent @paste.stop.prevent/> -->
        <div v-if="validFormInfo">
          <div class="error" v-if="!$v.login.required">{{text.login_obrigatorio}}</div>
        </div>
      </div>

      <!-- email e confirmacao -->

      <div :class="{ 'form-invalid': ($v.email.$invalid && validFormInfo) || ($v.email.$invalid && $v.email.required)}">
        <label class="form__label">E-mail</label>
        <input :placeholder="text.digite_email" id="email" name="email" type="text" class="form__input" v-model.trim="$v.email.$model" @copy.stop.prevent @paste.stop.prevent/>
        <div class="error" v-if="!$v.email.required && validFormInfo">{{text.email_obrigatorio}}</div>
        <div class="error" v-if="$v.email.required && $v.email.$invalid">{{text.email_invalido}}</div>
      </div>

      <div :class="{ 'form-invalid': ($v.repeatEmail.$invalid && validFormInfo) || ($v.repeatEmail.$invalid && $v.repeatEmail.required) }">
        <label class="form__label">{{text.confirme_email}}</label>
        <input :placeholder="text.confirme_email" name="repeatEmail" id="repeatEmail" class="form__input" type="text" v-model.trim="$v.repeatEmail.$model" @copy.stop.prevent @paste.stop.prevent/>
        <div v-if="validFormInfo || ($v.repeatEmail.$invalid && $v.repeatEmail.required)">
          <div class="error" v-if="!$v.repeatEmail.repeatEmail">{{text.emails_diferentes}}</div>
        </div>
      </div>
      <!-- fim email e confirmacao -->

      <div :class="{ 'form-invalid': $v.password.$invalid && (validFormInfo || $v.password.required)}">
        <label class="form__label">{{text.senha}}</label>
        <vue-password v-model.trim="$v.password.$model" :disableToggle="true" :disableStrength="true">
          <template #password-input="props" class="form__input verificaforcasenha">
            <input type="password" :value="props.value" @input="props.updatePassword" class="form__input verificaforcasenha" :placeholder="text.digite_senha" name="password" @copy.stop.prevent @paste.stop.prevent>
          </template>
        </vue-password>
        <div v-if="$v.password.$invalid && (validFormInfo || $v.password.required)">
          <div class="error" v-if="!$v.password.required">{{text.senha_obrigatorio}}</div>
          <div class="error" v-if="!$v.password.updateStrenght && $v.password.required && $v.password.minLength">{{text.senhaFraca}}</div>
          <div class="error" v-if="!$v.password.minLength">{{text.senha_minimo_1}} {{ $v.password.$params.minLength.min }} {{text.senha_minimo_2}}</div>
          <div class="error" v-if="!$v.password.notEqualToEmail && $v.password.required">{{text.senha_diff_email}}</div>
        </div>

      </div>


      <div :class="{ 'form-invalid': ($v.repeatPassword.$invalid && validFormInfo) || ($v.repeatPassword.$invalid && $v.repeatPassword.required)}">
        <label class="form__label">{{text.confirme_senha}}</label>
        <input :placeholder="text.confirme_senha" class="form__input" type="password" v-model.trim="$v.repeatPassword.$model" @copy.stop.prevent @paste.stop.prevent/>
        <div class="error" v-if="($v.repeatPassword.$invalid && validFormInfo) || ($v.repeatPassword.$invalid && $v.repeatPassword.required)">{{text.senha_diferentes}}</div>
      </div>

      <div class="form-group" :class="{ 'form-invalid': $v.telefone.$invalid && (validFormInfo || $v.telefone.required)}">
        <label class="form__label">{{text.telefone}}</label>
        <the-mask :masked="true" :mask="['(##) ####-####', '(##) #####-####']" :placeholder="text.digite_telefone" id="telefone" name="phone" type="text" class="form__input" v-model.trim="$v.telefone.$model" @copy.native.prevent @paste.native.prevent/>
        <div class="error" v-if="!$v.telefone.required && validFormInfo">{{text.telefone_obrigatorio}}</div>
        <div class="error" v-if="$v.telefone.$invalid && (validFormInfo || $v.telefone.required)">{{text.telefone_invalido}}</div>
      </div>

      <div class="form-group" :class="{'form-invalid': $v.verify.$invalid && validFormInfo}">
        <vue-recaptcha sitekey="6LfdB5EUAAAAAO-RAMPtXvn7fN26r56G7vEqp_ZZ" ref="gRecaptcha" theme="dark" @expired="recaptchaExpire" @verify="recaptchaVerify"></vue-recaptcha>
        <div v-if="validFormInfo">
          <p class="error" v-if="$v.verify.$invalid">{{text.favor_verificar}}</p>
        </div>
      </div>

      <div class="form-group">
        <button type="submit" :disabled="submitStatus === 'PENDING' || submitStatus === 'OK'" class="continuar" :class="{'form-group': submitStatus != null}">{{text.continuar}}</button>
        <div class="alert alert-danger" role="alert" v-if="submitStatus === 'ERROR'">{{text.favor_preencher_corretamente}}</div>
        <div class="alert alert-danger" role="alert" v-if="submitStatus === 'LOGINERROR'">{{text.server_error}}</div>
        <div class="alert alert-danger" role="alert" v-if="submitStatus === 'JWTERROR'">{{text.jwt_error}}</div>
        <div class="alert alert-danger" role="alert" v-if="submitStatus === 'INVALIDRECAPTCHA'">{{text.recaptcha_invalido}}</div>
        <div class="alert alert-danger" role="alert" v-if="submitStatus === 'INVALIDAGE'">{{text.idade_invalida}}</div>
        <!-- <div class="alert alert-success" role="alert" v-if="submitStatus === 'OK'">{{text.carregando}}...</div> -->
        <div class="alert alert-danger" role="alert" v-if="submitStatus === 'SERVERERROR'">{{text.server_error}}</div>
        <!-- <div class="alert alert-warning" role="alert" v-if="submitStatus === 'PENDING'">{{text.enviando}}...</div> -->
        <nuxt-link to="/login"><button class="cancelar" :disabled="submitStatus === 'OK' || submitStatus === 'PENDING'">{{text.cancelar}}</button></nuxt-link>
      </div>
      <div id="loading" v-if="controls.loading"></div>
    </form>
  </transition>
</template>

<style lang="less">
@import "~assets/vars.less";
@import "~assets/variables.less";

#afiliarForm {
  padding: 0 15px;
  @media (max-width: @screen-xs-max) {
  }
  @media (min-width: @screen-sm-min) {
  }
  @media (min-width: @screen-md-min) {
  }
  @media (min-width: @screen-lg-min) {
  }

  #loading{
    position: absolute;
    z-index: 99;
    height: 100vh;
    width: 100%;
    top:0;
    left: 0;
    background: url("~assets/img/loading.gif") center no-repeat  rgba(0, 0, 0, 0.5) ;
  }

  .radio {
    padding: 0;
    margin: 10px 0 0;
    label {
      display: inline-block;
      padding: 0;
    }
    .glyphicon {
      margin-right: 10px;
    }
  }

  h1 {
    font-family: @mainFontBold;
    font-size: @ftSizeBig;
    display: block;
    margin: 10px 0;
    @media (max-width: @screen-xs-max) {
      font-size: @ftSizeLarge;
    }
    @media (min-width: @screen-sm-min) {
    }
    @media (min-width: @screen-md-min) {
    }
    @media (min-width: @screen-lg-min) {
    }
  }

  .VuePassword__Meter {
    display: none;
  }

  label {
    @media (max-width: @screen-xs-max) {
    }
    @media (min-width: @screen-sm-min) {
    }
    @media (min-width: @screen-md-min) {
    }
    @media (min-width: @screen-lg-min) {
    }
  }
  .continuar,
  .cancelar {
    width: 100%;
  }
  .error {
    margin-top: 5px;
  }
}
</style>

<script>
/* eslint-disable no-debugger */

import {
  required, minLength, helpers, email, sameAs,
} from "vuelidate/lib/validators";
import { mask } from "vue-the-mask";
import { VuePassword } from "vue-password";
import VueRecaptcha from "vue-recaptcha";
import { mapMutations, mapActions } from "vuex";

import {
  phoneRegexMobile as phone,
} from "~/utils/regex.utils";
import {
  validaDocumento,
} from "~/utils/validate.utils";

const NodeRSA = require("node-rsa");


const myExport = {
  components: {
    VuePassword,
    VueRecaptcha,
  },
  mounted() {
    this.sitekey = process.env.GKEY;
  },
  computed: {
    showCPFCheck() {
      return this.documentNumberType === "CPF";
    },
    showCNPJCheck() {
      return this.documentNumberType === "CNPJ";
    },
  },
  data() {
    return {
      documentNumber: "",
      documentNumberType: "",
      cpf: false,
      cnpj: false,
      login: "",
      telefone: "",
      submitStatus: null,
      email: "",
      repeatEmail: "",
      password: "",
      repeatPassword: "",
      strenght: 0,
      contaListo: null,
      nivelStrenght: 2,
      validFormInfo: null,
      loginToken: {
        L: {
          pattern: /[0-9a-zA-Z-_.]/,
        },
      },
      text: {
        title_afiliar: "Seja Listo",
        documentNumber_digitedocumentNumber: "Digite seu CPF ou CNPJ",
        documentNumber_obrigatorio: "CNPJ ou CPF é obrigatório",
        documentNumber_invalido: "CNPJ ou CPF inválido",
        login: "Login",
        digite_login: "Digite seu login",
        login_obrigatorio: "Login é obrigatório",
        email_obrigatorio: "E-mail é obrigatório.",
        email_invalido: "E-mail inválido",
        digite_email: "Digite seu email",
        confirme_email: "Confirme seu email",
        emails_diferentes: "Os e-mails não são iguais.",
        senha: "Senha",
        digite_senha: "Digite sua senha",
        senha_obrigatorio: "Senha é obrigatória.",
        senha_minimo_1: "A senha deve ter no mínimo",
        senha_minimo_2: "caracteres.",
        confirme_senha: "Confirme sua senha",
        senha_diferentes: "As senhas não são iguais.",
        telefone: "Telefone",
        digite_telefone: "Digite seu telefone",
        telefone_obrigatorio: "Telefone é obrigatório",
        telefone_invalido: "Número de telefone inválido",
        continuar: "Continuar",
        favor_preencher_corretamente: "Favor preencher os dados corretamente",
        dados_ja_existentes: "Esses dados já estão cadastrados no sistema",
        recaptcha_invalido: "Não foi possível verificar o reCaptcha",
        idade_invalida: "Não é possível afiliar menores de idade.",
        carregando: "Carregando",
        enviando: "Enviando",
        cancelar: "Cancelar",
        senhaFraca: "Sua senha é fraca. Melhore a segurança",
        dados_invalidos: "Não foi possível criar uma conta com os dados fornecidos.",
        server_error: null,
        senha_diff_email: "Crie uma senha diferente.",
        jwt_error: "Não foi possível efetuar o login com o usuário criado. Tente fazer o login novamente.",
        favor_verificar: "Verificação de reCaptcha obrigatória.",
        erro_afiliar: "Não foi possível conectar ao servidor.",
      },
      verify: null,
      sitekey: null,
      controls: {
        loading: false,
      },
    };
  },
  name: "formAfiliar",

  directives: { mask },
  validations: {
    documentNumber: {
      required,
      validaDocumento,
    },
    login: {
      required,
      validate(value) {
        if (value) {
          if (/('|&|"|`|\s)/g.test(value)) {
            return false;
          }
          return true;
        }
        return false;
      },
    },
    email: {
      required,
      email,
    },
    repeatEmail: {
      repeatEmail: sameAs("email"),
      required,
    },
    password: {
      required,
      minLength: minLength(6),
      notEqualToEmail(value) {
        const self = this;

        if (value != self.email) return true;
        return false;
      },
      async updateStrenght(value) {
        const self = this;
        let forca;

        if (value) {
          try {
            const keyRSA = "-----BEGIN RSA PUBLIC KEY-----MIGJAoGBAMBWhZ99HL440ba3XwH2xZiRTZE8FmIVWyCJh4L7lpioye8XKmRJ2IF7R9SW1Q4GiN5Nbetpx1RU9BhxaFTFAziE2YCnkgHRz8ubVFrQmh/ZzGVhsOxEg8VjtRwg56Fl9Fj3vbZ6TzdhLD2ZiXQh+2Of0S9mlHK0/6TQG8n3jmjjAgMBAAE=-----END RSA PUBLIC KEY-----";
            const key = new NodeRSA(keyRSA);
            const password = encodeURIComponent(key.encrypt(value, "base64"));
            if (value.length >= 6) {
              const { data } = await $nuxt.$axios.post(`${process.env.AUTH_SERVER}/zxcvbn/score`, {
                password,
              }, { progress: false });
              return data > 3;
            }
          } catch (err) {
            console.log(err);
          }
        }
      },

      validate(value) {
        if (value) {
          if (/('|&|"|`|\s)/g.test(value)) {
            return false;
          }
          return true;
        }
        return false;
      },
    },
    repeatPassword: {
      required,
      sameAsPassword: sameAs("password"),
    },
    telefone: {
      required,
      phone,
      // minLength: minLength(10)
      // '/^(\(11\) (9\d{4})-\d{4})|((\(1[2-9]{1}\)|\([2-9]{1}\d{1}\)) [5-9]\d{3}-\d{4})$/'
    },
    verify: {
      required,
    },
    validaAfiliacao: [
      "documentNumber",
      "login",
      "email",
      "repeatEmail",
      "password",
      "repeatPassword",
      "telefone",
      "verify",
    ],
  },

  methods: {

    // validate all form fields
    validateAffiliateForm() {
      const self = this;

      self.validFormInfo = null;

      self.$v.$touch();
      self.validFormInfo = self.$v.$invalid;

      // console.log("form invalid", self.validFormInfo);

      if (self.validFormInfo != null && self.validFormInfo) {
        self.submitStatus = "ERROR";
      } else {
        self.validacaoRecaptcha(self.verify);
      }
    },
    async validacaoRecaptcha(recaptcha) {
      this.controls.loading = true;
      this.submitStatus = "PENDING";
      try {
        const passwordEncrypt = this.password;
        const listoAcctount = await this.$services.auth.signup(
          this.documentNumber,
          this.login,
          this.email,
          passwordEncrypt,
          this.telefone,
          recaptcha,
        );
        this.contaListo = listoAcctount;
        await this.registro(listoAcctount);
      } catch (error) {
        console.log(error);

        switch (error.message) {
          case "USER_REGISTRATION_ERROR":
            this.controls.loading = false;
            this.submitStatus = "SERVERROR";
            break;
          case "CAPTCHA_EXPIRE_ERROR":
            this.controls.loading = false;
            this.recaptchaExpire();
            this.submitStatus = "SERVERERROR";
            if (typeof error.response === "string") {
              this.text.server_error = error.response;
            } else {
              Object.keys(error.response).map((k) => { this.text.server_error = error.response[k][0]; });
            }
            break;
          default:
            this.controls.loading = false;
            this.submitStatus = "LOGINERROR";
            this.recaptchaExpire();
            this.text.server_error = error.response.data || "Erro no servidor";
        }
      }
    },

    getParamsCode(url) {
      let paramsCode = "";
      const vars = url.split("&");
      paramsCode = vars[1];
      paramsCode = paramsCode.replace("code=", "");
      return decodeURI(paramsCode);
    },

    ...mapActions({
      doLogin: "login",
    }),
    ...mapMutations([
      "limpaLogin",

    ]),
    async registro(listoAcctount) {
      const panelRoute = "/meus-dados-cadastrais";
      this.controls.loading = true;
      this.submitStatus = "PENDENTE";
      const username = `${this.login}@${listoAcctount}`;
      const password = this.$services.auth.encodePassword(this.password);
      try {
        await this.doLogin({
          username,
          password,
        });
        this.submitStatus = "OK";
        this.$router.push("/meus-dados-cadastrais", () => {});
      } catch (error) {
        this.controls.loading = false;
        this.text.errologin = error.message;
        this.submitStatus = "LOGINERROR";
      }
    },

    recaptchaVerify(tok) {
      this.verify = null;
      this.verify = tok;
    },

    recaptchaExpire() {
      this.$refs.gRecaptcha.reset();
      this.verify = null;
    },
  },
  watch: {
    documentNumber(value) {
      if (this.$v.documentNumber.$invalid) {
        return;
      }
      if (value.length === 11) {
        this.documentNumberType = "CPF";
        return;
      }

      this.documentNumberType = "CNPJ";
    },
  },

};


export default myExport;
</script>
