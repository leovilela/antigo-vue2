<template>
  <transition name="scroll">
    <div
      id="menu-dropdown"
      class="container-fluid"
      v-if="controls.toggleDropdown"
      v-on-clickaway="closeDropdownMenu"
    >
      <div class="dropdown-title row">
        <div class="user-picture col-xs-3">
          <div
            class="dropdown-profile-picture"
            :style="{ backgroundImage: `url(${content.imgDataUrl})` }"
          ></div>
        </div>
        <div class="user-data col-xs-8">
          <span id="affiliate-id">{{$nuxt.$store.state.usuario.clientID}}</span>
          <br />
          <span id="username">{{$nuxt.$store.state.usuario.userName}}</span>
        </div>
      </div>
      <div class="dropdown-links row">
        <table>
          <tbody>
            <tr class="dropdown-links-minha-conta"
             @click="openTargetTab(text.minhaConta)"
              v-if="getAdmin || canViewRegistrationData"
             >
              <td>
                <img src="~/assets/img/ico-minha-conta-listo-pq.png" :alt="text.minhaConta" />
              </td>
              <td>
                <nuxt-link :to="'/meus-dados-cadastrais'">{{text.minhaConta}}</nuxt-link>
              </td>
            </tr>
            <tr
              class="dropdown-links-alterar-senha"
              @click="openTargetTab(text.alterarSenha)"
              v-if="getAffiliateStatus > 0"
            >
              <td>
                <img src="~/assets/img/ico-cadeado-pq.png" :alt="text.alterarSenha" />
              </td>
              <td>
                <nuxt-link :to="'/meus-dados-cadastrais'">{{text.alterarSenha}}</nuxt-link>
              </td>
            </tr>
            <tr class="dropdown-links-contrato" @click="openTargetTab(text.contrato)">
              <td>
                <img src="~/assets/img/ico-contrato.png" :alt="text.contrato" />
              </td>
              <td>
                <nuxt-link :to="'/meus-dados-cadastrais'">{{text.contrato}}</nuxt-link>
              </td>
            </tr>
            <tr class="dropdown-links-sair" @click="logout">
              <td>
                <img src="~/assets/img/ico-sair.png" :alt="text.sair" />
              </td>
              <td>
                <nuxt-link :to="'/login'">{{text.sair}}</nuxt-link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </transition>
</template>

<style lang="less">
@import "~assets/vars.less";
@import "~assets/variables.less";

#menu-dropdown {
  position: absolute;
  top: 40px;
  right: 10px;
  // left: -10px;
  margin: auto;
  background: @color2;
  z-index: 1;
  box-shadow: 0px 0px 20px 5px rgba(0, 0, 0, 0.25);
  min-width: 200px;
  border-radius: 5px;
  overflow: hidden;

  .dropdown-title,
  .dropdown-links {
    padding-top: 10px;
    padding-bottom: 10px;
  }

  .dropdown-title {
    background-color: @color5;
    font-size: @ftSizeLarge;
    color: @color2;

    .user-picture {
      text-align: center;
      vertical-align: middle;
      .dropdown-profile-picture {
        height: 36px;
        width: 36px;
        background-color: @color2;
        background-size: cover;
        background-repeat: no-repeat;
        background-position: 50% 50%;
        border: 1px solid @color20;
        border-radius: 100%;
        vertical-align: middle;
        margin-top: 2px;
      }
    }

    .user-data {
      text-align: left;
      vertical-align: middle;
      text-overflow: ellipsis;
      overflow: hidden;

      #affiliate-id {
        font-weight: bold;
      }
    }
  }

  .dropdown-links {
    table {
      width: 100%;
      border-collapse: separate;
      border-spacing: 0px 5px;

      tr {
        td {
          a {
            color: @color5;
          }

          img {
            width: 24px;
            height: 24px;
          }

          &:nth-child(odd) {
            text-align: center;
            min-width: 36px;
          }

          &:nth-child(even) {
            text-align: left;
          }
        }
      }
    }
  }
}
</style>

<script>
import { mixin as clickaway } from "vue-clickaway";
import profileImage from "~/assets/img/profile.jpg";
import { mapState } from "vuex";
import { ROLES } from "../enums/Roles";

export default {
  data() {
    return {
      controls: {
        toggleDropdown: false
      },
      content: {
        imgDataUrl: this.$store.state.pictureUrl || profileImage, // the datebase64 url of created image,
        links: {
          minhaConta: {
            label: "Minha Conta Listo",
            dest: "/meus-dados-cadastrais",
            img: "/img/ico-minha-conta-listo-pq.png"
          },
          alterarSenha: {
            label: "Alterar Senha",
            dest: "/meus-dados-cadastrais",
            img: "/img/ico-cadeado-pq.png"
          },
          contrato: {
            label: "Contrato",
            dest: "/meus-dados-cadastrais",
            img: "/img/ico-contrato.png"
          },
          sair: {
            label: "Sair",
            dest: "/login",
            img: "/img/ico-sair.png"
          }
        }
      },
      text: {
        minhaConta: "Minha conta listo",
        alterarSenha: "Alterar senha",
        contrato: "Contrato",
        sair: "Sair"
      }
    };
  },
  created() {
    const self = this;
    self.$nuxt.$on("toggleDropdown", data => {
      // console.log("toggle dropdown");
      self.controls.toggleDropdown = data;
    });
  },
  methods: {
    // efetua logout e retorna para tela de login
    logout() {
      this.$services.auth.logout();
    },

    // carrega página de Dados Cadastrais na tab alvo
    openTargetTab(val) {
      this.controls.toggleDropdown = false;
      this.$nuxt.$emit("toggleDropdown", this.controls.toggleDropdown);

      this.$nuxt.$store.commit("updateTabDadosCadastrais", val);
      this.$nuxt.$emit("trocaTab", this.$nuxt.$store.state.tabDadosCadastrais);
    },

    // fecha o dropdown quando clicar fora
    closeDropdownMenu() {
      const self = this;

      // console.log("click away");

      self.controls.toggleDropdown = false;
      this.$nuxt.$emit("toggleDropdown", this.controls.toggleDropdown);
    }
  },
  computed: {
    ...mapState({
      userPermissions: state => state.client.userPermissions
    }),

    getAffiliateStatus() {
      if (!this.$store.state.afiliado.affiliate) {
        return -1;
      }
      return this.$store.state.afiliado.affiliate.affiliateStatusID || -1;
    },
    getAdmin() {
      if ($nuxt.$store.state.roles) {
        if (
          $nuxt.$store.state.roles.indexOf("ec_owner") >= 0 ||
          $nuxt.$store.state.roles.indexOf("lf_admin") >= 0
        ) {
          return true;
        }
      }
      return false;
    },
    canViewRegistrationData() {
      return this.userPermissions.some(code => {
        return ROLES.CADASTRAL_DATA === code;
      });
    }

  },
  mixins: [clickaway]
};
</script>
