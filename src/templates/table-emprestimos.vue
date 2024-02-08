<template>
  <div class="table-emprestimos" :class="{'form-no-edit': controls.downloading}">
    <!-- <h2>Tabela emprestimos</h2> -->
    <!-- <p v-for="(emprestimo, index) in emprestimos" :key="index">{{emprestimo}}</p> -->

    <table>
      <thead>
        <th>{{text.headings.contract}}</th>
        <!-- <th>{{text.headings.transactionID}}</th> -->
        <th>{{text.headings.date}}</th>
        <th>{{text.headings.authorize}}</th>
        <th>{{text.headings.type}}</th>
        <th>{{text.headings.status}}</th>
        <th>{{text.headings.releasedValue}}</th>
        <th>{{text.headings.transactionValue}}</th>
        <th>{{text.headings.installments}}</th>
        <th class="download">{{text.headings.downloadFichaCadastral}}</th>
        <th class="download">{{text.headings.downloadCCB}}</th>
        <th class="download">{{text.headings.downloadCET}}</th>
      </thead>
      <tbody>
        <tr v-for="(emprestimo, index) in emprestimos" :key="index">
          <td>{{emprestimo.contractId}}</td>
          <!-- <td>{{emprestimo.transactionID}}</td> -->
          <td>{{showFormattedDate(emprestimo.approveDate)}}</td>
          <td>{{emprestimo.authorize}}</td>
          <td>{{emprestimo.productName}}</td>
          <td>{{emprestimo.status}}</td>
          <td>{{showNumberAsCurrency(emprestimo.releasedValue)}}</td>
          <td>{{showNumberAsCurrency(emprestimo.transactionValue)}}</td>
          <td>{{emprestimo.installmentMode}}</td>
          <td><span class="glyphicon glyphicon-download" @click="downloadFichaCadastral(emprestimo.contractId)"></span></td>
          <td><span class="glyphicon glyphicon-download" @click="downloadCCB(emprestimo.contractId)"></span></td>
          <td><span class="glyphicon glyphicon-download" @click="downloadCET(emprestimo.contractId)"></span></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style lang="less">
@import "~assets/vars.less";
@import "~assets/main.less";

.table-emprestimos {
  table {
    width: 100%;
    text-align: center;

    thead th,
    tbody tr td {
      padding: 5px 10px;
    }

    thead {
      border-bottom: 1px solid @color10;
      border-top: 1px solid @color10;
      th {
        width: calc(100%/7);

        &.download {
          &:first-of-type {
            border-left: 1px dashed @color12;
          }
        }
      }
    }

    tr {
      &:nth-child(odd) {
        background-color: @color9;
      }
    }

    .glyphicon {
      cursor: pointer;
    }
  }
}

</style>

<script>
import { setTimeout } from "timers";

export default {
  data() {
    return {
      text: {
        headings: {
          contract: "Nº CCB",
          // transactionID: "Código",
          date: "Data",
          authorize: "Autorização",
          type: "Produto",
          status: "Status",
          releasedValue: "Valor liberado",
          transactionValue: "Valor transação",
          installments: "Parcelas",
          downloadCCB: "Contrato",
          downloadCET: "CET",
          downloadFichaCadastral: "Ficha Cadastral",
        },
        error: {
          noContent: "Não foi possível encontrar o arquivo do empréstimo selecionado",
          catchError: "Houve um erro ao procurar o arquivo",
        },
      },
      controls: {
        downloading: false,
      },
    };
  },
  props: {
    emprestimos: {
      required: true,
    },
  },
  methods: {
    // exibe valores numéricos no formato de moeda
    showNumberAsCurrency(number) {
      return number.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
    },
    // exibe data formatada
    showFormattedDate(val) {
      const data = new Date(val);
      return `${data.getDate() < 10 ? `0${data.getDate()}` : data.getDate()}/${data.getMonth() + 1 < 10 ? `0${data.getMonth() + 1}` : data.getMonth() + 1}/${data.getFullYear()}`;
    },
    // exibe o nome legivel do tipo de emprestimo
    getLoanNameFrom(type) {
      if (type == 0) return "Capital de giro com cartão";
    },
    // Download CCB
    downloadCCB(contract) {
      const self = this;

      self.controls.downloading = true;

      self.$axios.get(`${process.env.API_CUSTOMER_DATA}/Report/DownloadForm?contractId=${contract}&formType=2`, { responseType: "blob" }).then((response) => {
        if (response.status == 204) {
          self.controls.downloading = false;
          self.$nuxt.$emit("toggleModal", {
            api: "erro",
            modalContent: self.text.error.noContent,
            code: 204,
          });
        } else if (response.status == 200) {
          const blobURL = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");

          const disposition = response.headers["content-disposition"].split(";");
          const filename = `${disposition.filter(x => x.indexOf("filename=") != -1)[0]}`;

          // console.log("disposition", disposition);
          // console.log("filename", filename.split("=")[1]);

          link.href = blobURL;

          // link.setAttribute("download", filename); // or any other extension
          link.setAttribute("download", filename.split("=")[1].trim().replace(/"/g, "")); // or any other extension
          document.body.appendChild(link);
          link.click();

          self.controls.downloading = false;
          /* setTimeout(() => {
            document.body.removeChild(link);
          }, 100); */
        }
      }).catch((err) => {
        self.controls.downloading = false;
        self.$nuxt.$emit("toggleModal", {
          api: "erro",
          modalContent: err,
          code: "123",
        });
        return false;
      });
    },
    // Download CET
    downloadCET(contract) {
      const self = this;

      self.controls.downloading = true;

      self.$axios.get(`${process.env.API_CUSTOMER_DATA}/Report/DownloadForm?contractId=${contract}&formType=3`, { responseType: "blob" }).then((response) => {
        if (response.status == 204) {
          self.controls.downloading = false;
          self.$nuxt.$emit("toggleModal", {
            api: "erro",
            modalContent: self.text.error.noContent,
            code: 204,
          });
        } else if (response.status == 200) {
          const blobURL = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");

          const disposition = response.headers["content-disposition"].split(";");
          const filename = `${disposition.filter(x => x.indexOf("filename=") != -1)[0]}`;

          // console.log("disposition", disposition);
          // console.log("filename", filename.split("=")[1]);

          link.href = blobURL;

          // link.setAttribute("download", filename); // or any other extension
          link.setAttribute("download", filename.split("=")[1].trim().replace(/"/g, "")); // or any other extension
          document.body.appendChild(link);
          link.click();

          self.controls.downloading = false;
          /* setTimeout(() => {
            document.body.removeChild(link);
          }, 100); */
        }
      }).catch((err) => {
        self.controls.downloading = false;
        self.$nuxt.$emit("toggleModal", {
          api: "erro",
          modalContent: err,
          code: "123",
        });
        return false;
      });
    },
    // Download Ficha Cadastral
    downloadFichaCadastral(contract) {
      const self = this;

      self.controls.downloading = true;

      self.$axios.get(`${process.env.API_CUSTOMER_DATA}/Report/DownloadForm?contractId=${contract}&formType=1`, { responseType: "blob" }).then((response) => {
        if (response.status == 204) {
          self.controls.downloading = false;
          self.$nuxt.$emit("toggleModal", {
            api: "erro",
            modalContent: self.text.error.noContent,
            code: 204,
          });
        } else if (response.status == 200) {
          const blobURL = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");

          const disposition = response.headers["content-disposition"].split(";");
          const filename = `${disposition.filter(x => x.indexOf("filename=") != -1)[0]}`;

          // console.log("disposition", disposition);
          // console.log("filename", filename.split("=")[1]);

          link.href = blobURL;

          // link.setAttribute("download", filename); // or any other extension
          link.setAttribute("download", filename.split("=")[1].trim().replace(/"/g, "")); // or any other extension
          document.body.appendChild(link);
          link.click();

          self.controls.downloading = false;
          /* setTimeout(() => {
            document.body.removeChild(link);
          }, 100); */
        }
      }).catch((err) => {
        self.controls.downloading = false;
        self.$nuxt.$emit("toggleModal", {
          api: "erro",
          modalContent: err,
          code: "123",
        });
        return false;
      });
    },
  },
};
</script>
