<template>
  <div id="pagamento-ipva" class="form-group" v-if="!controls.loading">
    <!-- <h3>IPVA</h3> -->
    <!-- <p>{{state}}</p> -->
    <!-- <p>{{controls}}</p> -->
    <!-- <p>Pagamento: {{paymentInfo}}</p> -->
    <!-- <p>Estados: {{content.states}}</p> -->
    <!-- <p>{{calculateTotalValue}}</p> -->
    <!-- <p v-if="!$v.validateForm.$invalid">OK</p> -->
    <!-- <p v-else>FAIL</p> -->
    <!-- <p>{{$v.validateForm.$invalid}}</p> -->
    <!-- <p>{{currentState}}</p> -->
    <!-- <p>{{isBarCodePayment}}</p> -->
    <!-- <table>
      <tr v-for="(validation, key, index) in $v.paymentInfo" :key="index">
        <td>{{key}}</td>
        <td>{{validation.$model}}</td>
        <td>{{validation.$invalid}}</td>
      </tr>
    </table> -->

    <section id="ipva-completo" class="row" v-if="!isBarCodePayment">
      <div class="col-xs-12 col-sm-6 form-input" :class="{'form-invalid':$v.paymentInfo.taxPayer.$invalid}">
        <label for="taxPayer">{{text.label_taxPayer}}</label>
        <input type="text" id="taxPayer" :placeholder="text.placeholder_taxPayer" v-model="paymentInfo.taxPayer">
      </div>
      <div class="col-xs-12 col-sm-6 form-input" :class="{'form-invalid':$v.paymentInfo.federalId.$invalid}">
        <label for="federalId">{{text.label_federalId}}</label>
        <the-mask id="federalId" :mask="['###.###.###-##', '##.###.###/####-##']" :placeholder="text.placeholder_federalId" v-model="paymentInfo.federalId"></the-mask>
      </div>
      <div class="col-xs-12 col-sm-4 col-lg-4 form-input" :class="{'form-invalid': $v.paymentInfo.paymentDate.$invalid}">
        <label for="paymentDate">{{text.label_paymentDate}}</label>
        <date-picker id="paymentDate" :lang="'pt-br'" :format="'DD/MM/YYYY'" v-mask="'##/##/####'" :first-day-of-week="1" :disabled-days="disableWeekends" v-model.trim="$v.paymentInfo.paymentDate.$model"></date-picker>
      </div>
      <div class="col-xs-12 col-sm-4 col-lg-4 form-input" :class="{'form-invalid': $v.paymentInfo.dueDate.$invalid}">
        <label for="dueDate">{{text.label_dueDate}}</label>
        <date-picker id="dueDate" :lang="'pt-br'" :format="'DD/MM/YYYY'" v-mask="'##/##/####'" :first-day-of-week="1" :disabled-days="disableWeekends" v-model.trim="$v.paymentInfo.dueDate.$model"></date-picker>
      </div>
      <div class="col-xs-12 col-sm-4 col-lg-4 form-input"  :class="{'form-invalid':$v.paymentInfo.year.$invalid}">
        <label for="year">{{text.label_year}}</label>
        <the-mask id="year" :mask="'####'" v-model="paymentInfo.year" :placeholder="text.placeholder_year"></the-mask>
      </div>
      <div class="col-xs-12 col-sm-4 col-md-4 col-lg-4 form-input"  :class="{'form-invalid':$v.paymentInfo.renavam.$invalid}">
        <label for="renavam">{{text.label_renavam}}</label>
        <the-mask id="renavam" :mask="['#########', '############']" v-model="paymentInfo.renavam" :placeholder="text.placeholder_renavam"></the-mask>
      </div>
      <div class="col-xs-12 col-sm-3 col-md-3 col-lg-4 form-input"  :class="{'form-invalid':$v.paymentInfo.state.$invalid}">
        <label for="state">{{text.label_state}}</label>
        <select name="state" id="state" v-model="paymentInfo.state" disabled>
          <option :value="undefined" disabled hidden>{{text.placeholder_state}}</option>
          <option v-for="(st, index) in content.states" :key="index" :value="st.uf.trim().toLowerCase()">{{st.uf.trim()}}</option>
        </select>
      </div>
      <div class="col-xs-12 col-sm-5 col-md-5 col-lg-4 form-input" :class="{'form-invalid':$v.paymentInfo.cityCode.$invalid}">
        <label for="cityCode">{{text.label_cityCode}}</label>
        <select name="cityCode" id="cityCode" v-model="paymentInfo.cityCode" :disabled="paymentInfo.state == undefined">
          <option :value="null" disabled hidden>{{text.placeholder_cityCode}}</option>
          <option v-for="(city, index) in content.cities" :key="index" :value="city.cityID">{{city.cityName}}</option>
        </select>
      </div>
      <div class="col-xs-12 col-sm-5 col-md-6 col-lg-4 form-input" :class="{'form-invalid':$v.paymentInfo.plate.$invalid}">
        <label for="plate">{{text.label_plate}}</label>
        <the-mask id="plate" v-model="paymentInfo.plate" :mask="'AAA-####'" :placeholder="text.placeholder_plate"></the-mask>
      </div>
      <div class="col-xs-12 col-sm-7 col-md-6 col-lg-4 form-input" :class="{'form-invalid':$v.paymentInfo.paymentOption.$invalid}">
        <label for="paymentOption">{{text.label_paymentOption}}</label>
        <select name="paymentOption" id="paymentOption" v-model="paymentInfo.paymentOption">
          <option :value="null" hidden disabled>{{text.placeholder_paymentOption}}</option>
          <option v-for="(option, index) in content.paymentOptions" :key="index" :value="option.value">{{option.label}}</option>
        </select>
      </div>
      <div class="col-xs-12 col-sm-4 col-md-4 col-lg-4 form-input" :class="{'form-invalid':$v.paymentInfo.baseValue.$invalid}">
        <label for="baseValue">{{text.label_baseValue}}</label>
        <Money type="text" id="baseValue" v-model="paymentInfo.baseValue" v-bind="controls.money"></Money>
      </div>
      <div class="col-xs-12 col-sm-4 col-md-4 col-lg-4 form-input" v-if="paymentInfo.paymentOption === 'PARCELA_UNICA_COM_DESCONTO'" :class="{'form-invalid': $v.paymentInfo.discountValue.$invalid}">
        <!-- <code>{{$v.paymentInfo.discountValue}}</code> -->
        <label for="discountValue">{{text.label_discountValue}}</label>
        <Money type="text" id="discountValue" v-model="paymentInfo.discountValue" v-bind="controls.money"></Money>
      </div>
      <div class="col-xs-12 col-sm-4 col-md-4 col-lg-4 form-input" :class="{'form-invalid': $v.paymentInfo.value.$invalid}">
        <label for="value">{{text.label_value}}</label>
        <Money type="text" id="value" :value="calculateTotalValue" v-bind="controls.money" disabled v-model="paymentInfo.value"></Money>
      </div>
    </section>

    <section id="ipva-barCode" class="row" v-else>
      <div class="col-xs-12" :class="{'form-invalid': $v.paymentInfo.barCode.$invalid}">
        <label for="barCode">{{text.label_barCode}}</label>
        <the-mask id="barCode" :mask="'############ ############ ############ ############'" :placeholder="text.placeholder_barCode" v-model="paymentInfo.barCode"></the-mask>
      </div>
      <div class="col-xs-12">
        <div class="row">
          <div class="col-xs-6 col-lg-3" :class="{'form-invalid': $v.paymentInfo.federalId.$invalid}">
            <label for="federalId">{{text.label_federalId}}</label>
            <the-mask id="federalId" :mask="['###.###.###-##', '##.###.###-#']" :placeholder="text.placeholder_federalId" v-model="paymentInfo.federalId"></the-mask>
          </div>
          <div class="col-xs-6 col-lg-3" :class="{'form-invalid': $v.paymentInfo.taxPayer.$invalid}">
            <label for="taxPayer">{{text.label_taxPayer}}</label>
            <input type="text" id="taxPayer" :placeholder="text.placeholder_taxPayer" v-model="paymentInfo.taxPayer">
          </div>
          <div class="col-xs-6 col-lg-2" :class="{'form-invalid': $v.paymentInfo.paymentDate.$invalid}">
            <label for="paymentDate">{{text.label_paymentDate}}</label>
            <date-picker id="paymentDate" :lang="'pt-br'" :format="'DD/MM/YYYY'" v-mask="'##/##/####'" :first-day-of-week="1" :disabled-days="disableWeekends" v-model.trim="$v.paymentInfo.paymentDate.$model"></date-picker>
          </div>
          <div class="col-xs-6 col-lg-2" :class="{'form-invalid': $v.paymentInfo.dueDate.$invalid}">
            <label for="dueDate">{{text.label_dueDate}}</label>
            <date-picker id="paymentDate" :lang="'pt-br'" :format="'DD/MM/YYYY'" v-mask="'##/##/####'" :first-day-of-week="1" :disabled-days="disableWeekends" v-model.trim="$v.paymentInfo.dueDate.$model"></date-picker>
          </div>
          <div class="col-xs-6 col-lg-2" :class="{'form-invalid': $v.paymentInfo.value.$invalid}">
            <label for="value">{{text.label_value}}</label>
            <Money type="text" id="value" v-model="paymentInfo.value" v-bind="controls.money"></Money>
          </div>
        </div>
      </div>
      <!-- <div class="form-input col-xs-12 col-sm-6 col-lg-4">
        <label for="paymentOptions">{{text.label_paymentOption}}</label>
        <select id="paymentOptions"></select>
      </div> -->
    </section>

  </div>
</template>

<script>
import { TheMask, mask } from "vue-the-mask";
import { Money } from "v-money";
import DatePicker from "vue2-datepicker";
import { required, minLength, requiredIf } from "vuelidate/lib/validators";
import Decimal from "decimal.js";

const federalIdLength = value => value != undefined && (value.length == 11 || value.length == 14);
const yearLength = value => value != undefined && value.length == 4;
const renavamLength = value => value != undefined && (value.length == 9 || value.length == 12);
const plateLength = value => value != undefined && value.length == 7;
const minBaseValue = value => value != undefined && value > 0;
const minValue = value => value != undefined && value > 0;
const date = value => (value != undefined && value != null ? value.toISOString().split("T")[0].length == 10 : false);
const barCode = value => value != undefined && value.length == 48;


export default {
  data() {
    return {
      controls: {
        money: {
          decimal: ",",
          thousands: ".",
          prefix: "R$ ",
          suffix: " ",
          precision: 2,
          masked: false,
        },
        loading: true,
      },
      paymentInfo: {
        dueDate: null,
        paymentDate: null,
        paymentOption: null,
        taxPayer: null,
        federalId: null,
        year: null,
        renavam: null,
        state: null,
        cityCode: null,
        plate: null,
        baseValue: 0,
        value: 0,
        discountValue: 0,
        // barCode: "",
      },
      text: {
        label_taxPayer: "Pagador",
        placeholder_taxPayer: "Insira o nome do pagador",
        label_federalId: "Documento",
        placeholder_federalId: "Insira o documento",
        label_taxCode: "Código da receita",
        placeholder_taxCode: "Insira o código",
        label_year: "Ano",
        placeholder_year: "Insira o ano",
        label_renavam: "Renavam",
        placeholder_renavam: "Insira o Renavam",
        label_state: "Estado",
        placeholder_state: "Selecione o estado",
        label_cityCode: "Cidade",
        placeholder_cityCode: "Selecione a cidade",
        label_plate: "Placa",
        placeholder_plate: "Insira a placa",
        label_paymentOption: "Opção de pagamento",
        placeholder_paymentOption: "Escolha uma opção",
        label_baseValue: "Valor",
        label_discountValue: "Desconto",
        label_dueDate: "Data de vencimento",
        label_paymentDate: "Data de pagamento",
        label_value: "Valor total",
        label_barCode: "Código de barras",
        placeholder_barCode: "Insira o código do boleto",
        payButton: "Pagar",
      },
      content: {
        paymentOptions: [
          {
            label: "Parcela única c/ desconto",
            value: "PARCELA_UNICA_COM_DESCONTO",
          },
          {
            label: "Parcela única s/ desconto",
            value: "PARCELA_UNICA_SEM_DESCONTO",
          },
          {
            label: "Parcela 1",
            value: "PARCELA_1",
          },
          {
            label: "Parcela 2",
            value: "PARCELA_2",
          },
          {
            label: "Parcela 3",
            value: "PARCELA_3",
          },
          {
            label: "Parcela 3",
            value: "PARCELA_3",
          },
          {
            label: "Parcela 4",
            value: "PARCELA_4",
          },
          {
            label: "Parcela 5",
            value: "PARCELA_5",
          },
          {
            label: "Parcela 6",
            value: "PARCELA_6",
          },
        ],
        states: [],
        cities: [],
      },
    };
  },
  props: {
    currentState: {
      type: String,
      required: true,
    },
  },
  components: {
    DatePicker,
    TheMask,
    Money,
    Decimal,
  },
  directives: {
    mask,
  },
  computed: {
    // calcula o total do pagamento
    calculateTotalValue() {
      const self = this;

      let total = 0;

      const base = self.paymentInfo.baseValue != undefined ? new Decimal(self.paymentInfo.baseValue) : 0;
      const discount = self.paymentInfo.discountValue != undefined ? new Decimal(self.paymentInfo.discountValue) : 0;

      if (self.paymentInfo.discountValue != 0 && self.paymentInfo.discountValue != undefined) {
        total = new Decimal(base.minus(discount));
      } else {
        total = new Decimal(base);
      }
      // console.log("total", total.toNumber());
      // console.log("dec total", new Decimal(total).toNumber());
      return total.toNumber();
    },
    // checagem se a form foi preenchida corretamente
    checkFormValidate() {
      return this.$v.validateForm.$invalid;
    },
    isBarCodePayment() {
      return this.currentState != undefined && this.currentState != "sp" && this.currentState != "rj" && this.currentState != "mg" ? true : false;
    },
  },
  watch: {
    calculateTotalValue(val) {
      this.paymentInfo.value = val;
    },
    // avalia se o usuário preencheu todos os campos
    checkFormValidate(val) {
      // console.log("validate", val);
      if (!val) {
        this.$nuxt.$emit("paymentFormComplete", {
          toggle: true,
          payment: this.paymentInfo,
        });
      } else {
        this.$nuxt.$emit("paymentFormComplete", {
          toggle: false,
          payment: {},
        });
      }
    },
  },
  created() {
    const self = this;

    self.$nuxt.$emit("hidePayment");

    self.$axios
      .get(`${process.env.API_CEP}/ZipCode/country/1/states`)
      .then((response) => {
        self.content.states = response.data;
        self.content.states.map((state) => {
          state.uf = state.uf.trim();
          // console.log(state);

          if (state.uf.toLowerCase() == self.currentState) {
            // console.log("igual", state.uf, self.currentState, state.id);

            self.$axios
              .get(`${process.env.API_CEP}/ZipCode/state/${state.stateID}/cities`)
              .then((response) => {
                // console.log(response.data);
                self.content.cities = response.data;
                self.$nuxt.$emit("showPayment");
                self.paymentInfo.state = self.currentState;
                self.controls.loading = false;
                self.paymentInfo.dueDate = new Date();
                self.paymentInfo.paymentDate = new Date();
              }).catch(err => console.log("Err:", err));
          }
        });
      }).catch(err => console.log("Err:", err));
  },
  validations() {
    const self = this;
    if (!self.isBarCodePayment) {
      return {
        paymentInfo: {
          taxPayer: {
            required,
          },
          federalId: {
            required,
            federalIdLength,
          },
          paymentDate: {
            required,
            date,
          },
          dueDate: {
            required,
            date,
          },
          year: {
            required,
            yearLength,
          },
          renavam: {
            required,
            renavamLength,
          },
          state: {
            required,
          },
          cityCode: {
            required,
          },
          plate: {
            required,
            plateLength,
          },
          baseValue: {
            required,
            minBaseValue,
          },
          paymentOption: {
            required,
          },
          value: {
            minValue,
          },
          discountValue: {
            validateDiscount(value) {
              if (self.paymentInfo.paymentOption === "PARCELA_UNICA_COM_DESCONTO" && value > 0) {
                return true;
              } if (self.paymentInfo.paymentOption !== "PARCELA_UNICA_COM_DESCONTO") {
                return true;
              }
              return false;
            },
          },
        },
        validateForm: [
          "paymentInfo.federalId",
          "paymentInfo.paymentDate",
          "paymentInfo.dueDate",
          "paymentInfo.year",
          "paymentInfo.renavam",
          "paymentInfo.state",
          "paymentInfo.cityCode",
          "paymentInfo.plate",
          "paymentInfo.baseValue",
          "paymentInfo.paymentOption",
          "paymentInfo.value",
          "paymentInfo.taxPayer",
          "paymentInfo.discountValue",
        ],
      };
    }
    return {
      paymentInfo: {
        paymentDate: {
          required,
          date,
        },
        dueDate: {
          required,
          date,
        },
        value: {
          minValue,
          required,
        },
        barCode: {
          required,
          barCode,
        },
        federalId: {
          required,
          federalIdLength,
        },
        taxPayer: {
          required,
        },
      },
      validateForm: ["paymentInfo.paymentDate", "paymentInfo.dueDate", "paymentInfo.value", "paymentInfo.barCode", "paymentInfo.federalId", "paymentInfo.taxPayer"],
    };
  },
  methods: {
    disableWeekends(date) {
      // eslint-disable-next-line no-underscore-dangle
      const _date = new Date(date);
      // eslint-disable-next-line no-underscore-dangle
      // const _dateString = _date.toLocaleString().slice(0, 10);
      const weekDay = _date.getDay();

      /* const holidays = [
        "2017-02-27",
        "2017-02-28",
        "2017-04-14",
        "2017-04-21",
        "2017-06-15",
        "2017-09-07",
        "2017-10-12",
        "2017-11-02",
        "2017-11-15",
        "2017-12-25",
        "2017-05-01",
        "2018-01-01",
        "2018-02-12",
        "2018-02-13",
        "2018-03-30",
        "2018-04-21",
        "2018-05-01",
        "2018-05-31",
        "2018-09-07",
        "2018-10-12",
        "2018-11-02",
        "2018-11-15",
        "2018-12-25",
        "2019-01-01",
        "2019-03-04",
        "2019-03-05",
        "2019-04-19",
        "2019-04-21",
        "2019-05-01",
        "2019-06-20",
        "2019-09-07",
        "2019-10-12",
        "2019-11-02",
        "2019-11-15",
        "2019-12-25",
        "2020-01-01",
        "2021-01-01",
        "2022-01-01",
        "2023-01-01",
        "2024-01-01",
        "2025-01-01",
        "2020-12-25",
        "2021-12-25",
        "2022-12-25",
        "2023-12-25",
        "2024-12-25",
        "2025-12-25",
        "2020-05-01",
        "2021-05-01",
        "2025-05-01",
        "2024-05-01",
        "2023-05-01",
        "2022-05-01",
        "2020-09-07",
        "2021-09-07",
        "2022-09-07",
        "2023-09-07",
        "2024-09-07",
        "2025-09-07",
        "2020-10-12",
        "2021-10-12",
        "2022-10-12",
        "2023-10-12",
        "2024-10-12",
        "2025-10-12",
        "2020-11-02",
        "2021-11-02",
        "2023-11-02",
        "2024-11-02",
        "2025-11-02",
        "2020-11-15",
        "2021-11-15",
        "2022-11-15",
        "2023-11-15",
        "2024-11-15",
        "2025-11-15",
        "2020-04-21",
        "2021-04-21",
        "2022-04-21",
        "2023-04-21",
        "2024-04-21",
        "2025-04-21",
        "2020-04-10",
        "2020-02-24",
        "2020-06-11",
        "2021-02-15",
        "2021-02-16",
        "2021-04-02",
        "2021-06-03",
        "2022-02-28",
        "2022-03-01",
        "2022-04-15",
        "2022-06-16",
        "2022-11-02",
        "2023-02-20",
        "2023-02-21",
        "2023-04-07",
        "2024-02-12",
        "2024-02-13",
        "2024-03-29",
        "2024-05-30",
        "2023-06-08",
        "2025-06-19",
        "2025-03-03",
        "2025-03-04",
        "2025-04-18",
      ];

      const isHoliday = holidays.filter((h) => {
        console.log(h);
        return h == _dateString;
      });

      console.log("holiday", isHoliday);

      if (isHoliday) {
        return isHoliday;
      } */
      return weekDay === 0 || weekDay === 6;

      // const isHoliday = holidays.filter((h) => {
      //   const hDate = new Date(h);
      //   console.log("hDate", hDate);
      //   return hDate == _date;
      // });
    },
  },
};
</script>
