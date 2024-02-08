<template>
  <div id="formExtrato">
    <form
      id="formSelectDate"
      class="container-fluid"
      :class="{ 'form-no-edit': controls.searching }"
      @submit.prevent
    >
      <div class="row">
        <div
          class="col-xs-6 col-lg-3 form-input form-input-date"
          :class="{ 'form-invalid': $v.form.startDate.$invalid }"
        >
          <label for="startDate">{{
            content.text.formExtrato_data_inicial
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
          class="col-xs-6 col-lg-3 form-input form-input-date"
          :class="{ 'form-invalid': $v.form.endDate.$invalid }"
        >
          <label for="endDate">{{ content.text.formExtrato_data_final }}</label>
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
        <div class="col-xs-6 form-button pull-right">
          <button
            id="btnBuscar"
            @click="
              showTable(true, 1);
              resetPagination();
            "
            :disabled="$v.form.$invalid"
          >
            {{ content.text.formExtrato_buscar }}
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { required, minValue } from "vuelidate/lib/validators";
import { mask } from "vue-the-mask";
import report from "../utils/endpoints/report";
import DateMixin from '~/components/atomic/mixins/date.mixin'
import dayjs from 'dayjs';

const date = value =>
  value != null ? value.toISOString().split("T")[0].length == 10 : false;

export default {
  mixins: [DateMixin],
  methods: {
    // exibe valores numéricos no formato de moeda
    showNumberAsCurrency(number) {
      return number.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
      });
    },
    submit() {
      const self = this;
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

      // ativa o controle de loading para exibir o GIF de carregamento
      self.controls.searching = true;

      // seta as horas da data final de busca para 23:59:59:999

      // zera o conteúdo da liquidação e do consolidado
      self.content.liquidacoes = [];

      // fecha a tabela
      self.$nuxt.$emit("showResultsTable", {
        toggle: false,
        content: ""
      });

      // emite evento de busca
      // exibe o alerta de "buscando..."
      self.$nuxt.$emit("searching", {
        searching: true
      });

      self.$axios
        .post(`${report.list.transfer}`, {
          // api staging
          getXHeaders: headers,
          start: self.form.startDate,
          end: self.form.endDate,
          pageNumber: currentPage,
          pageSize: 30 // Tamanho padrão de página do relatório de Extrato
        })
        // quando terminar o loading da busca
        .then(response => {
          // console.log("resp", response);

          // emite evento para informar o final da busca
          self.$nuxt.$emit("searching", {
            searching: false
          });

          // se a busca trouxer algum resultado
          if (response.status == 200) {
            // armazena os itens do resultado da busca no array de liquidacoes
            self.content.liquidacoes = response.data;

            // Emite o evento para exibir a tabela de resultados
            self.$nuxt.$emit("showResultsTable", {
              toggle: true,
              content: self.content.liquidacoes
            });

            // Emite o evento para criar a paginação na tabela de resultados
            if (headers) {
              console.log('emit consolidado');
              const pagination = JSON.parse(response.headers["x-pagination"]); // PRECISA DAR PARSE NO JSON RECEBIDO NO HEADER
              // console.log("Total: ", pagination.Count, "\nPages", pagination.Pages);
              self.$nuxt.$emit("createPagination", {
                total: pagination.Count, // a resposta traz o total de itens presentes no período/filtro selecionado, independente da paginação
                pages: pagination.Pages // total de páginas informado pela resposta para o período/filtro selecionado
              });

              const summary = JSON.parse(response.headers["x-summary"]);
              // console.log("summary", summary);

              // Emite o evento de consolidado
              self.$nuxt.$emit("consolidado", {
                title: `${self.content.text.formExtrato_consolidado_saldoEntre} ${dayjs(self.form.startDate).format('DD/MM/YYYY')} ${self.content.text.formExtrato_consolidado_e} ${dayjs(self.form.endDate).format('DD/MM/YYYY')}`,
                tableClass: "extrato", // seta o tipo de tabela do consolidado
                rows: [
                  {
                    title: self.content.text.formExtrato_consolidado_creditado,
                    value: summary.TransferValue,
                    type: "currency"
                  },
                  {
                    title: self.content.text.formExtrato_consolidado_debitado,
                    value: summary.RetentionValue,
                    type: "currency"
                  },
                  {
                    title: self.content.text.formExtrato_consolidado_total,
                    value: summary.TotalValue,
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
            // Se não tiver resultados na busca
            // Emite evento para informar busca vazia e alerta de "Não foram encontrados..."
            self.$nuxt.$emit("emptySearch", {
              emptySearch: true
            });

            if (headers) {
              console.log('emit consolidado');

              // Emite o evento de consolidado
              self.$nuxt.$emit("consolidado", {
                title: `${self.content.text.formExtrato_consolidado_saldoEntre} ${dayjs(self.form.startDate).format('DD/MM/YYYY')} ${self.content.text.formExtrato_consolidado_e} ${dayjs(self.form.endDate).format('DD/MM/YYYY')}`,
                tableClass: "extrato", // seta o tipo de tabela do consolidado
                rows: [
                  {
                    title: self.content.text.formExtrato_consolidado_creditado,
                    value: 0,
                    type: "currency"
                  },
                  {
                    title: self.content.text.formExtrato_consolidado_debitado,
                    value: 0,
                    type: "currency"
                  },
                  {
                    title: self.content.text.formExtrato_consolidado_total,
                    value: 0,
                    type: "currency",
                    class: "total"
                  }
                ]
              });
            }
          }

          self.controls.searching = false; // seta o controle de loading de volta para false para ocultar a gif de carregamento
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
        showTable: false,
        submitStatus: null,
        firstSearch: true,
        validSearch: false,
        searching: false
      },
      content: {
        text: {
          formExtrato_data_inicial: "Data inicial",
          formExtrato_data_final: "Data final",
          formExtrato_buscar: "Ver relatório",
          formExtrato_escolhaPeriodo: "Escolha um período específico",
          formExtrato_consolidado_saldoEm: "Saldo em ",
          formExtrato_consolidado_creditado: "Valor creditado",
          formExtrato_consolidado_debitado: "Valor debitado",
          formExtrato_consolidado_total: "Total",
          formExtrato_consolidado_saldoEntre: "Saldo entre ",
          formExtrato_consolidado_e: " e ",
          formExtrato_firstSearch:
            "Selecione um período para gerar o relatório.",
          formExtrato_emptySearch:
            "Não foram encontrados dados no período selecionado!",
          formExtrato_searching: "Buscando...",
          alerta_dataRecente: "Selecione uma data mais recente",
          alerta_dataVazia: "Selecione uma data"
        },
        saldoAtual: {
          debitado: 0,
          creditado: 0,
          total: 0
        },
        liquidacoes: []
      },
      form: {
        endDate: null,
        startDate: null
      }
    };
  },
  directives: {
    mask
  },
  mounted() {
    const self = this;

    const today = new Date();

    self.form.startDate = dayjs().startOf('month');

    self.form.endDate = dayjs().endOf('month');

    self.controls.searching = true;

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
  validations: {
    form: {
      startDate: {
        required,
      },
      endDate: {
        required,
      }
    },
  }
};
</script>
