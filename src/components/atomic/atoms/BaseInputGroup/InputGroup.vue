<template>
<div class="input-group">
  <Base-Input  v-on="listeners" v-bind="$attrs" :value="value" @keyup.enter.prevent="$emit('btnClick')"/>
  <span class="input-group-btn">
    <button class="btn btn-default" type="button" @click="$emit('btnClick')" :disabled="isButtonDisabled"><slot /></button>
  </span>
</div>
</template>
<script>
import FormMixin from "../../mixins/form";

export default {
  mixins: [FormMixin],
  props: {
    isButtonDisabled: Boolean,
  },
};
</script>

<style lang="less">
  .input-group-btn {
    bottom: 5px;
  }
</style>
