<template>
  <section class="page-financiamentos-auto page-financiamentos-auto--simulacao container-fluid" id="condicoes-de-entrada">
    <div class="row">
      <div id="entrada" class="col-xs-12">
        <div class="panel panel-default">
          <div class="panel-heading">
            <span>{{$t('titles.entrada')}}</span>
          </div>
          <div class="panel-body">
            <table>
              <thead>
                <th>
                  <div class="row">
                    <div class="col-xs-3">
                      <div class="label-retorno">{{$t('labels.entrada.retorno')}}</div>
                      <Base-SelectGroup :selectgroup="selectgroup" />
                    </div>
                  </div>
                </th>
                <th class="installment-value">{{$t('labels.entrada.valorParcela')}}</th>
              </thead>
              <tbody>
                <tr>
                  <td class="installments">
                    <Base-RadioGroup id="a-vista" name="entrada" type="radio" class="form__input">
                      <template #label>{{$t('labels.entrada.aVista')}}</template>
                    </Base-RadioGroup>
                  </td>
                  <td class="value">{{$t('labels.entrada.valorParcelaEntradaAVista')}}</td>
                </tr>
                <tr>
                  <td class="installments">
                    <Base-RadioGroup id="6x" name="entrada" type="radio" class="form__input">
                      <template #label>{{$t('labels.entrada.parcela06')}}</template>
                    </Base-RadioGroup>
                  </td>
                  <td class="value">{{$t('labels.entrada.valorParcela06Entrada')}}</td>
                </tr>
                <tr>
                  <td class="installments">
                    <Base-RadioGroup id="12x" name="entrada" type="radio" class="form__input">
                      <template #label>{{$t('labels.entrada.parcela12')}}</template>
                    </Base-RadioGroup>
                  </td>
                  <td class="value">{{$t('labels.entrada.valorParcela12Entrada')}}</td>
                </tr>
              </tbody>
            </table>
            <div class="btn-wrapper col-xs-12">
              <Base-Button>{{$t('buttons.continuar')}}</Base-Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      content: {
        valores: {
          veiculo: 50000,
          entradaMinima: 10000,
          entradaSelecionada: 20000,
          totalFinanciado: 30000,
        },
      },
      selectgroup: {
        id: "entrada",
        options: [
          { value: "0", text: "R0" },
          { value: "2", text: "R2" },
          { value: "4", text: "R4" },
          { value: "6", text: "R6" },
        ],
      },
    };
  },
};
</script>

<style lang="less" scoped>
@import "~assets/vars.less";

#entrada, #financiamento {
  .panel-body {
    padding: 0;

    table {
      width: 100%;

      thead {

        th {
          padding: 8px 10px;

          &.installment-value {
            text-align: right;
            padding-right: 16px;
          }

          .return {
            padding: 0;
            width: 50px;
            background-color: @color9;
            margin-left: 8px;
          }

        }
      }

      tbody {
        tr {
          &:nth-child(odd) {
            background-color: @color9;
          }

          td {
            padding: 0 8px;

            &.installments {
              label {
                width: 100%;
              }
              input {
                margin-right: 16px;
              }
            }

            &.value {
              text-align: right;
              padding-right: 16px;
            }
          }
        }
      }
    }

    .label-retorno {
      margin-right: 10px;
      text-align: right;
      vertical-align: middle;
      display: inline;
    }

    .btn-wrapper {
      button {
        margin: 16px 0;
      }
    }
  }
}
</style>
