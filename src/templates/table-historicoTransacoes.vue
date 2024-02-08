<template>
  <div id="tableHistoricoTransacoes">
    <!-- <p>{{colunas}}</p> -->
    <!-- <p>{{columnsWidth}}</p> -->
    <table id="table-result">
      <thead>
        <th class="usuario">{{text.usuario}}</th>
        <th v-for="(head, index) in colunas" :key="index" :class="head.id" v-show="head.checked">{{head.label}}</th>
        <th class="detalhes">{{text.detalhes}}</th>
        <th class="recibo">{{text.recibo}}</th>
      </thead>
      <tbody>
        <tr v-for="(tr, index) in transacoes" :key="index">
          <!-- <td>{{tr}}</td> -->
          <td class="usuario">{{tr.username}}</td>
          <td class="codigo" v-show="colunas[colunas.findIndex(i => i.id == 'codigo')].checked == true">{{tr.codigo}}</td>
          <td class="data" v-show="colunas[colunas.findIndex(i => i.id == 'data')].checked == true">{{tr.transactionDate | date}}</td>
          <td class="autorizacao" v-show="colunas[colunas.findIndex(i => i.id == 'autorizacao')].checked == true">{{tr.authorize}}</td>
          <td class="tipo" v-show="colunas[colunas.findIndex(i => i.id == 'tipo')].checked == true">{{tr.transactionType}}</td>
          <td class="status" v-show="colunas[colunas.findIndex(i => i.id == 'status')].checked == true">{{tr.status}}</td>
          <td class="valorLiberado" v-show="colunas[colunas.findIndex(i => i.id == 'valorLiberado')].checked == true">{{showCurrency(tr.releasedvalue)}}</td>
          <td class="valorTransacao" v-show="colunas[colunas.findIndex(i => i.id == 'valorTransacao')].checked == true">{{showCurrency(tr.transactionvalue)}}</td>
          <td class="parcelas" v-show="colunas[colunas.findIndex(i => i.id == 'parcelas')].checked == true">{{tr.installmentMode}}</td>
          <td class="retorno" v-show="colunas[colunas.findIndex(i => i.id == 'retorno')].checked == true">{{tr.rType}}</td>
          <td class="detalhes"><a @click.prevent="modalControl({api: 'historicoTransacoes', modalContent: tr})"><span class="glyphicon glyphicon-file"></span></a></td>
          <td class="recibo" v-if="tr.serviceType !== 'DETRAN - Pagamento de Taxas'"><a @click.prevent="modalControl({api: 'recibo', modalContent: tr})"><span class="glyphicon glyphicon-send"></span></a></td>
          <td class="recibo" v-if="tr.serviceType === 'DETRAN - Pagamento de Taxas'"><a @click.prevent="modalControl({api: 'reciboDetran', modalContent: tr})"><span class="glyphicon glyphicon-send"></span></a></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style lang="less" scoped>
@import "../assets/vars.less";
@import "../assets/variables.less";

#tableHistoricoTransacoes {
  display: block;
  width: 100%;

  #table-result {
    width: 100%;
    thead th,
    tbody tr td {
      padding: 5px 10px;
      text-align: center;

      &:first-child {
        text-align: left;
        border-right: 2px dashed @color24;
      }
    }

    thead {
      border-bottom: 1px solid @color10;
      border-top: 1px solid @color10;
    }

    tbody {
      tr {
        &:nth-child(odd) {
          background-color: @color18;
        }

        // &:hover {
        //   background-color: rgba(225, 225, 225, 0.5);
        // }
        td {
          &.detalhe {
            a {
              &:hover {
                cursor: pointer;
              }
            }
          }
        }
      }
    }
  }

}
</style>

<script>
import dayjs from 'dayjs';
export default {
  data() {
    return {
      text: {
        usuario: "Usuário",
        detalhes: "Detalhes",
        recibo: "Recibo",
      },

    };
  },
  filters: {
    date(value) {
      if (!value) {
        return ''
      }
      return dayjs(value).format('DD/MM/YYYY HH:MM')
    }
  },
  props: ["transacoes", "colunas"],
  methods: {
    // abre modal de envio da transação
    modalControl(id) {
      this.$nuxt.$emit("toggleModal", id);
    },
    // Exibe valor em formato moeda
    showCurrency(val) {
      return `R$ ${val.toFixed(2).replace(".", ",")}`;
    },
    // Exibe data em formato amigável
    showFormattedDate(val) {
      const date = new Date(val);
      const min = date.getMinutes();
      const hour = date.getHours();

      const day = date.getDate() >= 10 ? date.getDate() : `0${date.getDate()}`;
      const month = (date.getMonth() + 1) >= 10 ? (date.getMonth() + 1) : `0${(date.getMonth() + 1)}`;
      const year = date.getFullYear();

      return `${day}/${month}/${year} ${hour}:${min}`;
    },
  },
};
</script>
