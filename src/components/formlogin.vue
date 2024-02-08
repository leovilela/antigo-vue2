<template>
  <form id="loginForm" @submit.prevent="submit" autocomplete="off">
    <!-- <p>submitStatus {{submitStatus}}</p> -->
    <h1>{{text.sou_listo}}</h1>

    <div class="form-group" :class="{ 'form-group--error': $v.credentials.account.$error }">
      <label class="form__label">{{text.numero_cliente}}</label>
      <the-mask :mask="'####################################'" :placeholder="text.digite_numero_cliente" id="account" name="login" type="text" class="form__input" v-model.trim="$v.credentials.account.$model" />
    </div>
    <div class="error" v-if="$v.credentials.account.$errors">{{text.numero_cliente_obrigatorio}}</div>

    <div class="form-group" :class="{ 'form-group--error': $v.credentials.user.$error }">
      <label class="form__label">Login</label>
      <the-mask :tokens="loginToken" mask="LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL" :placeholder="text.digite_usuario" id="user" name="login" type="text" class="form__input" v-model.trim="$v.credentials.user.$model" />
    </div>
    <div class="error" v-if="!$v.credentials.user.required">{{text.login_obrigatorio}}</div>

    <div class="form-group" :class="{ 'form-group--error': $v.credentials.password.$error }">
      <label class="form__label">{{text.senha}}</label>
      <input :placeholder="text.digite_senha" id="password" type="password" class="form__input" v-model.trim="$v.credentials.password.$model"  />
    </div>
    <div class="error" v-if="!$v.credentials.password.required">{{text.senha_obrigatorio}}</div>

    <span class="esqueceu">
      <nuxt-link to="/redefinir-senha/info">{{text.esqueceu_senha}}</nuxt-link>
    </span>
    <button type="submit" class="acessar">{{text.acessar}}</button>

    <div class="alert alert-danger" role="alert" v-show="submitStatus === 'FILLERROR'">{{text.favor_preencher}}</div>
    <div class="alert alert-warning" role="alert" v-show="submitStatus === 'OK'">{{text.carregando}}...</div>
    <div class="alert alert-warning" role="alert" v-show="submitStatus === 'PENDENTE'">{{text.enviando}}...</div>
    <div class="alert alert-danger" role="alert" v-show="submitStatus === 'LOGINERROR'">{{text.errologin}}</div>
    <span class="ou">{{text.ou}}</span>
    <nuxt-link to="/novo-cadastro">
      <button :disabled="submitStatus === 'PENDENTE' || submitStatus == 'OK'" class="sejalisto">{{text.seja_listo }}</button>
    </nuxt-link>
    <div id="loading" v-if="controls.loading"></div>
  </form>
</template>
<script>
import { mapActions, mapMutations } from "vuex";
import { required } from "vuelidate/lib/validators";
import { mask } from "vue-the-mask";


export default {
  name: "loginForm",
  data() {
    return {
      errors: [],
      credentials: {
        account: null,
        user: null,
        password: null,
      },
      submitStatus: "",
      loginToken: {
        L: {
          pattern: /[0-9a-zA-Z-_.]/,
        },
      },
      text: {
        sou_listo: "Sou Listo",
        numero_cliente: "Número do cliente",
        digite_numero_cliente: "Digite o número da sua conta listo",
        numero_cliente_obrigatorio: "Número do cliente é obrigatório",
        digite_usuario: "Digite seu usuário Listo",
        login_obrigatorio: "Login é obrigatório",
        senha: "Senha",
        digite_senha: "Digite sua senha",
        senha_obrigatorio: "Senha é obrigatória",
        esqueceu_senha: "Esqueceu sua senha?",
        acessar: "ENTRAR",
        favor_preencher: "Favor preencher os dados corretamente",
        carregando: "Carregando",
        enviando: "Enviando",
        quero_ficar_conectado: "Quero ficar conectado",
        ou: "ou",
        seja_listo: "SEJA LISTO",
        errologin: "",
        error: {
          invalid_scope: "Não foi possível efetuar seu login",
          invalid_grant: "Número do cliente, login ou senha incorretos",
          invalid_request: "Requisição inválida",
          unauthorized_client: "Cliente não autorizado",
          access_denied: "Acesso não autorizado",
          unsupported_response_type: "Tipo de resposta não suportado",
          server_error: "Erro no servidor",
          temporarily_unavailable: "Temporariamente indisponível",
        },
      },
      controls: {
        loading: false,
      },
    };
  },
  validations: {
    credentials: {
      account: {
        required,
      },
      user: {
        required,
      },
      password: {
        required,
      },
    },
  },
  methods: {
    ...mapActions({
      doLogin: "login",

    }),
    ...mapMutations([
      "limpaLogin",
    ]),
    async submit() {
      if (this.$v.credentials.$invalid) {
        this.$v.$touch();
        return;
      }
      const panelRoute = "/painel-do-cliente";
      this.controls.loading = true;
      this.submitStatus = "PENDENTE";
      const username = `${this.credentials.user}@${this.credentials.account}`;
      const password = this.$services.auth.encodePassword(this.credentials.password);
      try {
        await this.doLogin({
          username,
          password,
        });
        this.submitStatus = "OK";
        this.$router.push('/painel-do-cliente');
      } catch (error) {
        const log = error;
        this.controls.loading = false;
        if (this.text.error[log]) {
          this.text.errologin = this.text.error[log];
        } else {
          this.text.errologin = this.text.error.server_error;
        }
        this.submitStatus = "LOGINERROR";
      }
    },
  },
};
</script>
<style lang="less" scoped>
@import "~assets/vars.less";
@import "~assets/variables.less";

#loginForm {
  padding: 0 15px;
  user-select: none;

  #loading{
    position: absolute;
    z-index: 99;
    height: 100vh;
    width: 100%;
    top:0;
    left: 0;
    background: url("~assets/img/loading.gif") center no-repeat  rgba(0, 0, 0, 0.5) ;
  }

  h1 {
    font-family: @mainFontBold;
    font-size: @ftSizeBig;
    display: block;
    margin: 10px 0;
  }
  .esqueceu {
    display: block;
    text-align: right;
    padding: 16px 0 0px 0;
    width: 100%;
    font-family: @mainFont;
    font-size: @ftSizeNormal;
    text-decoration: none;

    a {
      color: @color1;

      &:hover {
        text-decoration: none;
      }
    }
  }
  .acessar,
  .sejalisto {
    color: @color2;
    background: @color5;
    margin: 16px 0 0;
    width: 100%;
  }
  .sejalisto {
    @media (max-width: @screen-xs-max) {
      display: none;
    }
  }
  .glyphicon-ok {
    &:before {
      color: @color11;
    }
  }
  .ou {
    display: block;
    width: 100%;
    text-align: center;
    position: relative;
    z-index: 10;
    margin: 16px 0 0;
    @media (max-width: @screen-xs-max) {
      display: none;
    }
    @media (min-width: @screen-sm-min) {
    }
    @media (min-width: @screen-md-min) {
    }
    @media (min-width: @screen-lg-min) {
    }
    &:before {
      border-top: 1px solid @color16;
      position: absolute;
      content: "";
      width: 40%;
      top: 10px;
      left: 0;
      z-index: 1;
    }
    &:after {
      border-top: 1px solid @color16;
      position: absolute;
      content: "";
      width: 40%;
      top: 10px;
      right: 0;
      z-index: 1;
    }
    @media (min-width: @screen-sm-min) {
    }
    @media (min-width: @screen-md-min) {
    }
    @media (min-width: @screen-lg-min) {
    }
  }
  .alert {
    margin: 20px 0 0;
  }
  .error {
    margin-top: -10px;
  }
}
</style>
