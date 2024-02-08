<template>
  <div id="createPassword">
    <div>
      <div class="form-group" :class="{ 'form-group--error': $v.password.$error }">
        <label class="form__label">{{text.senha}}</label>
        <label class="form__label">{{text.senha}}</label>
        <input type="password" v-model.trim="$v.password.$model" class="form__input verificaforcasenha" :placeholder="text.digite_senha">
      </div>

      <!--pre>{{$v.password}}</pre-->
      <div class="error" v-if="!$v.password.required">{{text.senha_obrigatoria}}</div>
      <div class="error" v-if="!$v.password.minLength">{{text.senha_minima_1}} {{ $v.password.$params.minLength.min }} {{text.senha_minima_2}}.</div>
      <div class="form-group" :class="{ 'form-group--error': $v.repeatPassword.$error }">
        <label class="form__label">{{text.confirme_senha}}</label>
        <input :placeholder="text.confirme_senha" class="form__input" type="password" v-model.trim="$v.repeatPassword.$model" />
      </div>
      <div class="error" v-if="!$v.repeatPassword.sameAsPassword">{{text.senhas_iguais}}.</div>
    </div>
  </div>

</template>

<style lang="less" scoped>
@import "~assets/vars.less";
@import "~assets/variables.less";

input {
  @media (max-width: @screen-xs-max) {
  }
  @media (min-width: @screen-sm-min) {
  }
  @media (min-width: @screen-md-min) {
  }
  @media (min-width: @screen-lg-min) {
  }

  &::placeholder {
    /* Chrome, Firefox, Opera, Safari 10.1+ */
    font-family: @mainFontLight;
    color: @color10;
    opacity: 1; /* Firefox */
  }

  &:-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    color: @color10;
    font-family: @mainFontLight;
  }

  &::-ms-input-placeholder {
    /* Microsoft Edge */
    color: @color10;
    font-family: @mainFontLight;
  }
}

.error {
  margin-top: 5px;
}
.form__label {
  margin-top: 15px;
}
</style>

<script>
import {
  required,
  minLength,
  helpers,
  email,
  sameAs,
} from "vuelidate/lib/validators";

export default {
  data() {
    return {
      mail: "",
      password: "",
      repeatPassword: "",
      submitStatus: "",
      score: 0,
      text: {
        senha: "Senha",
        digite_senha: "Digite sua senha",
        senha_obrigatoria: "Senha é obrigatória",
        confirme_senha: "Confirme a senha",
        senha_minima_1: "A senha deve ter no mínimo",
        senha_minima_2: "caracteres",
        senhas_iguais: "As senhas não são iguais",
      },
    };
  },
  validations: {
    password: {
      required,
      minLength: minLength(6),
    },
    repeatPassword: {
      sameAsPassword: sameAs("password"),
    },
  },

  methods: {
    submit() {
      const self = this;

      // console.log("enviado!");
      this.$v.$touch();
      if (self.$v.$invalid) {
        self.submitStatus = "ERROR";
      } else if (self.score > 2) {
        // do your submit logic here
        self.submitStatus = "PENDENTE";
        setTimeout(() => {
          self.submitStatus = "OK";

          self.$axios
            .get(
              "https://u8xx5wlypf.execute-api.sa-east-1.amazonaws.com/development/api/Client/balance/13585",
            )
            /* axios.post('https://u8xx5wlypf.execute-api.sa-east-1.amazonaws.com/development/api/Client/balance/13585', {
              firstName: 'Fred',
              lastName: 'Flintstone'
            }) */
            .then((response) => {
              // console.log("response", response);
              self.submitStatus = "OK";
              // vm.$root.$children[0].cadastroLogin = 3
              self.$router.push("/novo-cadastro/obrigado", () => {});
              // cadastroLogin = 3
            })
            .catch((error) => {
              self.$router.push("/novo-cadastro/contato", () => {});
              // vm.$root.$children[0].cadastroLogin = 0
              // console.log("error", error);
            });
        }, 500);
      } else {
        self.submitStatus = "POORPASSWORD";
      }
    },
    updateScore(password, userInputs) {
      const self = this;
      self.score = self.$children[0].strength.score;
    },
  },
};
</script>
