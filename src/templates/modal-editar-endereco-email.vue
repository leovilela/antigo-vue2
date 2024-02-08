<template>
  <form
    autocomplete="off"
    class="modal-editar-endereco-email container-fluid"
    :class="{'form-no-edit': controls.loading}"
    @submit.prevent="submitNewEmail"
  >
    <div class="form-section" >
      <div class="row form-group">
        <div class="col-xs-12">
          <h2>Digite sua senha para confirmar a alteração do email</h2>
          <label for="senha">{{text.senha}}</label>
          <input
            :class="{ 'form-error': !$v.form.password.required }"
            type="password"
            name="senha"
            id="senha"
            v-model="form.password"
            :placeholder="text.placeholder_senha"
            :disabled="controls.disable"
            autocomplete="false"
          />
        </div>
        <div class="col-xs-12">
          <button type="submit" :disabled="!$v.form.password.required || controls.disable">{{text.confirmar}}</button>
        </div>
      </div>
    </div>

    <div class="row form-group" v-if="controls.submitStatus !== null" >
        <div class="col-xs-12">
          <div class="alert alert-warning" v-if="controls.submitStatus !== null && controls.submitStatus !== false && controls.submitStatus !== 200 && $v.form.password.required">{{text.erroAlteracaoEmail}}</div>
          <div class="alert  alert-danger" v-if="controls.passwordValid === false">{{text.errorSenha}}</div>
        </div>
    </div>
  </form>
</template>

<script>
import { EventBus } from '~/utils/eventBus.utils.js';
import { mapState, mapGetters } from "vuex";
import { required } from "vuelidate/lib/validators";
import { decodeToken } from "../utils/auth.utils";
import { JSEncrypt } from "jsencrypt";
export default {
  data() {
    return {
      text: {
        senha: "Senha",
        confirmar: "Confirmar",
        usuario: "Usuário",
        errorSenha: "Senha inválida. Tente novamente.",
        sucessoAlteracaoEmail:
          "Sucesso!",
        erroAlteracaoEmail: "Houve algum problema na alteração do email. Tente mais tarde.",
        placeholder_senha: "Digite sua senha"
      },
      form: {
        password: null
      },
      controls: {
        loading: false,
        hasLoaded: false,
        passwordValid: null,
        submitStatus: null,
        disable: false,
      }
    };
  },
  props: {
    emailPrincipal: {
      required: true
    },
    infoComplementarys: {
      type: Object,
      required: true
    }
  },
  created() {
    const self = this;

    self.controls.loading = false;
  },
  methods: {
    submitNewEmail() {
      const self = this;
      const baseURLAuthorization = `${process.env.API_CLIENT}/api/Authorization`;
      const baseURLAffiliateContacts = `${process.env.API_AFFILIATE}/affiliateContacts`;
      self.controls.loading = true;
      self.$axios
        .get(`${baseURLAuthorization}/PublicKey`)
        .then(response => {
          const user = `${self.usuario.userName}@${self.usuario.clientID}`;
          const passwordEncrypted = this.encodePassword(
            self.form.password,
            response.data
          );
          
          self.$axios
            .post(`${baseURLAuthorization}/ValidateUser`, {
              userName: user,
              password: passwordEncrypted
            })
            .then(response => {
              self.controls.loading = false;
              if (response.status == 200) {
                const { authenticated } = response.data;

                if (authenticated == true) {
                  self.$axios
                    .put(
                      `${baseURLAffiliateContacts}/addressAttribute/${self.infoComplementarys.contacts[0].id}`,
                      {
                        contactAddressId:
                        self.infoComplementarys.id,
                        attributeType:
                          self.infoComplementarys.contacts[0].attributeType,
                        value: self.emailPrincipal
                      }
                    )
                    .then(response => {
                      self.controls.loading = false;
                        self.controls.submitStatus = 200;
                        self.controls.passwordValid = true;
                        self.controls.disable = true;
                        self.$nuxt.$emit("toggleModal", null);
                        EventBus.$emit('onPrimaryEmailModified');
                    })
                    .catch(error => {
                      self.controls.loading = false;
                      self.controls.submitStatus = error.status;
                      console.warn("Err:", error.status);
                    });
                } else {
                  self.controls.submitStatus = false;
                  self.controls.passwordValid = false;
                }
              } 
            })
            .catch(error => {
              self.controls.loading = false;
              self.controls.submitStatus = error.status;
              console.warn("Err:", error.status);
            });
        })
        .catch(error  => {
          self.controls.loading = false;
          self.controls.submitStatus = error.status;
          console.warn("Err:", error.status);
        });
    },
    encodePassword(password, publicKey) {
      // eslint-disable-next-line global-require
      const $encrypt = new JSEncrypt();
      $encrypt.setPublicKey(publicKey);
      return $encrypt.encrypt(password);
    },

  },
  validations() {
    const self = this;
    return {
      form: {
        password: {
          required
        }
      }
    };
  },
  computed: {
    ...mapGetters({
      isUserOwner: "auth/isUserOwner"
    }),
    ...mapState({
      usuario: state => state.usuario
    })
  },
  watch: {
    "form.password": function(newValue, oldValue){
      if(newValue !== oldValue){
        this.controls.submitStatus = null;
      }
    }
  },
};
</script>

<style lang='less'>
@import "~assets/main.less";
.form-error {
  border: solid 1px red !important;
  color: red !important;
}
</style>
