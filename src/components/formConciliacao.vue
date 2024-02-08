<template>
  <div id="formConciliacao">
    <form
      id="formSelectDate"
      class="container-fluid"
      :class="{ 'form-no-edit': controls.searching }"
      @submit.prevent
    >
      <div class="row">
        <div
          class="form-input form-input-date col-xs-6 col-lg-3"
          :class="{ 'form-invalid': $v.form.startDate.$invalid }"
        >
          <label for="startDate">{{
            content.text.formConciliacao_data_inicial
          }}</label>
          <date-picker
            id="startDate"
            v-model.trim="$v.form.startDate.$model"
            :lang="lang"
            :format="'DD/MM/YYYY'"
            v-mask="'##/##/####'"
            :not-before="new Date('2015-01-01')"
          ></date-picker>
          <div v-if="!$v.form.startDate.minValue && $v.form.startDate.date">
            {{ content.text.alerta_dataRecente }}
          </div>
          <div v-if="!$v.form.startDate.required">
            {{ content.text.alerta_dataVazia }}
          </div>
        </div>
        <div
          class="form-input form-input-date col-xs-6 col-lg-3"
          :class="{ 'form-invalid': $v.form.endDate.$invalid }"
        >
          <label for="endDate">{{
            content.text.formConciliacao_data_final
          }}</label>
          <date-picker
            id="endDate"
            v-model.trim="$v.form.endDate.$model"
            :lang="lang"
            :format="'DD/MM/YYYY'"
            v-mask="'##/##/####'"
            :not-before="form.startDate"
            :not-after="new Date()"
          ></date-picker>
          <div v-if="!$v.form.endDate.minValue && $v.form.endDate.date">
            {{ content.text.alerta_dataRecente }}
          </div>
          <div v-if="!$v.form.endDate.required">
            {{ content.text.alerta_dataVazia }}
          </div>
        </div>
      </div>
      <div class="row">
        <div class="form-button col-xs-6 pull-right">
          <button
            id="btnBuscar"
            @click="
              showTable(true, 1);
              resetPagination();
            "
            :disabled="$v.form.$invalid"
          >
            {{ content.text.formConciliacao_buscar }}
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { required, minValue, requiredIf } from "vuelidate/lib/validators";
import { mask } from "vue-the-mask";
import report from "../utils/endpoints/report";
import dayjs from "dayjs";
import DateMixin from '~/components/atomic/mixins/date.mixin'

const date = value =>
  value != null ? value.toISOString().split("T")[0].length == 10 : false;

export default {
  mixins: [DateMixin],
  methods: {
    submit() {
      const self = this;
      // console.log("enviado!");
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.submitStatus = "ERROR";
      } else {
        // do your submit logic here
        self.submitStatus = "PENDENTE";
        setTimeout(() => {
          self.submitStatus = "OK";
        }, 500);
      }
    },
    // exibição do relatorio
    // a página atual é atualizada na tabela e passada por um emitter
    // na abertura da página o parâmetro na própria chamada é 0, mas não é usada a mesma função
    showTable(headers, currentPage) {
      const self = this;
      self.controls.searching = true;
      self.content.conciliacoes = [];

      self.$nuxt.$emit("showResultsTable", {
        toggle: false,
        content: ""
      });

      self.$nuxt.$emit("searching", {
        searching: true
      });


      self.$axios
        .post(`${report.list.conciliation}`, {
          start: self.form.startDate,
          end: self.form.endDate,
          getXHeaders: headers,
          pageNumber: currentPage,
          pageSize: 30
        })
        .then(response => {
          self.$nuxt.$emit("searching", {
            searching: false
          });

          // Armazena as datas de início e fim para emitir para o consolidado


          if (response.status == 200) {
            self.content.conciliacoes = response.data;

            self.$nuxt.$emit("emptySearch", {
              emptySearch: false
            });

            self.$nuxt.$emit("showResultsTable", {
              toggle: true,
              content: self.content.conciliacoes
            });

            if (headers) {
              // PRECISA DAR JSON PARSE PARA UTILIZAR OS HEADERS
              const pagination = JSON.parse(response.headers["x-pagination"]);
              const summary = JSON.parse(response.headers["x-summary"]);

              self.$nuxt.$emit("createPagination", {
                total: pagination.Count, // a resposta traz o total de itens presentes no período/filtro selecionado, independente da paginação
                pages: pagination.Pages // total de páginas informado pela resposta para o período/filtro selecionado
              });

              self.$nuxt.$emit("consolidado", {
                title: `${self.content.text.consolidado_title_conciliadoEntre} ${dayjs(self.form.startDate).format('DD/MM/YYYY')} ${self.content.text.consolidado_title_e} ${dayjs(self.form.endDate).format('DD/MM/YYYY')}`,
                tableClass: "extrato",
                rows: [
                  {
                    title: self.content.text.consolidado_transacoes,
                    value: pagination.Count
                  },

                  {
                    title: self.content.text.consolidado_saldo,
                    value: summary.TransferValue,
                    type: "currency",
                    class: "total"
                  }
                ]
              });

              // EMITE OS PARÃMETROS PARA O REPORT SERVICE
              self.$nuxt.$emit("loadReportParameters", {
                start: self.form.startDate,
                end: self.form.endDate
              });
            }
          } else if (response.status == 204) {
            self.$nuxt.$emit("emptySearch", {
              emptySearch: true
            });

            self.$nuxt.$emit("consolidado", {
              title: `${self.content.text.consolidado_title_conciliadoEntre} ${dayjs(self.form.startDate).format('DD/MM/YYYY')} ${self.content.text.consolidado_title_e} ${dayjs(self.form.endDate).format('DD/MM/YYYY')}`,
              tableClass: "extrato",
              rows: [
                {
                  title: self.content.text.consolidado_transacoes,
                  value: 0
                },
                // {
                //   title: self.content.text.consolidado_valor,
                //   value: saldoPeriodo.valor,
                //   type: "currency",
                // },
                {
                  title: self.content.text.consolidado_saldo,
                  value: 0,
                  type: "currency",
                  class: "total"
                }
              ]
            });
          }

          self.controls.searching = false;
        })
        .catch(err => console.log("Err:", err));
    },
    // reinicia paginação
    // Usado no clique no botõa de pesquisar para quando fizer uma nova pesquisa, retornar para a primeira página da tabela
    resetPagination() {
      this.$nuxt.$emit("resetPagination"); // esse emitter não precisa de um segundo parâmetro
    }
  },
  data() {
    return {
      controls: {
        submitStatus: null,
        showTable: false,
        firstSearch: true,
        validSearch: false,
        searching: true
      },
      content: {
        text: {
          formConciliacao_data_inicial: "Data inicial",
          formConciliacao_data_final: "Data final",
          formConciliacao_buscar: "Ver relatório",
          formConciliacao_escolhaPeriodo: "Escolha um período específico",
          consolidado_title_conciliadoAtual: "Conciliado em ",
          consolidado_title_conciliadoEntre: "Conciliado entre ",
          consolidado_title_e: " e ",
          consolidado_transacoes: "Transferências",
          consolidado_valor: "Valor total",
          consolidado_saldo: "Saldo total",
          tabela_extrato: "Extrato",
          tabela_transacoes: "Transferências",
          alerta_inicio: "Selecione um período para gerar o relatório",
          alert_vazio: "Não foram encontrados dados para o período selecionado",
          alert_buscando: "Buscando...",
          alerta_dataRecente: "Selecione uma data mais recente",
          alerta_dataVazia: "Selecione uma data"
        },
        conciliacoes: []
      },
      form: {
        startDate: null,
        endDate: null
      }
    };
  },
  directives: {
    mask
  },
  mounted() {
    const self = this;

    self.controls.searching = true;


    self.form.startDate = dayjs().startOf('month').toDate();

    self.form.endDate = dayjs().endOf('month').toDate();

    self.$nuxt.$emit("searching", {
      searching: true
    });

    self.showTable(true, 1);
  },
  created() {
    const self = this;

    // Listener para receber a atualização de página vinda da tabela
    // Chama a função que carrega os dados da API passando a página enviada pelo evento como parâmetro
    self.$nuxt.$on("updatePagination", data => {
      self.showTable(false, data);
    });
  },
  beforeDestroy() {
    this.$nuxt.$off("updatePagination");
  },
  watch: {
    "form.startDate"(value) {
      if (!value) {
        this.form.endDate = null;
        return;
      }
      this.form.endDate = dayjs(value).endOf('month');
    },
  },
  validations() {
    return {
      form: {
        startDate: {
          required,
        },
        endDate: {
          required,
        }
      }
    };
  }
};
</script>
