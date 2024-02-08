<template>
  <form id="formMovimentacao" class="container-fluid" :class="{'form-no-edit': controls.searching}" @submit.prevent>
    <!-- <p v-if="form.startDate != null">{{form.startDate}} {{typeof form.startDate}}</p> -->
    <!-- <p v-if="form.endDate != null">{{form.endDate}} {{typeof form.endDate}}</p> -->
    <!-- <div id="formTitleContainer" class="form-group row">
      <h3 id="formTitle" class="col-xs-6">{{text.form_title}}<span class="glyphicon glyphicon-filter"></span></h3>
      <div id="formOpenIcon" class="col-xs-6">
        <p class="pull-right">
          <span v-show="!controls.formOpen && controls.showTable">{{ text.formRelatoriosPagamento_searchAgain }}</span>
          <span class="glyphicon" :class="{'glyphicon-chevron-up': controls.formOpen,  'glyphicon-chevron-down': !controls.formOpen}"></span>
        </p>
      </div>
    </div> -->
    <div id="formInputContainer" class="form-group row">
      <div class="form-input form-input-date col-xs-6" :class="{'form-invalid': $v.form.startDate.$invalid}">
        <label>{{text.form_startDate}}</label>
        <date-picker id="startDate" v-model.trim="$v.form.startDate.$model" :lang="'pt-br'" :format="'DD/MM/YYYY'" v-mask="'##/##/####'" :not-before="new Date('2015-01-01')"></date-picker>
        <div v-if="!$v.form.startDate.minValue && $v.form.startDate.date">{{text.alerta_dataRecente}}</div>
          <div v-if="!$v.form.startDate.required">{{text.alerta_dataVazia}}</div>
      </div>
      <div class="form-input form-input-date col-xs-6" :class="{'form-invalid': $v.form.endDate.$invalid}">
        <label>{{text.form_endDate}}</label>
        <date-picker id="endDate" v-model.trim="$v.form.endDate.$model" :lang="'pt-br'" :format="'DD/MM/YYYY'" v-mask="'##/##/####'" :not-before="new Date('2015-01-01')"></date-picker>
        <div v-if="!$v.form.endDate.minValue && $v.form.endDate.date">{{text.alerta_dataRecente}}</div>
          <div v-if="!$v.form.endDate.required">{{text.alerta_dataVazia}}</div>
      </div>
    </div>
    <div class="form-group row">
      <div class="form-button pull-right col-xs-6">
        <button id="btnSearch" @click="showTable(true, 1); resetPagination()" :disabled="controls.searching|| $v.validateForm.$invalid">{{text.form_search}}</button>
      </div>
    </div>
  </form>
</template>

<style lang="less" scoped>
@import "~assets/vars.less";
@import "~assets/variables.less";

#formMovimentacao {
  user-select: none;

  #formTitleContainer {
    border-bottom: 1px solid @color14;
    #formTitle {
      font-size: @ftSizeLarge;
      padding-left: 0;
      span {
        margin-left: 10px;
      }

      &:hover {
        cursor: pointer;
      }
    }

    #formOpenIcon {
      span {
        font-size: @ftSizeSmall;
      }

      .glyphicon {
        font-size: @ftSizeLarge;
        margin-left: 10px;
        vertical-align: bottom;
      }

      &:hover {
        cursor: pointer;
      }
    }
  }

  #datepickersContainer {
    @media (min-width: @screen-sm-min) {
      max-width: 350px;
    }
  }

  // #formButtonsContainer {
  //   .button {
  //     // max-width: 200px;
  //     @media (min-width: @screen-lg-min) {
  //       max-width: 150px;
  //     }
  //   }
  //   #searchButton {
  //     #btnSearch {
  //       background: @color5;
  //       color: @color2;
  //       width: 100%;
  //       letter-spacing: initial;
  //     }
  //   }

  //   @media (max-width: @screen-xs-max) {
  //   }
  //   @media (min-width: @screen-sm-min) {
  //     padding-top: 22px;
  //   }
  //   @media (min-width: @screen-md-min) {
  //   }
  //   @media (min-width: @screen-lg-min) {
  //   }
  // }
}

</style>

<script>
import DatePicker from "vue2-datepicker";
import { required, minValue } from "vuelidate/lib/validators";
import { mask } from "vue-the-mask";
import notice from "~/components/notice.vue";

const date = value => (value != null ? value.toISOString().split("T")[0].length == 10 : false);

export default {
  data() {
    return {
      text: {
        form_title: "Movimentação",
        form_searchAgain: "Refazer busca",
        form_startDate: "Data Inicial",
        form_endDate: "Data final",
        form_search: "Ver relatório",
        alerta_dataRecente: "Selecione uma data mais recente",
        alerta_dataVazia: "Selecione uma data",
      },
      controls: {
        showTable: false,
        searching: false,
      },
      form: {
        startDate: null,
        endDate: null,
      },
    };
  },
  methods: {
    // busca transacoes seguindo o filtro de datas selecionado
    showTable(headers, currentPage) {
      const self = this;

      // console.log("headers", headers);

      // ativa o controle de loading para exibir o GIF de carregamento
      self.controls.searching = true;

      // seta as horas da data final de busca para 23:59:59:999
      self.form.endDate.setHours(23, 59, 59, 999);
      self.form.startDate.setHours(0, 0, 0, 0);

      // fecha a tabela
      self.$nuxt.$emit("showResultsTable", {
        toggle: false,
        content: "",
      });

      // emite evento de busca
      // exibe o alerta de "buscando..."
      self.$nuxt.$emit("searching", {
        searching: true,
      });

      self.$axios
        .get(`${process.env.API_FIDES}/api/Client/statement/${$nuxt.$store.state.usuario.clientID}?startDate=${self.form.startDate}&endDate=${self.form.endDate}&page=${currentPage}&pageSize=10`)
        .then((response) => {
          // console.log(response);

          self.controls.searching = false;

          self.$nuxt.$emit("searching", {
            searching: false,
          });

          if (response.status == 200) {
            // console.log("Resultado", response.data.result);
            // console.log("Headers", response.headers);

            const pagination = JSON.parse(response.headers["x-pagination"]);
            // console.log(pagination); // PRECISA DAR PARSE NO JSON RECEBIDO NO HEADER
            // console.log("Total: ", pagination.Count, "\nPages", pagination.Pages);

            self.$nuxt.$emit("createPagination", {
              total: pagination.Count, // a resposta traz o total de itens presentes no período/filtro selecionado, independente da paginação
              pages: pagination.Pages, // total de páginas informado pela resposta para o período/filtro selecionado
            });

            self.$nuxt.$emit("showResultsTable", {
              toggle: true,
              content: response.data.result,
            });
          } else {
            // console.log("Vazio", response.status);

            self.$nuxt.$emit("emptySearch", {
              emptySearch: true,
            });
          }
        })
        .catch((error) => {
          // console.log("err", error);
          self.controls.searching = false;
          self.$nuxt.$emit("emptySearch", {
            emptySearch: true,
          });
        });
    },
    // reinicia paginação
    // Usado no clique no botõa de pesquisar para quando fizer uma nova pesquisa, retornar para a primeira página da tabela
    resetPagination() {
      this.$nuxt.$emit("resetPagination"); // esse emitter não precisa de um segundo parâmetro
    },
  },
  components: {
    notice,
    DatePicker,
  },
  directives: {
    mask,
  },
  created() {
    this.$nuxt.$emit("setTableType", "movimentacao");

    // Listener para receber a atualização de página vinda da tabela
    // Chama a função que carrega os dados da API passando a página enviada pelo evento como parâmetro
    this.$nuxt.$on("updatePagination", (data) => {
      this.showTable(true, data);
    });
  },
  mounted() {
    const self = this;

    self.$nuxt.$emit("searching", {
      searching: true,
    });

    self.controls.searching = true;

    const today = new Date();

    self.form.startDate = new Date(today.getFullYear(), today.getMonth(), 1);
    self.form.startDate.setHours(0, 0, 0, 0);

    self.form.endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    self.form.endDate.setHours(23, 59, 59, 999);

    self.showTable(true, 1);
  },
  beforeDestroy() {
    this.$nuxt.$off("updatePagination");
  },
  validations: {
    form: {
      startDate: {
        required,
        date,
        minValue: value => (value != null ? new Date(value) > new Date("2013-12-31") : false),
      },
      endDate: {
        required,
        date,
        minValue: value => (value != null ? new Date(value) > new Date("2013-12-31") : false),
      },
    },
    validateForm: ["form.startDate", "form.endDate"],
  },
};
</script>
