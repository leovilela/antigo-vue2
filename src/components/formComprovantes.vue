<template>

  <div id="formComprovantes" class="container-fluid">

    <!-- AVISO SOBRE IMPLEMENTAÇÃO -->
    <!-- <div class="alert alert-danger"><strong>ATENÇÃO</strong><br>Área sendo implementada!!</div> -->

    <!-- <p>{{files}}</p> -->
    <!-- <p v-for="(item, key, index) in $v.files" :key="index">{{key}}: {{item}}</p> -->
    <!-- <p v-for="(item, key, index) in errorMsg" :key="index">{{key}}: {{item}}</p> -->
    <!-- <p>{{uploadedFiles}}</p> -->
    <!-- <p>{{savedDocuments}}</p> -->

    <!-- <p>{{exchangeRequest}}</p> -->
    <!-- <p>{{$v}}</p> -->

    <!-- <p>errorMsg {{errorMsg}}</p> -->
    <!-- <p>validateForm {{validateForm}}</p> -->

    <div class="cpf-documents row" v-if="!loading && !submit && affiliateStatusID == 0 && affiliationType == 1">
      <div class="col-xs-6" :class="{'form-invalid': validateForm == false && $v.files.AddressCheck.$invalid}">
        <file-upload :isEnabled="true" :documentType="'AddressCheck'" @change.native="addFileToList($event)"></file-upload>
      </div>
      <div class="col-xs-6" :class="{'form-invalid': validateForm == false && $v.files.FinancialCheck.$invalid}">
        <file-upload :isEnabled="true" :documentType="'FinancialCheck'" @change.native="addFileToList($event)"></file-upload>
      </div>
      <div class="col-xs-6" :class="{'form-invalid': validateForm == false && $v.files.CPFCheck.$invalid}">
        <file-upload :isEnabled="true" :documentType="'CPFCheck'" @change.native="addFileToList($event)"></file-upload>
      </div>
      <div class="col-xs-6" :class="{'form-invalid': validateForm == false && $v.files.Identification.$invalid}">
        <file-upload :isEnabled="true" :documentType="'Identification'" @change.native="addFileToList($event)"></file-upload>
      </div>
      <div class="col-xs-6" :class="{'form-invalid': validateForm == false && $v.files.EquipmentSerialNumber.$invalid}">
        <file-upload :isEnabled="true" :documentType="'EquipmentSerialNumber'" @change.native="addFileToList($event)"></file-upload>
      </div>
      <div class="col-xs-6">
        <file-upload :isEnabled="true" :documentType="'BusinessCard'" @change.native="addFileToList($event)"></file-upload>
      </div>
    </div>

    <div class="cnpj-documents row" v-if="!loading && !submit && affiliateStatusID == 0 && affiliationType == 2">
      <div class="col-xs-6" :class="{'form-invalid': validateForm == false && $v.files.AddressCheck.$invalid}">
        <file-upload :isEnabled="true" :documentType="'AddressCheck'" @change.native="addFileToList($event)"></file-upload>
      </div>
      <div class="col-xs-6" :class="{'form-invalid': validateForm == false && $v.files.FinancialCheck.$invalid}">
        <file-upload :isEnabled="true" :documentType="'FinancialCheck'" @change.native="addFileToList($event)"></file-upload>
      </div>
      <div class="col-xs-6" :class="{'form-invalid': validateForm == false && $v.files.CNPJCheck.$invalid}">
        <file-upload :isEnabled="true" :documentType="'CNPJCheck'" @change.native="addFileToList($event)"></file-upload>
      </div>
      <div class="col-xs-6" :class="{'form-invalid': validateForm == false && $v.files.SocialContract.$invalid}">
        <file-upload :isEnabled="true" :documentType="'SocialContract'" @change.native="addFileToList($event)"></file-upload>
      </div>
      <div class="col-xs-6" :class="{'form-invalid': validateForm == false && $v.files.Identification.$invalid}">
        <file-upload :isEnabled="true" :documentType="'Identification'" @change.native="addFileToList($event)"></file-upload>
      </div>
      <div class="col-xs-6" :class="{'form-invalid': validateForm == false && $v.files.EquipmentSerialNumber.$invalid}">
        <file-upload :isEnabled="true" :documentType="'EquipmentSerialNumber'" @change.native="addFileToList($event)"></file-upload>
      </div>
      <div class="col-xs-6">
        <file-upload :isEnabled="true" :documentType="'BusinessCard'" @change.native="addFileToList($event)"></file-upload>
      </div>
    </div>

    <div class="row form-section" v-if="!loading && !submit && affiliateStatusID == 0">
      <!-- <div class="col-xs-12" v-if="affiliateStatusID != 0 && (exchangeRequest.contact != null || exchangeRequest.bank != null)">
        <div class="alert alert-danger">{{text.solicitacoes_pendentes}}</div>
      </div> -->
      <div class="col-xs-12 form-button form-group pull-right">
        <button @click="sendFiles($event.target)">{{text.enviar}}</button>
      </div>
    </div>
    <div class="row form-group" v-if="validateForm == false">
      <div class="alert alert-danger" v-if="errorMsg.length > 0">
        <p>Favor enviar ou preencher os seguintes dados/comprovantes</p>
        <ul>
          <li v-for="(item, key, index) in errorMsg" :key="index">{{item}}</li>
        </ul>
      </div>
    </div>
    <!-- <div class="row form-group" v-if="validateForm == false">
      <div class="alert alert-danger">Envie todos os comprovantes necessários.</div>
    </div> -->

    <div class="row form-group form-section" v-if="!loading && submit">
      <div class="alert alert-success">{{text.analise}}</div>
    </div>

    <div class="row" v-if="!loading" :class="{'form-no-edit': sendingFile}">
      <table-files-list :filesList="uploadedFiles"></table-files-list>
    </div>

    <div class="row loading" v-show="loading">
      <div class="col-xs-12 loadImage" style="text-align: center;">
        <img src="~assets/img/loading.gif" alt="Carregando">
      </div>
    </div>
  </div>

</template>

<script>
import { required, requiredIf, requiredUnless } from "vuelidate/lib/validators";
import fileUpload from "./fileUpload.vue";
import tableFilesList from "./affiliateFileList.vue";

export default {
  data() {
    return {
      affiliationType: null,
      affiliateStatusID: null,
      exchangeRequest: {
        affiliate: null,
        contact: null,
        bank: null,
      },
      loading: true,
      files: {
        AddressCheck: {
          name: null,
          type: null,
          documentType: null,
        },
        FinancialCheck: {
          name: null,
          type: null,
          documentType: null,
        },
        Identification: {
          name: null,
          type: null,
          documentType: null,
        },
        CNPJCheck: {
          name: null,
          type: null,
          documentType: null,
        },
        SocialContract: {
          name: null,
          type: null,
          documentType: null,
        },
        EquipmentSerialNumber: {
          name: null,
          type: null,
          documentType: null,
        },
        CPFCheck: {
          name: null,
          type: null,
          documentType: null,
        },
      },
      savedDocuments: {
        AddressCheck: false,
        FinancialCheck: false,
        Identification: false,
        CNPJCheck: false,
        SocialContract: false,
        EquipmentSerialNumber: false,
        CPFCheck: false,
      },
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
      submit: false,
      sendingFile: false,
      errorMsg: [],
      text: {
        enviar: "Enviar para análise",
        analise: "Arquivos enviados com sucesso.",
        solicitacoes_pendentes: "Você possui solicitações pendentes de aprovação.",
        document: "Identificação",
        addressCheck: "Endereço",
        financialCheck: "Domicílio Bancário",
        equipmentSerialNumber: "Serial do Equipamento",
        cpfCheck: "Situação Cadastral CPF",
        cnpjCheck: "Situação Cadastral CNPJ",
        socialContract: "Contrato Social",
        businessCard: "Cartão de Visita",
        error: {
          status0: {
            FullName: "Razão social",
            SimpleName: "Nome fantasia",
            BirthDate: "Data de Nascimento",
            Document: "RG/CNH",
            BankID: "Nome do banco",
            Agency: "Agência bancária",
            Account: "Conta bancária",
            AddressPostalCode: "CEP",
            AddressNumber: "Número",
            CityID: "",
            EquipmentList: "Equipamentos",
            FileList: "Comprovantes",
            File_Identification: "Comprovante de identificação",
            File_AddressCheck: "Comprovante de endereço",
            File_FinancialCheck: "Comprovante de domicílio bancário",
            File_EquipmentSerialNumber: "Foto do serial do equipamento",
            File_CPFCheck: "Situação cadastral CPF",
            File_SocialContract: "Comprovante do contrato social",
            File_CNPJCheck: "Situação cadastral CNPJ",
          },
          status1: {
            FullName: "Nome completo",
            SimpleName: "Nome fantasia",
            BirthDate: "Data de Nascimento",
            Document: "RG/CNH",
            BankID: "Nome do banco",
            Agency: "Agência bancária",
            Account: "Conta bancária",
            AddressPostalCode: "CEP",
            AddressNumber: "Número",
            CityID: "",
            EquipmentList: "Equipamentos",
            FileList: "Comprovantes",
            File_Identification: "Comprovante de identificação",
            File_AddressCheck: "Comprovante de endereço",
            File_FinancialCheck: "Comprovante de domicílio bancário",
            File_EquipmentSerialNumber: "Foto do serial do equipamento",
            File_CPFCheck: "Situação cadastral CPF",
            File_SocialContract: "Comprovante do contrato social",
            File_CNPJCheck: "Situação cadastral CNPJ",
          },

        },
      },
      uploadedFiles: [],
      validateForm: null,
    };
  },
  components: {
    fileUpload,
    tableFilesList,
  },
  mounted() {
    const self = this;

    self.$axios.get(`${process.env.API_AFFILIATE}/affiliates`).then((response) => {
      self.affiliationType = response.data.affiliationTypeID;
      self.affiliateStatusID = response.data.affiliateStatusID;
      self.exchangeRequest.affiliate = response.data.exchangeRequest;

      self.$axios.get(`${process.env.API_AFFILIATE}/affiliates/contacts`).then((response) => {
        self.exchangeRequest.contact = response.data[0].exchangeRequest;

        self.$axios.get(`${process.env.API_AFFILIATE}/affiliates/banks`).then((response) => {
          self.exchangeRequest.bank = response.data[0].exchangeRequest;

          self.$axios.get(`${process.env.API_AFFILIATE}/affiliates/files`).then((response) => {
            self.uploadedFiles = response.data;

            if (self.uploadedFiles.length > 0) {
              self.uploadedFiles.map((file) => {
                self.savedDocuments[file.fileTypeDescription] = true;
              });
            }

            setTimeout(() => {
              self.loading = false;
            }, 1000);
          }).catch((err) => { console.log("Err:", err); return false; });
        }).catch((err) => { console.log("Err:", err); return false; });
      }).catch((err) => { console.log("Err:", err); return false; });
    }).catch((err) => { console.log("Err:", err); return false; });
  },
  methods: {
    addFileToList(ev) {
      const self = this;

      // console.log("event", ev);

      const document = ev.target.className;
      const file = ev.target.files[0];

      // console.log(ev.target.parentElement.parentElement.parentElement.parentElement);

      const parent = ev.target.parentElement.parentElement.parentElement.parentElement;
      parent.classList.remove("form-invalid");

      // Object.keys(self.files).map((fl) => {
      //   if (self.files[fl].documentType == document) {
      //     delete self.files[fl];
      //   }
      // });

      if (file) {
        self.files[document] = {
          name: file.name,
          type: file.type,
          documentType: document,
        };
      }


      self.sendingFile = true;

      setTimeout(() => {
        self.$axios.get(`${process.env.API_AFFILIATE}/affiliates/files`).then((response) => {
          if (!response.data) {
            return;
          }
          self.uploadedFiles = response.data;

          self.uploadedFiles.map((file) => {
            self.savedDocuments[file.fileTypeDescription] = true;
          });

          self.sendingFile = false;
        }).catch((err) => {
          console.log({ err });
        });
      }, 3000);
    },
    sendFiles(button) {
      const self = this;

      let typeID = 0;
      self.errorMsg = [];

      button.disabled = true;

      self.$axios
        .put(`${process.env.API_AFFILIATE}/affiliates/SendToAnalyse`)
        .then((response) => {
          self.submit = true;
          button.disabled = false;
        })
        .catch((error) => {
          typeID = self.affiliateStatusID == 0 ? 0 : 1;

          button.disabled = false;

          self.$v.files.$touch();
          self.validateForm = !self.$v.files.$invalid;

          Object.keys(error).map((fl) => {
            if (error[fl].data) {
              // console.log(error[fl].data);
              Object.keys(error[fl].data).map((f2) => {
                self.errorMsg.push(self.text.error[`status${typeID}`][error[fl].data[f2].propertyName]);
              });
            }
          });
          return false;
        });
    },
  },
  validations() {
    const self = this;

    if (self.affiliateStatusID == 0) {
      if (self.affiliationType == 1) {
        return {
          files: {
            AddressCheck: {
              name: {
                required: requiredIf(!self.savedDocuments.AddressCheck),
              },
              type: {
                validFileType(value) {
                  if (!self.savedDocuments.AddressCheck) {
                    return self.acceptedFileExtensions.indexOf(value) >= 0 ? true : false;
                  }
                  return true;
                },
              },
            },
            FinancialCheck: {
              name: {
                required: requiredIf(!self.savedDocuments.FinancialCheck),
              },
              type: {
                validFileType(value) {
                  if (!self.savedDocuments.FinancialCheck) {
                    return self.acceptedFileExtensions.indexOf(value) >= 0 ? true : false;
                  }
                  return true;
                },
              },
            },
            Identification: {
              name: {
                required: requiredIf(!self.savedDocuments.Identification),
              },
              type: {
                validFileType(value) {
                  if (!self.savedDocuments.Identification) {
                    return self.acceptedFileExtensions.indexOf(value) >= 0 ? true : false;
                  }
                  return true;
                },
              },
            },
            EquipmentSerialNumber: {
              name: {
                required: requiredIf(!self.savedDocuments.EquipmentSerialNumber),
              },
              type: {
                validFileType(value) {
                  if (!self.savedDocuments.EquipmentSerialNumber) {
                    return self.acceptedFileExtensions.indexOf(value) >= 0 ? true : false;
                  }
                  return true;
                },
              },
            },
            CPFCheck: {
              name: {
                required: requiredIf(!self.savedDocuments.CPFCheck),
              },
              type: {
                validFileType(value) {
                  if (!self.savedDocuments.CPFCheck) {
                    return self.acceptedFileExtensions.indexOf(value) >= 0 ? true : false;
                  }
                  return true;
                },
              },
            },
          },
        };
      }
      return {
        files: {
          AddressCheck: {
            name: {
              required: requiredIf(!self.savedDocuments.AddressCheck),
            },
            type: {
              validFileType(value) {
                if (!self.savedDocuments.AddressCheck) {
                  return self.acceptedFileExtensions.indexOf(value) >= 0 ? true : false;
                }
                return true;
              },
            },
          },
          FinancialCheck: {
            name: {
              required: requiredIf(!self.savedDocuments.FinancialCheck),
            },
            type: {
              validFileType(value) {
                if (!self.savedDocuments.FinancialCheck) {
                  return self.acceptedFileExtensions.indexOf(value) >= 0 ? true : false;
                }
                return true;
              },
            },
          },
          Identification: {
            name: {
              required: requiredIf(!self.savedDocuments.Identification),
            },
            type: {
              validFileType(value) {
                if (!self.savedDocuments.Identification) {
                  return self.acceptedFileExtensions.indexOf(value) >= 0 ? true : false;
                }
                return true;
              },
            },
          },
          EquipmentSerialNumber: {
            name: {
              required: requiredIf(!self.savedDocuments.EquipmentSerialNumber),
            },
            type: {
              validFileType(value) {
                if (!self.savedDocuments.EquipmentSerialNumber) {
                  return self.acceptedFileExtensions.indexOf(value) >= 0 ? true : false;
                }
                return true;
              },
            },
          },
          CNPJCheck: {
            name: {
              required: requiredIf(!self.savedDocuments.CNPJCheck),
            },
            type: {
              validFileType(value) {
                if (!self.savedDocuments.CNPJCheck) {
                  return self.acceptedFileExtensions.indexOf(value) >= 0 ? true : false;
                }
                return true;
              },
            },
          },
          SocialContract: {
            name: {
              required: requiredIf(!self.savedDocuments.SocialContract),
            },
            type: {
              validFileType(value) {
                if (!self.savedDocuments.SocialContract) {
                  return self.acceptedFileExtensions.indexOf(value) >= 0 ? true : false;
                }
                return true;
              },
            },
          },
        },
      };
    }
    return {};
  },
};
</script>
