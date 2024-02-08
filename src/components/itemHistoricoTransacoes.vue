<template>
  <div id="itemHistoricoTransacoes">
    <table class="transactionItem">
      <tbody>
        <tr class="value">
          <td>{{ text.itemHistoricoTransacoes_value }}</td>
          <td>{{ transactionObj.value.transaction }}</td>
        </tr>
        <tr class="client">
          <td>{{ text.itemHistoricoTransacoes_client }}</td>
          <td>{{ transactionObj.client.name }}</td>
        </tr>
        <tr class="type">
          <td>{{ text.itemHistoricoTransacoes_type }}</td>
          <td>{{ transactionObj.type }}</td>
        </tr>
        <tr class="detail">
          <td></td>
          <td>
            <button class="transactionDetail" @click="modalControl({api:'historicoTransacoes', modalContent: transactionObj})">{{ text.itemHistoricoTransacoes_detail}}</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      text: {
        itemHistoricoTransacoes_value: "Valor",
        itemHistoricoTransacoes_client: "Nome cliente",
        itemHistoricoTransacoes_type: "Transação",
        itemHistoricoTransacoes_detail: "Ver detalhe",
      },
    };
  },
  props: {
    transactionObj: {
      Type: Object,
      Required: true,
    },
  },
  methods: {
    // abre modal de detalhes da transação
    modalControl(id) {
      // console.log("modal control");
      // console.log(id);
      this.$nuxt.$emit("toggleModal", id);
    },
  },
};
</script>

<style lang="less" scoped>
@import "~assets/vars.less";
@import "~assets/variables.less";

#itemHistoricoTransacoes {
  text-align: center;
  margin-bottom: 10px;

  &:not(:last-child) {
    border-bottom: 1px solid @color14;
  }

  .transactionItem {
    width: 100%;
    margin-bottom: 5px;

    // * {
    //   font-family: @mainFontLight;
    //   font-size: @ftSizeSmall;
    // }

    tbody {
      tr {
        td {
          &:nth-of-type(odd) {
            text-align: left;
          }
          &:nth-of-type(even) {
            text-align: right;
          }
        }

        &.value {
          td {
            &:last-of-type {
              color: @color11;
              // font-family: @mainFont;
            }
          }
        }

        // &.client,
        // &.type {
        //   td {
        //   }
        // }

        // &.type {
        //   td {
        //     &:last-of-type {
        //     }
        //   }
        // }

        &.detail {
          td {
            text-align: right;

            .transactionDetail {
              background: @color2;
              border: 1px solid @color12;
              border-radius: 15px;
              color: @color12;
              padding: 5px 15px;
              margin: 10px 0;
            }
          }
        }
      }
    }
  }
}
</style>
