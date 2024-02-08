<template>
  <div class="loading" v-if="isLoading" />
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState(["isLoading"]),
  },
};
</script>

<style scoped>
.loading {
  position: absolute;
  z-index: 9999;
  height: 100%;
  width: 100%;
  top:0;
  left: 0;
  background: url("~assets/img/loading.gif") center no-repeat  rgba(0, 0, 0, 0.5) ;
}
</style>
