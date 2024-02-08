<template>
<div id="contentPainelCliente">
  <div id="dadosCadastrais" slot="content">
    <a class="page-back-arrow glyphicon glyphicon-arrow-left" v-on:click="controleMobile('painel')" v-if="$mq === 'mobile' || $mq === 'tablet'"></a>
    <ul id="tabsNav" v-if="$mq === 'laptop' || $mq === 'desktop' || $mq === 'bigScreen'">
      <li v-if="getAdmin || canViewRegistrationData" @click="alteraTabs(text.minha_conta)" :class="{active:minha_conta}">{{text.minha_conta}}</li>

      <li v-if="(affiliateStatusID === 0 && getAdmin) || (affiliateStatusID === 0 && canViewRegistrationData)" @click="alteraTabs(text.domicilio_bancario)" :class="{active:domicilio_bancario, disabled:(!tabAtiva.domicilio_bancario && affiliateStatusID === 0)}">{{text.domicilio_bancario}}</li>
      <li v-if="(affiliateStatusID === 0 && getAdmin) || (affiliateStatusID === 0 && canViewRegistrationData)" @click="alteraTabs(text.comprovantes)" :class="{active:comprovantes, disabled: !tabAtiva.comprovantes }">{{text.comprovantes}}</li>

      <li v-if="(affiliateStatusID !== 0 && getAdmin) || (affiliateStatusID !== 0 && canViewRegistrationData)" @click="alteraTabs(text.domicilio_bancario)" :class="{active:domicilio_bancario}">{{text.domicilio_bancario}}</li>
      <li v-if="(affiliateStatusID !== 0 && getAdmin) || (affiliateStatusID !== 0 && canViewRegistrationData)" @click="alteraTabs(text.comprovantes)" :class="{active:comprovantes}">{{text.comprovantes}}</li>

      <li v-if="getAdmin || canViewUserManagement" @click="alteraTabs(text.editar_usuarios)" :class="{active: editar_usuarios}">{{text.editar_usuarios}}</li>
      <li v-if="!getReadOnly" @click="alteraTabs(text.alterar_senha)" :class="{active:alterar_senha}">{{text.alterar_senha}}</li>

      <li @click="alteraTabs(text.contrato)" :class="{active:contrato}">{{text.contrato}}</li>
    </ul>
  </div>

  <component-content-section v-if="minha_conta">
    <form-minha-conta slot="content"></form-minha-conta>
  </component-content-section>

  <component-content-section v-if="domicilio_bancario">
    <form-domicilio-bancario slot="content"></form-domicilio-bancario>
  </component-content-section>

  <component-content-section v-if="comprovantes">
    <form-comprovantes slot="content"></form-comprovantes>
  </component-content-section>

  <!-- <component-content-section v-if="comprovantes">
      <lista-comprovantes slot="content"></lista-comprovantes>
    </component-content-section>-->

  <component-content-section v-if="editar_usuarios">
    <lista-usuarios slot="content"></lista-usuarios>
  </component-content-section>

  <!-- <component-content-section v-if="editar_cadastro">
      <form-minhaConta slot="content"></form-minhaConta>
    </component-content-section>-->

  <component-content-section v-if="alterar_senha">
    <form-alterar-senha slot="content"></form-alterar-senha>
  </component-content-section>

  <component-content-section v-if="contrato">
    <contrato slot="content"></contrato>
  </component-content-section>

  <!-- <component-content-section v-if="editar_foto">
      <form-minhaConta slot="content"></form-minhaConta>
    </component-content-section>-->
</div>
</template>

<script>
import {
  mapActions,
  mapState
} from "vuex";
import {
  ROLES
} from "../enums/Roles";
import contentSection from "~/components/mainContentSection.vue";
import contentTabs from "~/components/mainContentTabs.vue";
import domicilioBancario from "~/components/formDomicilioBancario.vue";
import minhaConta from "~/components/formMinhaConta.vue";
import alterarSenha from "~/components/formAlterarSenha.vue";
import noticia from "~/components/notice.vue";
import listaUsuarios from "~/components/formUsuarios.vue";
import enviarComprovantes from "~/components/formComprovantes.vue";
import listaComprovantes from "~/components/affiliateFileList.vue";
import contrato from "~/components/contentContrato.vue";

export default {
  components: {
    "component-content-section": contentSection,
    "component-content-tabs": contentTabs,
    "form-minha-conta": minhaConta,
    "form-domicilio-bancario": domicilioBancario,
    "form-alterar-senha": alterarSenha,
    listaUsuarios,
    "form-comprovantes": enviarComprovantes,
    listaComprovantes,
    contrato
  },

  data() {
    return {
      text: {
        minha_conta: "Minha conta Listo",
        domicilio_bancario: "Domicílio bancário",
        editar_cadastro: "Editar cadastro",
        alterar_senha: "Alterar senha",
        editar_foto: "Editar foto",
        editar_usuarios: "Gestão de usuários",
        comprovantes: "Comprovantes",
        contrato: "Contrato"
      },
      readonly: false,
      tabAtual: "Alterar senha", // "Minha conta Listo",
      affiliateStatusID: 0,
      minha_conta: true,
      domicilio_bancario: false,
      editar_cadastro: false,
      alterar_senha: false,
      editar_foto: false,
      editar_usuarios: false,
      comprovantes: false,
      contrato: false,
      tabAtiva: {
        minha_conta: true,
        domicilio_bancario: false,
        comprovantes: false
      }
    };
  },

  created() {
    const self = this;
    self.$nuxt.$axios
      .get(`${process.env.API_AFFILIATE}/affiliates/banks`)
      .then(response => {
        self.$nuxt.$store.commit("gravaBancos", {
          banks: response.data
        });
      })
      .catch(err => {
        console.log("Err:", err);
        return false;
      });
    self.$nuxt.$on("trocaTab", data => {
      self.alteraTabs(data);
    });

    self.$nuxt.$store.state.tabDadosCadastrais != null ?
      self.alteraTabs($nuxt.$store.state.tabDadosCadastrais) :
      self.alteraTabs("Minha conta Listo");
  },

  async mounted() {
    const self = this;
    await this.getBanks();
    let affiliateFullname;
    let affiliateBankId;

    setInterval(() => {
      if (self.$nuxt.$store.state.afiliado.affiliate != null) {
        affiliateFullname = self.$nuxt.$store.state.afiliado.affiliate.fullName;
        if (affiliateFullname != "" && affiliateFullname != null) {
          self.tabAtiva.domicilio_bancario = true;
        }
      } else {
        affiliateFullname = null;
      }

      if (self.$nuxt.$store.state.afiliado.affiliate != null) {
        self.affiliateStatusID =
          $nuxt.$store.state.afiliado.affiliate.affiliateStatusID;
      } else {
        self.affiliateStatusID = 0;
      }
      if (
        self.$nuxt.$store.state.afiliado.banks != null &&
        $nuxt.$store.state.afiliado.banks != undefined
      ) {
        if (self.$nuxt.$store.state.afiliado.banks.length > 0) {
          affiliateBankId = $nuxt.$store.state.afiliado.banks[0].bankID;
          if (affiliateBankId != 0 && affiliateBankId != null) {
            self.tabAtiva.comprovantes = true;
          }
        } else {
          affiliateBankId = null;
        }
      }
    }, 100);
  },

  computed: {
    ...mapState({
      userPermissions: state => state.client.userPermissions
    }),

    getReadOnly() {
      if ($nuxt.$store.state.roles) {
        if (
          $nuxt.$store.state.roles.indexOf("ec_read") >= 0 ||
          ($nuxt.$store.state.afiliado.affiliate &&
            $nuxt.$store.state.afiliado.affiliate.affiliateStatusID < 0)
        ) {
          return true;
        }
      }
      return false;
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

    canViewUserManagement() {
      return this.userPermissions.some(code => {
        return ROLES.USER_MANAGEMENT === code;
      });
    },

    canViewRegistrationData() {
      return this.userPermissions.some(code => {
        return ROLES.CADASTRAL_DATA === code;
      });
    }
  },

  methods: {
    ...mapActions({
      getBanks: "affiliate/getBanks"
    }),
    formatMoney(val) {
      return val.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
      });
    },
    formatNumber(val) {
      // console.log(val.toLocaleString("pt-BR"));
      return val.toLocaleString("pt-BR");
    },
    // uma função "getter" computada (computed getter)
    controleMobile(pp) {
      this.$nuxt.$emit("navMobileInternal", pp);
    },
    abreModalPai(id) {
      this.$nuxt.$emit("toggleModal", id);
    },
    alteraTabs(val) {
      this.$nuxt.$store.commit("updateTabDadosCadastrais", val);
      this.tabAtual = val.toLowerCase();
      this.minha_conta =
        this.tabAtual == this.text.minha_conta.toLowerCase() ? true : false;
      if (this.tabAtual == this.text.domicilio_bancario.toLowerCase()) {
        this.domicilio_bancario = true;
        this.tabAtiva.domicilio_bancario = true;
      } else {
        this.domicilio_bancario = false;
      }
      if (this.tabAtual == this.text.comprovantes.toLowerCase()) {
        this.comprovantes = true;
        this.tabAtiva.comprovantes = true;
      } else {
        this.comprovantes = false;
      }
      this.editar_cadastro =
        this.tabAtual == this.text.editar_cadastro.toLowerCase() ? true : false;
      this.alterar_senha =
        this.tabAtual == this.text.alterar_senha.toLowerCase() ? true : false;
      this.editar_foto =
        this.tabAtual == this.text.editar_foto.toLowerCase() ? true : false;
      this.editar_usuarios =
        this.tabAtual == this.text.editar_usuarios.toLowerCase() ? true : false;
      this.contrato =
        this.tabAtual == this.text.contrato.toLowerCase() ? true : false;
    }
  }
};
</script>

<style lang="less" scoped>
@import "~assets/vars.less";
@import "~assets/variables.less";

#tabsNav {
  padding: 0px;
  margin: 0;

  li {
    display: inline-block;
    font-size: @ftSizeLarge;
    color: @color10;
    padding: 5px 20px;
    border-bottom: 2px solid @color2;
    cursor: pointer;

    &.active {
      color: @color5;
    }

    &.disabled {
      opacity: 0.3;
      color: @color5;
      pointer-events: none;
    }

    &:hover {
      color: @color5;
    }

    &:hover {
      border-bottom: 2px solid @color5;
    }

    &.active {
      border-bottom: 2px solid @color5;
    }
  }
}
</style>
