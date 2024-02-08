<template>
  <!-- <div id="file-upload" :class="{'form-no-edit': sendingFile || (isEnabled != undefined && isEnabled == false), class: documentType}"> -->
  <div id="file-upload" :class="{'form-no-edit': sendingFile || (isEnabled != undefined && isEnabled == false)}">
    <!-- <p>submitStatus {{submitStatus}}</p> -->
    <fieldset class="file-upload-field form-group">

      <legend v-if="documentType == 'Identification'">{{text.identification}}</legend>
      <legend v-if="documentType == 'AddressCheck'">{{text.addressCheck}}</legend>
      <legend v-if="documentType == 'FinancialCheck'">{{text.financialCheck}}</legend>
      <legend v-if="documentType == 'EquipmentSerialNumber'">{{text.equipmentSerialNumber}}</legend>
      <legend v-if="documentType == 'CPFCheck'">{{text.cpfCheck}}</legend>
      <legend v-if="documentType == 'CNPJCheck'">{{text.cnpjCheck}}</legend>
      <legend v-if="documentType == 'SocialContract'">{{text.socialContract}}</legend>
      <legend v-if="documentType == 'BusinessCard'">{{text.businessCard}}</legend>

      <form id="file-upload-form" enctype="multipart/form-data">
        <input type="file" id="fileUploadInput" :class="[documentType]" :disabled="sendingFile" :accept="acceptedFileExtensions" @change="validateFile($event)">

        <span v-if="sendingFile">{{text.enviando}}</span>
        <div class="form-success">
          <span v-if="submitStatus == 201">{{text.enviadoSucesso}}</span>
        </div>
        <div class="form-invalid">
          <span v-if="emptyFile">{{text.envieArquivo}}</span>
          <span v-else-if="submitStatus == 204">{{text.erro204}}</span>
          <span v-else-if="submitStatus == 400">{{text.erro400}}</span>
          <span v-else-if="submitStatus == 401">{{text.erro401}}</span>
          <span v-else-if="submitStatus == 415">{{text.erro415}}</span>
          <span v-else-if="submitStatus == 500">{{text.erro500}}</span>
        </div>

      </form>

    </fieldset>
  </div>

</template>

<script>
/* eslint-disable vue/valid-v-bind */

export default {
  props: {
    documentType: {
      type: String,
      required: true,
    },
    isEnabled: {
      type: Boolean,
      required: false,
    },
  },
  data() {
    return {
      text: {
        enviadoSucesso: "Arquivo enviado",
        erro204: "Não foi possível encontrar o cadastro",
        erro400: "Não foi possível salvar o arquivo",
        erro401: "Não foi possível salvar o arquivo",
        erro415: "Formato de arquivo não suportado",
        erro500: "Erro ao conectar o servidor",
        envieArquivo: "Por favor, selecione um arquivo",
        enviando: "Enviando...",
        identification: "Identificação",
        addressCheck: "Endereço",
        financialCheck: "Domicílio bancário",
        equipmentSerialNumber: "Serial do equipamento",
        cpfCheck: "Situação cadastral CPF",
        cnpjCheck: "Situação cadastral CNPJ",
        socialContract: "Contrato social",
        businessCard: "Cartão de visita",
      },
      selectedFile: null,
      sendingFile: false,
      acceptedFileExtensions: [
        "image/png",
        "image/jpeg",
        "image/gif",
        "application/pdf",
        // "application/msword",
        // "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        // "application/vnd.ms-excel",
        // "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      ],
      submitStatus: null,
      emptyFile: false,
      validFile: false,
    };
  },
  methods: {
    // upload files
    async uploadFile(file) {
      const name = file.name; // recebe o nome do arquivo enviado
      const nameNoExtension = name.substr(0, name.lastIndexOf(".")); // armazena o nome do arquivo sem extensão
      this.selectedFile = nameNoExtension; // atribui o nome sem extensão a variável local

      this.sendingFile = true;
      this.submitStatus = null;

      try {
        const response = await this.$services.upload.uploadFile(file, this.documentType);
        this.$store.commit("setComprovanteState", {
          status: true,
          type: this.documentType,
        });
        this.sendingFile = false;
      } catch (error) {
        console.log(error);
        this.sendingFile = false;
        this.submitStatus = error.response.status;
      }
    },

    // validates file and format
    validateFile(ev) {
      // console.log(ev);
      const self = this;

      self.submitStatus = null;

      const filesList = ev.target.files;

      if (filesList.length > 0) {
        if (self.acceptedFileExtensions.indexOf(filesList[0].type) >= 0) {
          self.validFile = true;
          self.uploadFile(filesList[0]);
        } else {
          self.validFile = false;
          self.submitStatus = 415;
        }
      } else {
        self.$nuxt.$store.commit("setComprovanteState", {
          status: false,
          type: self.documentType,
        });
      }
    },
  },
  computed: {
    isValidFile() {
      return this.validFile ? true : false;
    },
  },
  created() {
    const self = this;

    self.$nuxt.$on("removerComprovante", () => {
      self.submitStatus = null;
      self.selectedFile = null;
      self.emptyFile = false;
      self.validFile = false;
      self.sendingFile = false;

      const fieldset = Array.from(self.$el.childNodes).filter(cn => cn.classList && cn.classList.contains("file-upload-field"))[0];

      const form = Array.from(fieldset.childNodes).filter(cn => cn.id == "file-upload-form")[0];

      form.reset();
    });
  },
};
</script>

<style lang="less">
#file-upload {
  overflow: hidden;
  min-height: 90px;

  #fileUploadInput {
    margin-bottom: 8px;
  }
}

</style>
