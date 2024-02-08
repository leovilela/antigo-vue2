<template>
  <div class="modal-salvar-emprestimo">

    <div class="alert alert-danger" style="text-align:center;">
      !!! FUNCIONALIDADE EM IMPLEMENTAÇÃO !!!
    </div>

    <div class="container-fluid">
      <div class="row form-group">
        <div class="col-xs-12">
          <h2>Empréstimo realizado</h2>
          <table>
            <tbody>
              <tr>
                <td>Tipo de Empréstimo</td>
                <td>{{getLoanNameFrom(emprestimo.loanType)}}</td>
              </tr>
              <tr>
                <td>Nome completo</td>
                <td>{{emprestimo.affiliateFullName}}</td>
              </tr>
              <tr>
                <td>CPF ou CNPJ</td>
                <td>{{emprestimo.affiliateDocument}}</td>
              </tr>
              <tr>
                <td>Valor do Empréstimo</td>
                <td>{{showNumberAsCurrency(emprestimo.selectedInstallment.totalLoanValue)}}</td>
              </tr>
              <tr>
                <td>Parcelas</td>
                <td>{{emprestimo.selectedInstallment.installmentModeId}} x de {{showNumberAsCurrency(emprestimo.selectedInstallment.installmentValue)}}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="row">
        <div class="form-button col-xs-12 pull-right">
          <button @click="closeModal">Fechar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {

    };
  },
  props: {
    emprestimo: {
      required: true,
    },
  },
  methods: {
    // exibe valores numéricos no formato de moeda
    showNumberAsCurrency(number) {
      return number.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
    },
    getLoanNameFrom(type) {
      if (type == 0) return "Capital de giro com cartão";
    },
    closeModal() {
      this.$nuxt.$emit("toggleModal", null);
    },
  },
};
</script>

<style lang="less">
@import "~assets/vars.less";
@import "~assets/main.less";
.modal-salvar-emprestimo {
  padding: 32px 0;

  table {
    width: 100%;
    border: 1px solid @color9;
    tr {
      &:nth-child(odd) {
        background-color: @color9;
      }
      td {
        padding: 8px;

        &:first-child {
          font-weight: bold;
          width: 30%;
        }

        &:last-child {
          width: 70%;
        }
      }
    }
  }
}

</style>
