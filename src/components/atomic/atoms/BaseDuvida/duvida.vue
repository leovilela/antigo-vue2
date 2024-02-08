<template>
    <div class="base-duvida">
         <p class="base-duvida__text">{{text}}</p>
    </div>
</template>
<script>
  export default {
    props: {
      text: {
        type: String,
        default: "",
      },
    },
  };
</script>
<style lang="less" scoped>
  @import "duvida.less";
</style>
