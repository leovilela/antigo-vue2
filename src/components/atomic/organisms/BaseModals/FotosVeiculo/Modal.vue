<template>
  <Base-Modal v-if="active" class="fotos-automovel">
    <template #header>
      <Base-Button @click="toCloseModal()" class="btn-modal-close"><i class="icon-cancel"></i></Base-Button>
    </template>
    <template #body>
      <div class="box-dropzone">
        <img src="~/assets/img/ico-foto.png" width="126" height="111px" alt="" />
        <h3 class="dropzone-custom-title">Fotos do Veículo</h3>
        <p class="dropzone-custom-subtitle">Envie as fotos seguindo o modelo abaixo:</p>
        <div class="dropzone-cars">
          <vue-dropzone id="dropzone" ref="onUploadPhotoDocument" :options="dropzoneOptions" :useCustomSlot="true" @vdropzone-file-added="onDocumentCar" @vdropzone-removed-file="onRemovedDocumentCar" @vdropzone-complete="afterComplete">
            <div class="dropzone-custom-content">
              <img src="~/assets/img/icon-document.png" width="130" height="123" alt="" />
              <Base-Button class="btn-enviar-foto">{{ typeModal.labelDocument }}</Base-Button>
            </div>
          </vue-dropzone>
          <vue-dropzone id="dropzone" ref="onUploadPhotoFront" :options="dropzoneOptions" :useCustomSlot="true" @vdropzone-file-added="onPhotoFrontCar" @vdropzone-removed-file="onRemovedPhotoFrontCar" @vdropzone-complete="afterComplete">
            <div class="dropzone-custom-content">
              <img src="~/assets/img/ico-foto-carro-dianteira.png" width="192" height="123" alt="" />
              <Base-Button class="btn-enviar-foto">Foto Perfil</Base-Button>
            </div>
          </vue-dropzone>
          <vue-dropzone id="dropzone" ref="onUploadPhotoBack" :options="dropzoneOptions" :useCustomSlot="true" @vdropzone-file-added="onPhotoBackCar" @vdropzone-removed-file="onRemovedPhotoBackCar" @vdropzone-complete="afterComplete">
            <div class="dropzone-custom-content">
              <img src="~/assets/img/ico-foto-carro-traseira.png" width="192" height="123" alt="" />
              <Base-Button class="btn-enviar-foto">Foto Traseira</Base-Button>
            </div>
          </vue-dropzone>
        </div>
      </div>
      <div class="error error-newcar" v-show="labelError !== false">{{ labelError }}</div>
      <div class="observacoes">
        <p><strong>OBSERVAÇÕES:</strong></p>
        <p>1. A placa do carro deve estar legível em ambas as fotos do veículo.</p>
        <p>2. As informações do documento do carro devem estar legíveis.</p>
      </div>
    </template>
    <template #footer>
      <Base-Button
        class="btn-modal-continuar"
        aria-label="Enviar Fotos"
        @click="processFilesReport()"
      >
        ENVIAR FOTOS
      </Base-Button>
    </template>
  </Base-Modal>
</template>

<script>
import vue2Dropzone from "vue2-dropzone";
import { mapActions, mapState, mapMutations } from "vuex";

export default {
  components: {
    vueDropzone: vue2Dropzone,
  },
  props: {
    active: {
      type: Boolean,
      default: false,
    },
    isNewCar: {
      type: Boolean,
      default: false,
    },
    contractId: {
      type: [String, Number],
    },
  },
  data() {
    return {
      dropzoneOptions: {
        url: "/",
        maxFilesize: 6, // MB
        thumbnailWidth: 200,
        maxFiles: 1,
        thumbnailMethod: "contain",
        addRemoveLinks: true,
        dictRemoveFile: "Remover arquivo",
        autoProcessQueue: true,
        acceptedFiles: "image/jpeg,image/png",
        dictInvalidFileType: "Você não pode carregar arquivos desse tipo.",
        method: "PUT"
      },
      files: {
        documentCar: null,
        photoFrontCar: null,
        photoBackCar: null,
      },
      client: {},
      labelError: false,
    };
  },
  methods: {
    ...mapActions({
      getDocumentType: "simulacao/relatorio/getDocumentType",
    }),
    ...mapMutations(["startLoading", "finishLoading"]),
    async loadDocumentsType() {
      try {
        await this.getDocumentType();
      } catch (error) {
        console.warn({ error });
      }
    },
    afterComplete(){
      console.info('upload ok');
    },
    async uploadFilesReport(file, type, contractId) {
      try {
        this.startLoading();
        await this.$services.upload.uploadFilesReport(file, type, contractId);
      } catch (error) {
        console.warn(error);
      }
      this.finishLoading();
    },
    onDocumentCar(file) {
      this.files.documentCar = file;
    },
    onPhotoFrontCar(file) {
      this.files.photoFrontCar = file;
    },
    onPhotoBackCar(file) {
      this.files.photoBackCar = file;
    },
    onRemovedDocumentCar() {
      this.files.documentCar = null;
    },
    onRemovedPhotoFrontCar() {
      this.files.photoFrontCar = null;
    },
    onRemovedPhotoBackCar() {
      this.files.photoBackCar = null;
    },
    async processFilesReport() {
      if (!this.isNewCar) {
        if (this.files.documentCar !== null && this.files.photoFrontCar !== null && this.files.photoBackCar !== null) {
          await this.uploadFilesReport(this.files.documentCar, 5, this.clientContractID);
          await this.uploadFilesReport(this.files.photoFrontCar, 6, this.clientContractID);
          await this.uploadFilesReport(this.files.photoBackCar, 7, this.clientContractID);
          this.$emit("toClose");
        } else {
          this.labelError = "As 3 fotos são obrigatórias";
        }
      }

      if (this.isNewCar) {
        if (this.files.documentCar !== null) {
          await this.uploadFilesReport(this.files.documentCar, 5, this.clientContractID);
          if (this.files.photoFrontCar !== null && this.files.photoBackCar !== null) {
            await this.uploadFilesReport(this.files.photoFrontCar, 6, this.clientContractID);
            await this.uploadFilesReport(this.files.photoBackCar, 7, this.clientContractID);
          }
          this.$emit("toClose");
        } else {
          this.labelError = "Foto da Nota Fiscal do Veículo é obrigatória";
        }
      }
    },
    toCloseModal() {
      this.$emit("toClose");
      this.labelError = false;
    },
  },
  mounted() {
    this.loadDocumentsType();
  },
  computed: {
    ...mapState({
      documentsType: state => state.simulacao.relatorio.documentsType,
    }),
    clientDocumentNumber() {
      return this.documentNumber;
    },
    clientContractID() {
      return this.contractId;
    },
    typeModal() {
      if (this.isNewCar) {
        return {
          labelDocument: "Nota fiscal do Veículo",
        };
      }
      return {
        labelDocument: "Documento do Veículo",
      };
    },
  },
};
</script>

<style lang="less" >
@import "~assets/vars.less";
@import "vue2-dropzone/dist/vue2Dropzone.min.css";
  .fotos-automovel {
  position: relative;
  .modal {
    width: 100%;
  }
  .vue-dropzone {
    width: auto;
    border: none;
  }

  .box-dropzone {
    align-items: center;
    flex-direction: column;
    display: flex;
  }

  #dropzone {
    width: 250px;
    background-color: @color2;
    color: @color5;
  }

  #dropzone .dz-preview .dz-details {
    color: @color2;
    background-color: @color1;
  }

  .dropzone-custom-title {
    font-family: 'newjunebold';
    font-size: @ftBigTitSize;
    margin: 20px 0 0 0;
  }

  .dropzone-custom-subtitle {
    font-family: 'newjuneregular';
    font-size: @ftSizeLarge;
    margin: 0 0 20px 0;
  }

  .dropzone-items {
    display: flex;
  }

  .dropzone-cars {
    justify-content: space-around;
    display: flex;
  }

  .dropzone .dz-message {
    margin: 0;
  }

  .observacoes {
    text-align: left;
  }

  .btn-enviar-foto {
    font-family: 'newjunebold';
    font-size: @ftSizeSmall;
    color: @color2;
    background: @color1;
    margin-top: 30px;
    text-transform: uppercase;
  }

  .btn-modal-close {
    width: auto;
    font-size: @ftBigTitSize;
    color: @color1;
    background: transparent;
    border: none;
    position: absolute;
    top: 0;
    right: 0;
  }
  .error {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 16px;
    color: #856404;
    background-color: #fff3cd;
    border-color: #ffeeba;
    padding: 15px;
  }
  .vue-dropzone>.dz-preview .dz-error-message {
    margin-left: auto;
    margin-right: auto;
    left: 0;
    width: 100%;
    text-align: center;
    top: 0;
  }
}
</style>
