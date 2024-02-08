<template>
  <div class="base-news">
    <span class="base-news__date">{{date}}</span>
    <h2 class="base-news__title">{{title}}</h2>
    <p class="base-news__content base-news__content-short" v-if="!readMoreIsActive">
      {{content.slice(0,100)}}
      <a
        class="base-news__readmore"
        title="Leia mais"
        v-if="!readMoreIsActive"
        @click.prevent="activateReadMore"
      >Saiba mais.</a>
    </p>
    <p class="base-news__content base-news__content-full" v-if="readMoreIsActive">{{content}}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      readMoreIsActive: false
    };
  },
  props: {
    date: {
      type: String,
      default: ""
    },
    title: {
      type: String,
      default: ""
    },
    content: {
      type: String,
      default: ""
    }
  },
  methods: {
    activateReadMore() {
      this.readMoreIsActive = true;
    }
  }
};
</script>

<style lang="less" scoped>
@import "style.less";
</style>
