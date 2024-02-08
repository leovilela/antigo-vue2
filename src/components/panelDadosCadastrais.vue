<template>
  <div>
    <component-panel-section>
      <component-profile slot="content"></component-profile>
    </component-panel-section>

    <component-panel-section v-if="$mq ==='mobile' || $mq === 'tablet'">
      <ul id="links" slot="content">
        <li class="minha_conta "><a v-on:click="alteraTabConteudo(text.minha_conta,'conteudo')" class="active">
            <div class="icone"></div><span>{{text.minha_conta}}</span>
          </a></li>
        <li class="domicilio_bancario"><a v-on:click="alteraTabConteudo(text.domicilio_bancario,'conteudo')">
            <div class="icone"></div><span>{{text.domicilio_bancario}}</span>
          </a></li>
        <li class="comprovantes"><a v-on:click="alteraTabConteudo(text.comprovantes,'conteudo')">
            <div class="icone"></div><span>{{text.comprovantes}}</span>
          </a></li>
        <li class="alterar_senhas"><a v-on:click="alteraTabConteudo(text.alterar_senha,'conteudo')">
            <div class="icone"></div><span>{{text.alterar_senha}}</span>
          </a></li>
        <!-- <li class="editar_usuarios"><a v-on:click="alteraTabConteudo(text.editar_usuarios,'conteudo')">
            <div class="icone"></div><span>{{text.editar_usuarios}}</span>
          </a></li> -->
        <!--li><a v-on:click="navegacao('conteudo')">{{text.editar_foto}}</a></li-->
      </ul>
    </component-panel-section>

    <component-panel-section :panelSectionTitle="text.title_comercial" :centeredTitle="true" v-if="user.nomeComercial">
      <table id="comercial" slot="content">
        <tr id="perfil">
          <td class="imagem"><div :style="{ backgroundImage: 'url('+imgDataUrl+')' }"></div></td>
          <td class="nome">{{user.nomeComercial}}</td>
        </tr>
        <tr id="contato">
          <table id="listaContatos">
            <tr class="email">
              <td><a :href="'mailto:'+user.emailComercial">{{user.emailComercial}}</a></td>
            </tr>
            <tr class="telefone" v-for="(item, index) in  user.telefoneComercial" :key="index">
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
    &.comprovantes {
      a {
        .icone {
          background: transparent url("~assets/img/ico-contrato-pq.png")
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
        // opacity: 0.3;
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

export default {
  data() {
    return {
      imgDataUrl: profileImage, // the datebase64 url of created image
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
        editar_cadastro: "Editar cadastro",
        alterar_senha: "Alterar senha",
        editar_foto: "Editar foto",
        noticias: "Notícias",
        simulacao: "Simulação",
        title_comercial: "Comercial",
        editar_usuarios: "Editar usuários",
        comprovantes: "Comprovantes",
      },
    };
  },

  mounted() {
    const self = this;
    self.$axios
      .get(
        `${process.env.API_AFFILIATE}/affiliates/responsible`,
      )
      .then((response) => {
        if (response.status == 200) {
          self.user.nomeComercial = response.data.fullName;
          self.user.emailComercial = response.data.email;
          self.user.idComercial = response.data.id;
          if (response.data.phones) {
            self.user.telefoneComercial = response.data.phones;
            self.user.telefoneComercial.map((tel) => {
            // eslint-disable-next-line no-return-assign
              const ddd = tel.value.slice(tel.value.indexOf("("), tel.value.indexOf(")") + 1);
              const telefone = tel.value.slice(4);// `${tel.value.slice(0, tel.value.indexOf(")") + 1)} ${tel.value.slice.indexOf(")") + 1}`;
              tel.value = `${ddd} ${telefone}`;
            });
          }
        }
      }).catch(err => console.log("Err:", err));

    this.urlUpload = `${process.env.API_AFFILIATE}/affiliates/files`;
    // this.urlUpload = "https://httpbin.org/post";

    if (self.user.idComercial !== null) {
      self.$axios.get(`${process.env.API_AFFILIATE}/affiliates/ProfilePictureUser?userId=${self.user.idComercial}`, { responseType: "arraybuffer" }).then((response) => {
        const image = btoa(
          new Uint8Array(response.data)
            .reduce((data, byte) => data + String.fromCharCode(byte), ""),
        );
        self.imgDataUrl = response.headers["content-type"] ? `data:${response.headers["content-type"].toLowerCase()};base64,${image}` : profileImage;
      }).catch((err) => { console.log("Err:", err); return false; });
    }
  },

  components: {
    "component-panel-section": panelSection,
    "component-profile": profile,
    "component-contato": panelContato,
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
