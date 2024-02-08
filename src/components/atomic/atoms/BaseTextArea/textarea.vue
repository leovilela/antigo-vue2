<template>
  <textarea :value="value" @input="$emit('input', $event.target.value)" rows="10" cols="50"></textarea>
</template>

<script>
export default {
  props: {
    value: {
      default: "",
      type: String,
    },
  },
};
</script>

<style>
</style>
