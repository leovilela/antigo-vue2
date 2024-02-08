<template>
<div>
  <div v-if="innerValidatorErrors.length > 0">
    <div class="ok" v-for="(error, indexError) in validatorErrors" :key="indexError">
      <small v-bind:class="{error: error.error}">{{error.message}}</small>   
    </div>
  </div>
</div>
</template>

<script>
export default {
  props: {
    validatorErrors: {
      type: Array,
      required: true,
    },
  },
  computed: {
    innerValidatorErrors() {
      return this.validatorErrors.filter(validate => validate.error);
    },
  },
};
</script>
<style lang="less" scoped>
.ok {
  color: green;
}
.error {
  display: block !important;
  color: red;
}

</style>
