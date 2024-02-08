<template>
  <div>
    <label class="select" for="" v-if="label">{{label}}</label>
    <Base-Select :selectgroup="selectgroup" @input="$emit('input', $event.target.value)" />
  </div>
</template>

<script>
export default {
  props: {
    selectgroup: {
      type: [String, Object, Array],
      required: true,
    },
    label: {
      type: String,
      default: null,
    },
  },
};
</script>

<style scoped>
label.select {
  display: block;

}

select {
  min-width: auto;
  padding: 0;

}
</style>
