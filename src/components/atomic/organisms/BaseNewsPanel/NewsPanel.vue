<template>
  <section class="base-news-panel">
    <Base-NewsGroup :title="newsTitle" :news="newsData" />
  </section>
</template>

<script>
export default {
    data(){
        return {
            newsTitle: "",
            newsData: [],
        }
    },
    async mounted() {
      const { data: alerts } = await this.$axios.get(`${window.location.origin}/alerts/alertas_cliente.json`);
      this.newsTitle =  alerts.newsTitle;
      this.newsData = alerts.newsData;
    },
};
</script>

<style lang="less" scoped>
  @import "./style.less";
</style>
