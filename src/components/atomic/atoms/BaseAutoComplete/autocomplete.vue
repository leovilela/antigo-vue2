<template>
<form autocomplete="off" >
  <div class="autocomplete" style="width: auto;">
    <label for="">{{label}}</label>
    <Base-Input type="text" v-on="listeners" v-bind="$attrs" :value="searchTerm"  @input="findItem($event)" />
    <slot />
  </div>
  <div class="autocomplete-items" v-if="showItems">
    <div class="autocomplete-item" v-for="(item, index) in autoCompleteItems" :key="index" @click="selectItem(item)">
      <strong>{{item.boldText}}</strong>{{item.itemText}}
    </div>
  </div>
</form>
</template>

<script>
import FormMixing from "../../mixins/form";

export default {
  mixins: [FormMixing],
  props: {
    list: {
      required: true,
      type: Array,
    },
    label: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      searchTerm: "",
      showItems: false,
    };
  },
  computed: {
    autoCompleteItems() {
      return this.list.filter(item => item.value.toLowerCase().includes(this.searchTerm.toLowerCase())).map(item => ({
        itemText: item.value.substring(this.searchTerm.length),
        boldText: item.value.substring(0, this.searchTerm.length),
        item,
      }));
    },
  },
  mounted() {
    this.searchTerm = this.value.value ? this.value.value : this.value;
  },
  updated() {
    this.searchTerm = this.value.value ? this.value.value : this.value;
  },
  methods: {
    selectItem(listItem) {
      this.searchTerm = listItem.item.value;
      this.showItems = false;
      this.$emit("selectedItem", listItem.item);
    },
    findItem(event) {
      this.$emit("input", event);
      this.showItems = true;
      const value = event;
      this.searchTerm = event;
      const item = this.list.find(item => item.value === value);
      if (!item) {
        return;
      }
      this.showItems = false;
      this.$emit("selectedItem", item);
    },
  },
};
</script>

<style scoped>
* { box-sizing: border-box; }
body {
  font: 16px Arial;
}
.autocomplete {
  /*the container must be positioned relative:*/
  position: relative;
}
input {
  border: 1px solid transparent;
  padding: 10px;
  font-size: 16px;
}
input[type=text] {
  width: 100%;
}
.autocomplete-items {
  position: absolute;
  border: 1px solid #d4d4d4;
  border-bottom: none;
  border-top: none;
  z-index: 99;
  width: auto;
  margin: 7px;
  /*position the autocomplete items to be the same width as the container:*/
  top: 75%;
  left: 0%;
  right: 0;
}
.autocomplete-items div {
  padding: 10px;
  cursor: pointer;
  background-color: #fff;
  border-bottom: 1px solid #d4d4d4;
}
.autocomplete-items div:hover {
  /*when hovering an item:*/
  background-color: #e9e9e9;
}
.autocomplete-active {
  /*when navigating through the items using the arrow keys:*/
  background-color: DodgerBlue !important;
  color: #ffffff;
}


</style>
