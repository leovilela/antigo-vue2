<template>
  <div>
    <component-panel-section>
      <component-profile slot="content"></component-profile>
    </component-panel-section>

    <component-panel-section v-if="$mq ==='mobile' || $mq === 'tablet'">
      <ul id="links" slot="content">
        <li class="minha_conta "><a v-on:click="alteraTabConteudo(text.minha_conta,'conteudo')" class="active">
            <div class="icone"></div><span>{{text.simulador}}</span>
          </a></li>
        <!--li><a v-on:click="navegacao('conteudo')">{{text.editar_foto}}</a></li-->
      </ul>
    </component-panel-section>

    <component-panel-section :panelSectionTitle="text.title_comercial" :centeredTitle="true" v-if="responsible">
      <table id="comercial" slot="content">
        <tr id="perfil">
          <td class="imagem"><div :style="{ backgroundImage: 'url('+imgDataUrl+')' }"></div></td>
          <td class="nome">{{responsible.fullName}}</td>
        </tr>
        <tr id="contato">
          <table id="listaContatos">
            <tr class="email">
              <td><a :href="'mailto:'+responsible.email">{{responsible.email}}</a></td>
            </tr>
            <tr class="telefone" v-for="item in  responsible.phones" :key="item.id">
              <td>{{item.value}}</td>
            </tr>
          </table>
        </tr>
      </table>
    </component-panel-section>

    <component-panel-section :class="{ noPadding: true }">
      <component-contato slot="content"></component-contato>
    </component-panel-section>
  </div>

</template>

<style lang="less" scoped>
@import "~assets/vars.less";
@import "~assets/variables.less";
#links {
  list-style-type: none;
  padding: 0;
  text-align: left;
  margin: 0 20px;

  li {
    &.minha_conta {
      a {
        .icone {
          background: transparent url("~assets/img/ico_minhaconta.png")
            no-repeat scroll 0px 0px;
          background-size: contain;
        }
      }
    }
    &.domicilio_bancario {
      a {
        .icone {
          background: transparent url("~assets/img/ico_domiciliobancario.png")
            no-repeat scroll 0px 0px;
          background-size: contain;
        }
      }
    }
    &.editar_dados {
      a {
        .icone {
          background: transparent url("~assets/img/ico_editar.png") no-repeat
            scroll 0px 0px;
          background-size: contain;
        }
      }
    }
    &.alterar_senhas {
      a {
        .icone {
          background: transparent url("~assets/img/ico_altera-senha.png")
            no-repeat scroll 0px 0px;
          background-size: contain;
        }
      }
    }
    a {
      color: @color10;
      font-family: @mainFontRegular;
      font-size: @ftSizeLarge;

      span {
        position: relative;
        top: -12px;
      }

      &:hover {
        text-decoration: none;
        user-select: none;
        color: @color5;
        .icone {
          opacity: 1;
        }
      }

      .icone {
        display: inline-block;
        width: 40px;
        height: 40px;
        background-color: red;
        margin-right: 15px;
        opacity: 0.3;
      }

      &.active {
        text-decoration: none;
        user-select: none;
        color: @color5;
        .icone {
          opacity: 1;
        }
      }
    }
  }
}

#comercial {
  display: block;
  width: 100%;

  #perfil, #contato {
    display: inline-block;
    width: 100%;
  }

  #perfil {
    .imagem, .nome {
      display: inline-block;
      vertical-align: middle;
    }

    .imagem {
      height: 40px;
      text-align: right;
      width: 20%;
      max-width: 40px;

      div {
        background-size: cover;
        background-repeat: no-repeat;
        background-position: 50% 50%;
        border-radius: 100%;
        width: 100%;
        height: 100%;
        // margin-right: 10px;
      }
    }

    .nome {
      // font-weight: bold;
      width: 55%;
    }
  }

  #contato {
    margin-top: 10px;
    #listaContatos {
      width: 100%;
      display: block;

      .email, .telefone {
        display: inline-block;
        width: 100%;

        & > td {
          display: block;
          width: 100%;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }
      }
    }
  }
}
</style>

<script>
import panelSection from "~/components/leftPanelSection.vue";
import profile from "~/components/leftPanelProfile.vue";
import panelContato from "~/components/leftPanelContato.vue";
import profileImage from "~/assets/img/profile.jpg";
import {createNamespacedHelpers} from 'vuex';

const { mapState: affiliateState } = createNamespacedHelpers('affiliate')

export default {
  data() {
    return {
      imgDataUrl: profileImage,
      user: {
        name: null,
        email: null,
        company: null,
        nomeComercial: null,
        telefoneComercial: null,
        emailComercial: null,
        imageComercial: null,
        image: null,
        idComercial: null,
      },
      text: {
        minha_conta: "Minha conta Listo",
        domicilio_bancario: "Domicílio bancário",
        simulador: "Simulador Listo",
        editar_cadastro: "Editar cadastro",
        alterar_senha: "Alterar senha",
        editar_foto: "Editar foto",
        noticias: "Notícias",
        simulacao: "Simulação",
        title_comercial: "Comercial",
        editar_usuarios: "Editar usuários",
      },
    };
  },

  mounted() {
    if (this.responsible.picture) {
      this.imgDataUrl = this.responsible.picture
    }
  },

  components: {
    "component-panel-section": panelSection,
    "component-profile": profile,
    "component-contato": panelContato,
  },
  computed: {
    ...affiliateState(['responsible'])
  },
  watch: {
    "responsible.picture"(value, newValue) {
      this.imgDataUrl = newValue
    }
  },
  methods: {
    navegacao(pp) {
      // this.$nuxt.$emit("navMobileInternal", pp);
    },
    abreModalPai(id) {
      this.$nuxt.$emit("toggleModal", id);
    },
    alteraTabConteudo(tab, pp) {
      this.$nuxt.$emit("trocaTab", tab);
      this.$nuxt.$emit("navMobileInternal", pp);
    },
  },
};
</script>
