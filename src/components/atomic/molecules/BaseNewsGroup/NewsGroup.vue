<template>
  <div class="base-news-group">
    <div class="base-news-group__header">
        <h2 class="base-news-group__header-title">{{title}}</h2>
    </div>
    <ul class="base-news-group__list">
        <li class="base-news-group__list-item" v-for="(news, index) in news" :key="index">
          <Base-News :date="news.date" :title="news.title" :content="news.content" :urlNews="news.url"/>
        </li>
    </ul>
  </div>
</template>

<script>

export default {
  props: {
      title: {
          type: String,
          required: true,
      },
      news: {
          type: Array,
          default: [],
          required: true,
      },
  }
};
</script>

<style scoped lang="less">
@import "./style.less";
</style>
