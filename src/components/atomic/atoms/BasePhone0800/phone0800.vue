<template>
    <p class="base-phone0800">{{phoneNumber}}</p>
</template>
<script>
  export default {
    props: {
      phoneNumber: {
        type: String,
        default: "",
      },
    },
  };
</script>
<style lang="less" scoped>
  @import "phone0800.less";
</style>
