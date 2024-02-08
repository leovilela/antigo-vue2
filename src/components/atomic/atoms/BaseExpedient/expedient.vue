<template>
    <div class="base-expedient">
        <p>{{expedientWeek}}<p>
        <p>{{expedientWeekend}}</p>
    </div>
</template>
<script>
  export default {
    props: {
      expedientWeek: {
        type: String,
        default: "",
      },
      expedientWeekend: {
        type: String,
        default: "",
      },
    },
  };
</script>
<style lang="less" scoped>
  @import "expedient.less";
</style>
