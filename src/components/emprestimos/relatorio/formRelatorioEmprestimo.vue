<template>
  <div class="page-emprestimos" id="form-relatorio-emprestimo">

    <!-- <h2>{{form}}</h2> -->

    <div class="row form-buscar-emprestimos form-section">
      <form @submit.prevent="showTable(true, 1); resetPagination()" class="container-fluid form-group" :class="{'form-no-edit': controls.searching}">
        <div class="row">
          <div class="col-xs-6 col-lg-4 form-input" :class="{'form-invalid': $v.form.startDate.$error}">
            <label for="startDate">{{text.startDate}}</label>
            <date-picker id="startDate" :lang="'pt-br'" :format="'DD/MM/YYYY'" v-mask="'##/##/####'" v-model="form.startDate" :not-before="new Date(2015, 0, 1, 0, 0, 0, 0)"></date-picker>
          </div>
          <div class="col-xs-6 col-lg-4 form-input" :class="{'form-invalid': $v.form.endDate.$error}">
            <label for="endDate">{{text.endDate}}</label>
            <date-picker id="endDate" :lang="'pt-br'" :format="'DD/MM/YYYY'" v-mask="'##/##/####'" :not-before="form.startDate" v-model="form.endDate"></date-picker>
          </div>
          <div class="col-xs-6 col-lg-4 form-input" :class="{'form-invalid': $v.form.ccb.$error}">
            <label for="ccb">{{text.ccb}}</label>
            <input type="number" min="0" step="1" id="ccb" v-model="form.ccb">
          </div>
          <!-- <div class="col-xs-6 col-lg-4 form-input">
            <label for="code">{{text.code}}</label>
            <input type="number" min="0" step="1" id="code" v-model="form.code">
          </div> -->
          <div class="col-xs-6 col-lg-4 form-input" :class="{'form-invalid': $v.form.loanValue.$error}">
            <label for="ccb">{{text.loanValue}}</label>
            <Money id="ccb" v-bind="moneyFormat" v-model="form.loanValue" :mask="'##########'" type="text"></Money>
          </div>
          <div class="col-xs-6 col-lg-4 form-input">
            <label>&nbsp;</label>
            <button style="margin-top: 0;" type="submit">{{text.searchBtn}}</button>
          </div>
        </div>
      </form>
    </div>


  </div>
</template>

<script>
import DatePicker from "vue2-datepicker";
import { TheMask, mask } from "vue-the-mask";
import { Money } from "v-money";
import { required, minValue, integer } from "vuelidate/lib/validators";


export default {
  components: {
    DatePicker,
    TheMask,
    Money,
  },
  directives: {
    mask,
  },
  created() {
    self.$nuxt.$on("updatePagination", (data) => {
      self.showTable(false, data);
    });
  },
  mounted() {
    const self = this;

    self.$nuxt.$emit("setTableType", "emprestimos");

    const today = new Date();

    self.form.startDate = new Date(today.getFullYear(), today.getMonth(), 1);
    self.form.startDate.setHours(0, 0, 0, 0);

    self.form.endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    self.form.endDate.setHours(23, 59, 59, 999);

    self.$nuxt.$emit("searching", {
      searching: true,
    });

    self.showTable(true, 1);
  },
  beforeDestroy() {
    this.$nuxt.$off("updatePagination");
  },
  data() {
    return {
      form: {
        startDate: null,
        endDate: null,
        ccb: null,
        // code: null,
        loanValue: 0,
      },
      moneyFormat: {
        decimal: ",",
        thousands: ".",
        prefix: "R$",
        suffix: "",
        precision: 2,
      },
      text: {
        startDate: "Data inicial",
        endDate: "Data final",
        ccb: "Nº CCB",
        code: "Código transação",
        loanValue: "Valor empréstimo",
        searchBtn: "Ver relatório",
      },
      controls: {
        searching: false,
      },
      content: {
        emprestimos: [],
      },
    };
  },
  methods: {
    showTable(headers, currentPage) {
      const self = this;

      const pageSizeValue = 30;

      self.$v.form.$touch();

      if (!self.$v.form.$invalid) {
        self.controls.searching = true;
        self.content.emprestimos = [];
        self.form.endDate.setHours(23, 59, 59, 999);
        self.form.startDate.setHours(0, 0, 0, 0);

        self.$nuxt.$emit("showResultsTable", {
          toggle: false,
          content: "",
        });

        self.$nuxt.$emit("searching", {
          searching: true,
        });

        // https://api-customer-data-dev.listofacil.com.br/Report/LoanReport
        self.$axios.post(`${process.env.API_CUSTOMER_DATA}/Report/LoanReport`, {
          contractId: self.form.ccb ? self.form.ccb : 0,
          releasedValue: self.form.loanValue,
          pageNumber: currentPage,
          pageSize: pageSizeValue,
          start: self.form.startDate,
          end: self.form.endDate,
        }).then((response) => {
          self.$v.form.$reset();
          self.$nuxt.$emit("searching", {
            searching: false,
          });

          if (response.status == 200) {
            self.content.emprestimos = response.data;

            self.$nuxt.$emit("showResultsTable", {
              toggle: true,
              content: self.content.emprestimos,
            });

            self.$nuxt.$emit("loadReportParameters", {
              contractId: self.form.ccb ? self.form.ccb : 0,
              releasedValue: self.form.loanValue,
              start: self.form.startDate.toLocalISOString(),
              end: self.form.endDate.toLocalISOString(),
            });
          } else {
            self.content.emprestimos = [];

            self.$nuxt.$emit("emptySearch", {
              emptySearch: true,
            });
          }
          self.controls.searching = false;
        }).catch((error) => {
          self.controls.searching = false;
          self.$v.form.$reset();

          self.$nuxt.$emit("searching", {
            searching: false,
          });

          self.$nuxt.$emit("emptySearch", {
            emptySearch: true,
          });
          // console.log("error", error);
        });
      }
    },
    resetPagination() {
      this.$nuxt.$emit("resetPagination"); // esse emitter não precisa de um segundo parâmetro
    },
  },
  validations() {
    const self = this;

    return {
      form: {
        startDate: {
          required,
          notBefore: minValue(new Date(2015, 0, 1, 0, 0, 0, 0)),
        },
        endDate: {
          required,
          notBefore: minValue(new Date(self.form.startDate)),
        },
        ccb: {
          integer,
        },
        loanValue: {
          validate: minValue(0),
        },
      },
    };
  },
};
</script>
