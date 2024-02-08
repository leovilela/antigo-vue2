<template>
<div>
  <ul class="nav nav-tabs tabs" :class="navClasses">
    <li
      v-for="(tabItem, index) in tabItems"
      :key="index"
      v-show="tabItem.visible"
      class="nav-tabs__item"
      :class="{ 'active': activeTab === index, 'disabled': tabItem.disabled }">
        <a
          class="nav-tabs__link"
          @click="tabClick(index)">
          <span>{{ tabItem.label }}</span>
        </a>
    </li>
  </ul>
  <section class="tab-content" :class="{'is-transitioning': isTransitioning}">
        <slot/>
  </section>
</div>
</template>

<script>

export default {
  name: "BaseTab",
  props: {
    value: Number,
    expanded: Boolean,
    type: String,
    size: String,
    position: String,
    animated: {
      type: Boolean,
      default: true,
    },
    extraClasses: String,
    destroyOnHide: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      activeTab: this.value || 0,
      tabItems: [],
      contentHeight: 0,
      isTransitioning: false,
      isTabs: true, // Used internally by TabItem
    };
  },
  computed: {
    navClasses() {
      return [
        this.type,
        this.size,
        this.position,
        this.extraClasses,
        {
          "nav-justified": this.expanded,
          "nav-tabs__expandable": this.expanded,
          "is-toggle-rounded is-toggle": this.type === "is-toggle-rounded",
        },
      ];
    },
  },
  watch: {

    value(value) {
      this.changeTab(value);
    },

    tabItems() {
      if (this.activeTab < this.tabItems.length) {
        this.tabItems[this.activeTab].isActive = true;
      }
    },
  },
  methods: {
    changeTab(newIndex) {
      if (this.activeTab === newIndex) return;
      if (this.activeTab < this.tabItems.length) {
        this.tabItems[this.activeTab].deactivate(this.activeTab, newIndex);
      }
      this.tabItems[newIndex].activate(this.activeTab, newIndex);
      this.activeTab = newIndex;
      this.$emit("change", newIndex);
    },

    tabClick(value) {
      this.$emit("input", value);
      this.changeTab(value);
    },
  },
  mounted() {
    if (this.activeTab < this.tabItems.length) {
      this.tabItems[this.activeTab].isActive = true;
    }
  },
};
</script>

<style lang="less" scoped>
  @import "style.less";
</style>
