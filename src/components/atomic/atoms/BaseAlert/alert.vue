<template>
  <div class="alert" :class="[state]" v-if="!isClosed" role="alert">
     <button type="button" v-if="closable" @click="isClosed = !isClosed" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
    <slot />
  </div>
</template>

<script>
export default {

  props: {
    type: {
      type: String,
      default: "",
      validator: value => ["danger", "info", "success", "warning"].includes(value),
    },
    closable: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isClosed: false,
    };
  },
  computed: {
    state() {
      if (!this.type) {
        return "";
      }
      return `alert-${this.type}`;
    },
  },
};
</script>
