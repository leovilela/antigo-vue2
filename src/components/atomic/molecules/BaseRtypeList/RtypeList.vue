<template>
  <div class="base-rtype-list">
    <button v-for="(rtype, index) in innerRtypeList" :key="index" :class="{ 'base-rtype-list_button__active': rtype.active }" class="base-rtype-list_button" @click="onClick(rtype)" >
      {{rtype.label}}
    </button>
  </div>
</template>

<script>
export default {
  props: {
    rtypeList: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      innerRtypeList: []
    }
  },
  mounted() {
    this.innerRtypeList = this.rtypeList.map(rType => ({...rType, active: rType.active ? rType.active : false}))
  },
  watch: {
    rtypeList(value) {
      this.innerRtypeList = value.map(rType => ({...rType, active: rType.active ? rType.active : false}))
    }
  },
  methods: {
    onClick(value) {
      this.innerRtypeList = this.innerRtypeList.map(rType => {
        rType.active = false
        if(rType === value) {
          rType.active = true
        }
        return rType
      })
      this.$emit('onSelectRtype', value)
    }
  }
}
</script>

<style lang="less" scoped>
  @import "./style.less";
</style>
