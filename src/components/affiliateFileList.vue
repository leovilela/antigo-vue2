<template>
  <div id="affiliate-file-list">
    <!-- <p>{{filesList}}</p> -->
    <table id="files-list" v-if="filesList.length > 0">
      <thead>
        <th>Tipo</th>
        <th>Nome do arquivo</th>
        <th>Download</th>
      </thead>
      <tbody>
        <tr v-for="(file, index) in filesList" :key="index">
          <td>{{getReadableFileTypeDescription(file.fileTypeDescription)}}</td>
          <td>{{file.fileOriginName}}</td>
          <td><span @click="getTargetAffiliateFile(file.fileId, file.fileOriginName)" class="glyphicon glyphicon-download" :class="isUserOwner ? 'dowloadBtn' : 'dowloadBtn--blocked'"></span></td>
          <!-- <td><a :href="`https://api-affiliate-stage-1.listofacil.com.br/affiliates/files/${file.fileId}`" download><span @click="getTargetAffiliateFile(file.fileId)" class="glyphicon glyphicon-download downloadBtn"></span></a></td> -->
        </tr>
      </tbody>
    </table>
    <div id="alert-messages">
      <div class="alert alert-danger" v-if="listStatus == 204">Não existem arquivos cadastrados nessa afiliação.</div>
      <div class="alert alert-danger" v-if="listStatus == 400">Não foi possível obter os arquivos cadastrados nessa afiliação.</div>
      <div class="alert alert-danger" v-if="listStatus == 500">Ocorreu um erro ao conectar ao servidor de arquivos. Tente novamente.</div>
    </div>
  </div>
</template>

<style lang="less">
@import "~assets/main.less";
@import "~assets/vars.less";

#affiliate-file-list {
  #files-list {
    display: block;
    width: 100%;
    text-align: center;
    border-bottom: 1px solid @color16;

    thead, tbody {
      display: inline-table;
      width: 100%;

      th, td {
        width: calc(100% /3);
      }
    }

    thead {
      border-bottom: 1px solid @color16;
      border-top: 1px solid @color16;
    }


    tbody {
      tr {
        &:nth-child(odd) {
          background-color: @color9;
        }
        &:hover {
          background-color: @color20;
        }
      }
    }
  }

  .dowloadBtn {
    &:hover {
      cursor: pointer;
    }
    &--blocked {
      cursor: not-allowed;
    }
  }
}
</style>


<script>

import { mapGetters } from "vuex";

export default {
  data() {
    return {
      loading: true,
      listStatus: null,
    };
  },
  props: ["filesList"],
  // created() {
  //   const self = this;
  // self.$axios
  //   .get("https://api-affiliate-stage-1.listofacil.com.br/affiliates/files")
  //   .then((response) => {
  //     // console.log(response);
  //     self.loading = false;
  //     if (response.status == 200) {
  //       self.filesList = response.data;
  //     } else {
  //       self.listStatus = 204;
  //     }
  //   })
  //   .catch((error) => {
  //     self.listStatus = error.status;
  //   });
  // },
  computed: {
    ...mapGetters({
      isUserOwner: "auth/isUserOwner",
    }),
  },
  methods: {
    getTargetAffiliateFile(fileID, fileName) {
      if (!this.isUserOwner) {
        return;
      }
      const self = this;

      self.$axios
        .get(`${process.env.API_AFFILIATE}/affiliates/files/${fileID}`, {
          responseType: "blob",
        })
        .then((response) => {
          // console.log(response);
          const headers = response.headers;
          const blob = new Blob([response.data], { type: headers["content-type"] });
          const link = document.createElement("a");
          link.href = window.URL.createObjectURL(blob);
          link.setAttribute("download", fileName);
          link.click();
        }).catch(err => console.log("Err:", err));
    },
    getReadableFileTypeDescription(desc) {
      switch (desc) {
        case "Identification":
          return "Identificação";

        case "AddressCheck":
          return "Endereço";

        case "FinancialCheck":
          return "Domicílio bancário";

        case "EquipmentSerialNumber":
          return "Serial do equipamento";

        case "CPFCheck":
          return "Situação cadastral CPF";

        case "CNPJCheck":
          return "Situação cadastral CNPJ";

        case "SocialContract":
          return "Contrato social";

        case "BusinessCard":
          return "Cartão de visita";
      }
    },
  },
};
</script>
