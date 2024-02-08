<template>
  <div id="impressao-simulacao" style="border: 1px solid red; position: relative">
      <div>
        <div class="header" style="background: #343a40"><img src="~assets/img/logo-listo.jpg" width="151" height="22"></div>
        <div>
          <table width="100%">
            <tr>
              <td>Valor a simular:</td>
              <td>{{showNumberAsCurrency(valor)}}</td>
            </tr>
             <tr>
              <td>Tipo de transação:</td>
              <td>{{transacao }}</td>
            </tr>
            <tr class="installment-row">
              <td>Parcela: </td>
              <td>{{parcela}}x de {{showNumberAsCurrency(valorParcela)}}</td>
            </tr>
            <tr class="total-row">
              <td>Total: </td>
              <td>{{showNumberAsCurrency(totalParcelas)}}</td>
            </tr>
          </table>
        </div>
        <div>
          <p style="text-align: center; font-family: Arial, sans-serif">Simulação realizada em <strong>{{nomeFantasia}}</strong></p>
          <p style="text-align: center; font-family: Arial, sans-serif">Telefone: <strong>{{telefone}}</strong></p>
        </div>
      </div>
    </div>
</template>

<script>
import Printd from "printd";

export default {
  data() {
    return {
      text: {
        parcela_unica: "Parcela única",
        valor_a_simular: "Valor a simular",
        placeholder_digite_valor_a_simular: "Digite o valor a simular",
        tipos_de_transacao: "Tipos de transação",
        custo_cliente: "Custo cliente",
        custo_lojista: "Custo lojista",
        cartao_de_debito: "Cartão de débito",
        cartao_de_credito: "Cartão de crédito",
        cartao_de_debito_custo_lojista: "Cartão de débito",
        cartao_de_credito_custo_lojista: "Cartão de crédito",
        simulacao_de_pagamento: "Simulação de Pagamento",
        parcelas: "Parcelas",
        transacao: "Transação",
        opcao_de_parcelamento: "Opção de parcelamento",
        titulo_valor_da_parcela: "Valor da Parcela",
        imprimir: "Imprimir",
        nova_simulacao: "Nova Simulação",
        fazer_transacao: "Fazer Transação",
        simular: "Simular",
        opcao: "Opção",
        total: "Total",
        parcela: "Parcela",
        icone_imprimir: "Imprimir",
        agora_pode_enviar:
          "Agora você já pode enviar a simulação para seu cliente de forma rápida.",
        agora_pode_enviar_subtitulo:
          "Officia aliquip consectetur consequat minim. Dolore commodo proident non dolore velit labore. Amet ipsum anim dolor velit sint dolore excepteur exercitation magna do deserunt dolor consectetur. Aliqua duis laboris id cillum cillum officia cupidatat ut officia laboris tempor nulla. Pariatur veniam nulla amet duis cupidatat.",
        enviar_simulacao: "Enviar simulação",
        placeholder_digite_email: "Digite o e-mail",
        email_obrigatorio: "E-mail é obrigatório.",
        botao_enviar: "Enviar",
        botao_imprimir: "Imprimir",
        botao_nova_transacao: "Nova Transação",
        valor_liberado: "Valor liberado",
        valor_transacao: "Valor transação",
        valor_parcela: "Valor parcela",
        valor_total: "Total",
        valor_total_liberado: "Total liberado",
      },
      parcela: 0,
      coeficiente: 1,
      valor: 0,
      parcelas: null,
      valorParcela: 0,
      totalParcelas: 0,
      dados: 0,
      tipoTransacaoLabel: [],
      transacao: "",
      tipoTransacao: null,
      nomeFantasia: null,
      telefone: null,
      toggleParcela: true,
      parcelaSelecionada: 1,
    };
  },
  mounted() {
    this.printElement();
  },
  props: {
    printObject: {
      type: Object,
      required: true,
    },
  },
  methods: {
    showNumberAsCurrency(number) {
      if (number) {
        const numero = number.toFixed(2).split(".");
        numero[0] = `R$ ${numero[0].split(/(?=(?:...)*$)/).join(".")}`;
        return numero.join(",");
      }
    },
    ftoggleParcela() {
      this.toggleParcela = !this.toggleParcela;
    },
    printElement() {
      const self = this;
      this.valor = this.printObject.valorSimulado;
      this.parcelaSelecionada = this.printObject.dadosParcela[0].parcelaSelecionada === null ? 1 : this.printObject.dadosParcela[0].parcelaSelecionada;
      this.parcelas = this.printObject.parcelas;
      this.coeficiente = this.printObject.dadosParcela[0].coeficiente === null ? 1 : this.printObject.dadosParcela[0].coeficiente;
      this.coeficienteTotal = this.printObject.dadosParcela[0].coeficiente === null ? 1 : this.printObject.dadosParcela[0].coeficiente;
      this.parcela = this.printObject.dadosParcela[0].parcela === null ? 1 : this.printObject.dadosParcela[0].parcela;
      this.dados = this.printObject;
      this.tipoTransacao = this.printObject.tipoTransacao;
      this.nomeFantasia = this.printObject.nomeFantasia;
      this.telefone = this.printObject.telefone;

      if (this.tipoTransacao === 2 || this.tipoTransacao === 8) {
        this.valorParcela = this.valor / this.parcela;
        this.totalParcelas = this.valor;
      } else {
        this.valorParcela = this.valor * this.coeficiente;
        this.totalParcelas = this.valor * this.printObject.dadosParcela[0].coeficienteTotal;
      }

      this.tipoTransacaoLabel[1] = "Cartão de débito";
      this.tipoTransacaoLabel[4] = "Cartão de crédito";
      this.tipoTransacaoLabel[8] = "Cartão de débito";
      this.tipoTransacaoLabel[2] = "Cartão de crédito";

      this.transacao = this.tipoTransacaoLabel[this.tipoTransacao];
      self.imprimir();
    },
    imprimir() {
      const p = new Printd();
      const css = `
      * {
        -webkit-print-color-adjust: exact !important;
        color-adjust: exact !important;
      }
      #impressao{
        display:inline;
        };
        .total-row {
          display: none;
        }
      #impressao div.header{
        /* background: #343a40; width: 100%; display:block*/
        }
      #impressao table tr td{
        font-family: arial;
        background: #e4e4e4;
      }

      #impressao .tabelavalores {
        width: 100%;
      }
      #impressao .tabelavalores thead th {
        text-align: center;
      }
      #impressao .tabelavalores thead th:first-child {
        padding-left: 10px;
        text-align: left;
      }
      #impressao .tabelavalores thead th:last-child {
        text-align: right;
      }
      #impressao .tabelavalores tbody tr .valorTotalParcela {
        text-align: center;
      }
      #impressao .tabelavalores tbody tr .optionValorParcela {
        padding-left: 8px;
        font-family: arial;
        font-size: 12px;
        position: relative;
      }
      #impressao .tabelavalores tbody tr .valorParcela {
        font-family: arial;
        font-size: 12px;
        text-align: right;
      }
      #impressao .tabelavalores tbody tr td {
        text-align: center;
      }
      #impressao .tabelavalores tbody tr td:first-child {
        text-align: left;
      }
      #impressao .tabelavalores tbody tr td:last-child {
        padding-right: 10px;
        text-align: right;
      }
      #impressao .tabelavalores tbody tr:nth-child(odd) {
        background-color: #cfd2d3 ;
      }
      #impressao .tabelavalores tbody tr:last-child:nth-child(even) {
        border-bottom: 1px solid #f0f0f0;
      }

        `;
      const element = document.getElementById("impressao-simulacao");
      this.$nextTick(() => {
        p.print(element, [css]);
        this.$nuxt.$emit("destroyElementPrint", false);
      });
    },
  },
};
</script>

<style lang="less" scoped>
@import "~assets/vars.less";
@import "~assets/variables.less";

#impressao{
  .tabelavalores {
    width: 100%;
    thead {
      th {
        text-align: center;

        &:first-child {
          padding-left: 10px;
          text-align: left;
        }

        &:last-child {
          text-align: right;
          // padding-right: 10px;
        }
      }
    }
    .total-row {
      display: none;
    }
    tbody {
      tr {
        .valorTotalParcela {
          text-align: center;
        }
        .optionValorParcela {
          padding-left: 8px;
          font-family: @mainFontLight;
          font-size: @ftSizeSmall;
          position: relative;
        }
        .valorParcela {
          font-family: @mainFontLight;
          font-size: @ftSizeSmall;
          text-align: right;
        }

        td {
          text-align: center;
          &:first-child {
            // padding-left: 10px;
            text-align: left;
          }

          &:last-child {
            padding-right: 10px;
            text-align: right;
          }
        }

        &:nth-child(odd) {
          background-color: @color20;
        }

        &:last-child:nth-child(even) {
          border-bottom: 1px solid @color14;
        }
      }
    }
  }
}


</style>
