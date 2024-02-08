<template>
  <div class="base-nav-tab-page">
    <ul class="base-nav-tab-page__navigation">

      <li
        class="base-nav-tab-page__navigation-item"
        v-for="(component, index) in componentsToShow"
        :key="index"
      >

        <nuxt-link :to="component.name">{{ component.alias }}</nuxt-link>
      </li>
    </ul>
    <div class="base-nav-tab-page__content">
      <nuxt-child />
    </div>
  </div>
</template>
<script>
export default {
  computed: {
    componentsToShow() {
      return this.components.filter(component => {
        return component.show == true;
      });
    }
  },
  props: {
    components: {
      type: Array,
      required: true,
      default: []
    }
  }
};
</script>
<style scoped lang="less">
@import "./style.less";
</style>
