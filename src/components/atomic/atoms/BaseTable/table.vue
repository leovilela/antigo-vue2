<template>
  <vue-good-table
    :columns="tableColumns"
    :rows="rows"
    styleClass="vgt-table striped"
    :pagination-options="{
      enabled: true,
      mode: 'pages',
      perPage: perPage,
      position: 'bottom',
      perPageDropdown: perPageDropdown,
      dropdownAllowAll: false,
      setCurrentPage: currentPage,
      nextLabel: 'próxima',
      prevLabel: 'anterior',
      rowsPerPageLabel: 'Clientes por página',
      ofLabel: 'de',
      pageLabel: 'página',
      allLabel: 'Tudo',
    }"
    :totalRows="totalRows"
    @on-page-change="onPageChange"
    @on-per-page-change="onPerPageChange"
  >
    <template slot="table-row" slot-scope="props" v-if="editTableRows" >
        <slot v-bind:props="props" />
    </template>
    <div slot="emptystate" class="information">
      Nenhum resultado encontrado.
    </div>
  </vue-good-table>
</template>

<script>
import "vue-good-table/dist/vue-good-table.css";
import { VueGoodTable } from "vue-good-table";

export default {
  components: {
    VueGoodTable,
  },
  props: {
    utd: {
      type: Number,
      default: 0,
    },
    rows: {
      type: Array,
      required: true,
    },
    totalPages: {
      type: Number,
      default: 1,
    },
    actions: {
      type: Boolean,
      default: false,
    },
    editTableRows: {
      type: Boolean,
      default: false,
    },
    columns: {
      type: Array,
      required: true,
    },
    perPage: {
      type: Number,
      default: 10,
    },
    perPageDropdown: {
      type: Array,
      default: () => [10],
    },
  },
  data() {
    return {
      currentPage: 1,
    };
  },
  methods: {
    onPageChange({ currentPage }) {
      this.currentPage = currentPage;
      this.$emit("onPageChange", currentPage);
    },
    onPerPageChange({ currentPerPage }) {
      this.$emit("onPerPageChange", currentPerPage);
    },
  },
  computed: {
    tableColumns() {
      if (this.actions) {
        return [...this.columns, {
          label: "Ações",
          field: "actions",
        }];
      }
      return this.columns;
    },
    totalRows() {
      return Math.ceil(this.perPage * this.totalPages);
    },
  },
};
</script>

<style lang="less">
@import "~assets/vars.less";
table.vgt-table {
  font-size: @ftSizeSmall;
  font-family: @mainFontRegular;
  color: @color1;
  border: none;
}

table.vgt-table thead th {
  background: @color2;
  cursor: pointer;
}

table.vgt-table thead th.sorting-asc, table.vgt-table thead th.sorting-desc {
  color: @color1;
}

table.vgt-table th.sorting:after {
  border-bottom: 6px solid @color1;
}

table.vgt-table thead th.sorting-desc:after {
  border-top: 6px solid @color1;
}

table.vgt-table th.sorting:hover:after {
  border-bottom-color: @color1;
}

table.vgt-table tr:hover {
  background: @color14;
}
.vgt-right-align {
  width: 130px;
  text-align: left;
}

table.vgt-table td {
  border-bottom: none;
}
.information {
  text-align: center;
}
.footer__navigation__page-info {
  padding: 0 !important;
  line-height: 0 !important;
  border: 0 !important;
  font-family: 'newjunebook' !important;
  font-size: 16px !important;
  font-weight: bold !important;
  color: #909399 !important;
  display: inline-block !important;
  margin: 0 10px !important;
  height: 30px !important;
  background: linear-gradient(#f4f5f8,#f1f3f6) !important;
}
.footer__navigation__page-info__current-entry {
  padding: 0 0 0 0 !important;
  line-height: 0 !important;
  border: 0 !important;
  font-family: 'newjunebook' !important;
  font-size: 16px !important;
  color: #909399 !important;
  width: 20px !important;
  display: inline-block !important;
  margin: 0 0 0 3px !important;
  height: 30px !important;
  background: linear-gradient(#f4f5f8,#f1f3f6) !important;
}
.vgt-wrap__footer .footer__navigation {
  font-size: 16px;
}
.footer__row-count__label {
  font-size: 16px !important;
}
.vgt-wrap__footer .footer__row-count__select {
  border: 1px solid #ccc !important;
  padding: 3px;
}
</style>
