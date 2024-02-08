<template>
    <div id="profile">
        <div id="profilePicture" :style="{ backgroundImage: 'url('+imgDataUrl+')'  }" ><a class="btn" @click="toggleImageUploader" v-show="!getReadOnly">alterar foto</a> </div>
        <h3 id="profileCompany">{{ user.id }}</h3>
        <p id="profileName">{{ user.username }}</p>

        <my-upload field="file"
            @crop-success="cropSuccess"
            @crop-upload-success="cropUploadSuccess"
            @crop-upload-fail="cropUploadFail"
        v-model="showImageUploader"
        :width="150"
        :height="150"
        :lang-ext="imageUploadLang"
        type="ProfilePicture"
        :url="urlUpload"
        :noSquare="true"
        :params="params"
        :headers="headers"
        img-format="png"></my-upload>

    </div>
</template>

<style lang="less" scoped>
    @import "~assets/vars.less";
    @import "~assets/variables.less";
    #profile {
      #profilePicture {
        background-size: cover;
        background-repeat: no-repeat;
        background-position: 50% 50%;
        width: 150px;
        height: 150px;
        display: inline-block;
        border: 4px solid @color20;
        border-radius: 100%;
        position: relative;
      }

      #profileName,
      #profileEmail,
      #profileCompany {
        margin: 5px 0;
        // line-height: 20px;
      }

      #profileCompany {
        color: @color12;
        font-size: @ftSizeLarge;
        font-family: @mainFontRegular;
      }

      #profileName {
        color: @color3;
        font-size: @ftSizeSmall;
        font-family: @mainFont;
      }

      .btn{
        position: absolute;
        bottom: -10px;
        display: inline-block;
        right: 0px;
        background-color: @color20;
        color: @color2;
        padding:3px;
        border-radius: 10%;
      }
    }
</style>

<script>
import { mapState } from "vuex";
import myUpload from "vue-image-crop-upload";
import profileImage from "~/assets/img/profile.jpg";

export default {
  data() {
    return {
      readonly: false,
      user: {
        id: null,
        username: null,
        image: profileImage,
      },
      showImageUploader: false,
      params: {
        token: `${$nuxt.$store.state.usuario.clientID}_${$nuxt.$store.state.usuario.userName}`,
        type: 5,
      },
      urlUpload: "",
      imgDataUrlCropped: "",
      headers: {
        smail: "*_~",
        authorization: null,
      },
      imgDataUrl: "", // the datebase64 url of created image
      imageUploadLang: {
        hint: "Clique ou arraste a foto aqui para enviar", // "Click or drag the file here to upload",
        loading: "Enviando...", // "Uploading…",
        noSupported: "Navegador não suportado", // "Browser is not supported, please use IE10+ or other browsers",
        success: "Imagem carregada com sucesso", // "Upload success",
        fail: "Falha no envio da imagem", // "Upload failed",
        preview: "Pré-visualizar", // "Preview",
        btn: {
          off: "Cancelar", // "Cancel",
          close: "Fechar", // "Close",
          back: "Voltar", // "Back",
          save: "Salvar", // "Save",
        },
        error: {
          onlyImg: "Apenas imagens", // "Image only",
          outOfSize: "Limite de tamanho excedido", // "Image exceeds size limit: ",
          lowestPx: "Imagem muito pequena. Mínimo: ", // "Image's size is too low. Expected at least: ",
        },
      },
    };
  },
  
  mounted() {      
    if (this.auth.accessToken) {
      this.headers.authorization = `Bearer ${this.auth.accessToken}`;
    } else {
      this.headers.authorization = "";
    }

    this.urlUpload = `${process.env.API_AFFILIATE}/affiliates/files`;    
    this.user.id = this.usuario.clientID;
    this.user.username = this.usuario.userName;

    this.imgDataUrl = this.pictureUrl;
  },

  computed: {
    ...mapState({
      auth: state => state.auth,
      afiliado: state => state.afiliado,
      roles: state => state.roles,
      usuario: state => state.usuario,
      pictureUrl: state => state.pictureUrl,
    }),
    getReadOnly() {      
      if(!this.afiliado.affiliate || this.afiliado.affiliate.affiliateStatusID == 0) {
         this.$router.push("/meus-dados-cadastrais", () => {});
      }
      if (this.roles.indexOf("ec_read") >= 0 || (this.afiliado.affiliate && this.afiliado.affiliate.affiliateStatusID < 0)) {        
        return true;
      }      
      return false;
    },
  },

  components: {
    "my-upload": myUpload,
  },
  methods: {
    toggleImageUploader() {
      this.showImageUploader = !this.showImageUploader;
    },
    cropSuccess(imgDataUrl, field) {      
      this.imgDataUrlCropped = imgDataUrl;
    },    
    cropUploadSuccess(data, field, key) {
      setTimeout(() => {
        this.toggleImageUploader();
      }, 1500);
      this.imgDataUrl = this.imgDataUrlCropped;
    
    },
    cropUploadFail(status, field) {
      setTimeout(() => {
        this.toggleImageUploader();
      }, 1500);
    },
  },

};
</script>
