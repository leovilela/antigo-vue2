<template>
  <section id="new-password-form" class="new-password">
    <form @submit.prevent="handleSubmit" class="new-password__form">
      <header class="new-password__header">
        <h3 class="new-password__title">
          {{ $t("pages.new-password.title") }}
          <strong class="new-password__title-highlight">{{
            $t("pages.new-password.subtitle")
          }}</strong>
        </h3>
      </header>
      <label for="new-password" class="new-password__label">{{
        $t("pages.new-password.label.new-password")
      }}</label>
      <vue-password :disableStrength="true" v-model.trim="$v.form.newPassword.$model">
        <template>
          <input
            type="password"
            :placeholder="$t('pages.new-password.label.new-password')"
            :class="{ form__field__error: $v.form.newPassword.$error }"
            id="new-password"
            name="password"
            class="form__input"
            @input="delayTouch($v.form.newPassword)"
            @copy.stop.prevent
            @paste.stop.prevent
          />
        </template>
      </vue-password>
      <Base-ErrorMessages
        :validatorErrors="newPasswordsErrors"
        v-if="$v.form.$anyError && !$v.form.confirmNewPassword.required"
      />
      <label for="confirm-new-password" class="new-password__label">{{
        $t("pages.new-password.label.confirm-new-password")
      }}</label>
      <vue-password :disableStrength="true" v-model.trim="$v.form.confirmNewPassword.$model">
        <template>
          <input
            type="password"
            :placeholder="$t('pages.new-password.label.confirm-new-password')"
            :class="{ form__field__error: $v.form.confirmNewPassword.$error }"
            id="confirm-new-password"
            name="name"
            class="form__input"
            @input="delayTouch($v.form.confirmNewPassword)"
            @copy.stop.prevent
            @paste.stop.prevent
          />
        </template>
      </vue-password>
      <template
        v-if="
          $v.form.confirmNewPassword.$error &&
            $v.form.confirmNewPassword.required &&
            !$v.form.confirmNewPassword.sameAsPassword
        "
      >
        <div
          class="error"
          v-for="(error, index) in confirmNewPasswordErrors"
          :key="index"
        >
          {{ error.message }}
        </div>
      </template>
      <Base-Button type="submit" class="new-password__button"
        >Enviar</Base-Button
      >
    </form>
  </section>
</template>

<script>
import { VuePassword } from "vue-password";
import {
  required,
  sameAs,
  minLength,
  maxLength,
} from "vuelidate/lib/validators";
import { mapState, mapActions, mapMutations } from "vuex";
import { validatePassword } from "../../utils/validate.utils";

const touchMap = new WeakMap();

export default {
  layout: "nova-senha",
  components: { VuePassword },
  data() {
    return {
      form: {
        newPassword: "",
        confirmNewPassword: "",
      },
      errors: false,
    };
  },
  validations: {
    form: {
      newPassword: {
        required,
        ...validatePassword,
      },
      confirmNewPassword: {
        required,
        sameAsPassword: sameAs("newPassword"),
      },
    },
  },
  computed: {
    ...mapState({
      token: state => state.auth.token,
      documentNumber: state => state.auth.documentNumber,
    }),
    newPasswordsErrors() {
      return [
        {
          error: !this.$v.form.newPassword.minLength,
          message: this.$t("pages.new-password.errors.min-length"),
        },
        {
          error: !this.$v.form.newPassword.maxLength,
          message: this.$t("pages.new-password.errors.max-length"),
        },
        {
          error: !this.$v.form.newPassword.oneLowercase,
          message: this.$t("pages.new-password.errors.min-one-lowercase"),
        },
        {
          error: !this.$v.form.newPassword.oneUppercase,
          message: this.$t("pages.new-password.errors.min-one-uppercase"),
        },
        {
          error: !this.$v.form.newPassword.oneNumber,
          message: this.$t("pages.new-password.errors.min-one-number"),
        },
        {
          error: !this.$v.form.newPassword.oneSpecialCharacter,
          message: this.$t(
            "pages.new-password.errors.min-one-special-character",
          ),
        },
      ];
    },
    confirmNewPasswordErrors() {
      return [
        {
          error: this.$v.form.confirmNewPassword.required,
          message: this.$t(
            "pages.new-password.errors.confirm-password-required",
          ),
        },
        {
          error: this.$v.form.confirmNewPassword.sameAs,
          message: this.$t("pages.new-password.errors.confirm-password-same-as"),
        },
      ];
    },
  },
  methods: {
    ...mapActions({
      validateRequest: "auth/validateRequest",
      cleanAuth: "auth/cleanAuth",
      changePassword: "auth/changePassword",
      // logout: "logout",
    }),
    ...mapMutations(["startLoading", "finishLoading"]),
    async handleSubmit() {
      this.errors = false;
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.errors = true;
        return;
      }
      try {
        this.startLoading();
        await this.changePassword(this.form);
        this.$swal({
          title: "Nova senha cadastrada.",
          text: "Pronto! Acesse seu Listo Fácil novamente.",
          icon: "success",
          showCloseButton: false,
          showConfirmButton: false,
          allowOutsideClick: false,
          allowScapeKey: false,
          allowEnterKey: false,
          customClass: "swal-listo",
        });
      } catch (error) {
        console.error(error);

        return this.$swal({
          title: "Não foi possível cadastrar ",
          text: "Por favor, solicite uma nova alteração de senha",
          icon: "error",
          showCloseButton: false,
          showConfirmButton: false,
          allowOutsideClick: false,
          allowScapeKey: false,
          allowEnterKey: false,
          customClass: "swal-listo",
        });
      } finally {
        this.finishLoading();
      }
    },
    delayTouch($v) {
      $v.$reset();
      if (touchMap.has($v)) {
        clearTimeout(touchMap.get($v));
      }
      touchMap.set($v, setTimeout($v.$touch, 2000));
    },
  },

  async mounted() {
    try {
      this.startLoading();
      this.$store.dispatch("logout");
      await this.validateRequest(this.$route.query.guid);
    } catch (error) {
      console.error(error);
      this.$swal({
        title: "Erro!",
        text: "Por favor, solicite uma nova alteração de senha",
        icon: "error",
        showCloseButton: false,
        showConfirmButton: false,
        allowOutsideClick: false,
        allowScapeKey: false,
        allowEnterKey: false,
        customClass: "swal-listo",
      });
    } finally {
      this.finishLoading();
    }
  },
};
</script>

<style lang="less">
@import "~assets/vars.less";
@import "./style";
</style>
