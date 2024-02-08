<template>
  <div>
    <label for="" v-if="label">{{label}}</label>
    <Base-Textarea :value="value" @input="$emit('input', $event.target.value)" rows="10" cols="50" />
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: "",
    },
    label: {
      type: String,
      default: "",
    },
  },
};
</script>

<style>
</style>
