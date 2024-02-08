<template>
  <section class="base-user-container">
    <Base-UserDataGroup
      :id="userData.id"
      :picture="userPicture"
      :name="affiliate.simpleName"
      :user="userData.user"
      @onAlterPassword="onAlterPassword"
      @onAlterPicture="onAlterPicture"
    />
    <VueImageCropUpload
      @crop-success="onCropSuccess"
      @crop-upload-success="onCropUploadSuccess"
      @crop-upload-fail="onCropUploadFail"
      field="file"
      v-model="showImageUploader"
      :width="150"
      :height="150"
      :url="uploadUrl"
      :noSquare="true"
      :params="params"
      :headers="headers"
      :lang-ext="imageUploadLang"
      img-format="png"
    />
    <Base-CommercialGroup
      :name="responsibleForUser.name"
      :email="responsibleForUser.email"
      :phone="responsibleForUser.phone"
    />
    <Base-DadosListo />
    <Base-UserSupport @onTalkToList="onTalkToListo" @onRemoteSupport="onRemoteSupport"/>
  </section>
</template>

<script>
import { createNamespacedHelpers, mapState, mapMutations } from "vuex";
import VueImageCropUpload from "vue-image-crop-upload";
import { SET_AFFILIATE_PICTURE } from "~/store/affiliate/mutations";
import profileImage from "~/assets/img/profile.jpg";

const {
  mapState: affiliateState,
  mapActions: affiliateActions,
  mapMutations: affiliateMutations
} = createNamespacedHelpers("affiliate");

const {
  mapState: authState,
  mapGetters: authGetters
} = createNamespacedHelpers("auth");

const LABEL_ALTER_PASSWORD = "Alterar senha";
const EMIT_CHANGE_TAB_REGISTRATION_DATA = "trocaTab";

export default {
  computed: {
    ...affiliateState(["affiliate", "responsible", "picture"]),
    ...authState(["user"]),
    ...authGetters(["getToken"]),
    ...mapState(["tabDadosCadastrais"]),
    userData() {
      return {
        id: this.user.id || 0,
        user: this.user.username || ""
      };
    },
    userPicture() {
      return {
        source: this.picture || "",
        alt: `Imagem cliente ${this.affiliate.id}`
      };
    },
    responsibleForUser() {
      return {
        name: this.responsible.fullName || "",
        email: this.responsible.email || "",
        phone: this.responsible.phones ? this.responsible.phones[0].value : ""
      };
    }
  },
  data() {
    return {
      uploadUrl: `${process.env.API_AFFILIATE}/affiliates/files`,
      headers: {
        authorization: null
      },
      params: {
        token: "",
        type: 5
      },
      showImageUploader: false,
      imageUploadLang: {
        hint: "Clique ou arraste a foto aqui para enviar",
        loading: "Enviando...",
        noSupported: "Navegador não suportado",
        success: "Imagem carregada com sucesso",
        fail: "Falha no envio da imagem",
        preview: "Pré-visualizar",
        btn: {
          off: "Cancelar",
          close: "Fechar",
          back: "Voltar",
          save: "Salvar"
        },
        error: {
          onlyImg: "Apenas imagens",
          outOfSize: "Limite de tamanho excedido",
          lowestPx: "Imagem muito pequena. Mínimo: "
        }
      }
    };
  },
  components: {
    VueImageCropUpload
  },
  mounted() {
    this.getResponsible();
    this.headers.authorization = this.getToken;
    this.params.token = `${this.user.id}_${this.user.username}`;
  },
  methods: {
    ...affiliateActions(["getResponsible"]),
    ...affiliateMutations({
      setAffiliatePicture: SET_AFFILIATE_PICTURE
    }),
    ...mapMutations(["updateTabDadosCadastrais", "pictureLoad"]),
    onAlterPassword() {
      this.updateTabDadosCadastrais(LABEL_ALTER_PASSWORD);
      this.$nuxt.$emit(
        EMIT_CHANGE_TAB_REGISTRATION_DATA,
        this.tabDadosCadastrais
      );
      this.$router.push("/meus-dados-cadastrais");
    },
    onAlterPicture() {
      this.showImageUploader = true;
    },
    onCropSuccess(imageDataUrl) {
      this.pictureLoad(imageDataUrl);
      this.setAffiliatePicture(imageDataUrl);
    },
    onCropUploadSuccess() {
      this.showImageUploader = false;
    },
    onCropUploadFail() {
      setTimeout(() => {
        this.showImageUploader = false;
      }, 2500);
      this.pictureLoad(profileImage);
      this.setAffiliatePicture(profileImage);
    },
    onTalkToListo() {
      this.$nuxt.$emit("toggleModal", {
        api: "faleComigo",
        modalContent: ""
      });
    },
    onRemoteSupport() {
      window.open("https://get.teamviewer.com/listofacil_acessoremoto", "_blank", "location=yes,height=570,width=520,scrollbars=yes,status=yes");
    }
  }
};
</script>

<style scoped lang="less">
  @import "./style.less";
</style>
