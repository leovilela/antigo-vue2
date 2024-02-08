<template>
  <table class="table table-striped base-installment-table">
    <thead>
      <th colspan="2">&nbsp;</th>
      <th
        class="base-installment-table__title"
        colspan="2"
        v-for="(column, index) in columns"
        :key="index"
      >
        <strong>{{ column.label }}</strong>
      </th>
    </thead>
    <tbody>
      <tr
        v-if="isUniqRow"
        :class="{
          'base-installment-table__line': hasHighlightInstallment,
          'base-installment-table__line--active': ativo == -1
        }"
      >
        <td class="base-installment-table__installment-mode" colspan="2">
          <Base-Radio
            :name="installmentModeName"
            isInline
            :nativeValue="uniqRow"
            @input="onSelectedInstallment"
          >
            Parcela única
          </Base-Radio>
        </td>
        <td
          class="base-installment-table__item"
          colspan="2"
          v-for="(column, index) in columns"
          :key="index"
        >
          {{ uniqRow[column.field] }}
        </td>
      </tr>
      <tr
        v-for="(row, index) in rows"
        :key="index"
        v-else
        :class="{
          'base-installment-table__line': hasHighlightInstallment,
          'base-installment-table__line--active': ativo == index
        }"
      >
        <td colspan="2" class="base-installment-table__installment-mode">
          <Base-Radio
            :name="installmentModeName"
            isInline
            :nativeValue="row"
            @input="onSelectedInstallment"
          >
            {{ row.installmentMode }}x
          </Base-Radio>
        </td>
        <td
          class="base-installment-table__item"
          colspan="2"
          v-for="(column, index) in columns"
          :key="index"
        >
          {{ row[column.field] }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: "LInstallmentTable",
  props: {
    isUniqRow: {
      type: Boolean,
      default: false
    },
    hasHighlightInstallment: {
      type: Boolean,
      default: false
    },
    installmentModePrefix: {
      type: String,
      default: ""
    },
    columns: {
      type: Array,
      required: true
    },
    rows: {
      type: Array,
      required: true
    }
  },
  computed: {
    uniqRow() {
      if (!this.isUniqRow) {
        return {};
      }
      return this.rows[0];
    },
    installmentModeName() {
      const modeName = "installment-mode";
      return this.installmentModePrefix
        ? modeName + `-${this.installmentModePrefix}`
        : modeName;
    }
  },
  data() {
    return {
      ativo: -1
    };
  },
  methods: {
    onSelectedInstallment(installment) {
      this.ativo = installment.meta.parcelaOriginal;
      this.$emit("onSelectedInstallment", installment);
    }
  }
};
</script>

<style lang="less" scoped>
@import "./style.less";
</style>
