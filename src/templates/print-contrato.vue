<template>
<div></div>
</template>

<script>
import Printd from "printd";

export default {
  mounted() {
    this.printElement();
  },
  props: {
    printObject: {
      type: String,
      required: true,
    },
  },
  methods: {
    printElement() {
      const self = this;
      setTimeout(() => { self.imprimir(); }, 1000);
    },
    imprimir() {
      const p = new Printd();
      const css = `
       #page-contrato {
        font-family: arial;
        padding: 0 32px;
      }
      #page-contrato #contrato-texto {
        text-align: justify;
      }
      #page-contrato #contrato-texto h1, #page-contrato #contrato-texto p, #page-contrato #contrato-texto ol, #page-contrato #contrato-texto ul {
        margin: 8px 0;
      }
      #page-contrato #contrato-texto h1 li, #page-contrato #contrato-texto p li, #page-contrato #contrato-texto ol li, #page-contrato #contrato-texto ul li {
        margin-bottom: 8px;
      }
      #page-contrato #contrato-texto h1 li.li-remove-listing, #page-contrato #contrato-texto p li.li-remove-listing, #page-contrato #contrato-texto ol li.li-remove-listing, #page-contrato #contrato-texto ul li.li-remove-listing {
        list-style: none;
      }
      #page-contrato #contrato-texto h1 {
        margin-bottom: 16px;
      }
      #page-contrato #contrato-texto .ol-title {
        font-size: 16px;
        font-weight: bold;
        margin-top: 24px;
      }
      #page-contrato #contrato-texto ol {
        counter-reset: item;
        padding-left: 16px;
      }
      #page-contrato #contrato-texto ol > li {
        counter-increment: item;
      }
      #page-contrato #contrato-texto ol ol:not(.ol-lower-latin) > li {
        display: block;
      }
      #page-contrato #contrato-texto ol ol:not(.ol-lower-latin) > li:before {
        content: counters(item,".") ". ";
      }
      #page-contrato #contrato-texto ol.ol-lower-latin {
        list-style-type: lower-latin;
        padding-left: 16px;
      }
      #page-contrato #contrato-texto ol.ol-lower-latin.nested {
        padding-left: 32px;
      }
      #page-contrato #contrato-texto ol.ol-lower-latin.child-list {
        counter-increment: auto;
      }
      #page-contrato #contrato-texto ol.ol-lower-latin.child-list li {
        display: block;
      }
      #page-contrato #contrato-texto ol.ol-lower-latin.child-list li:before {
        content: counter(item,upper-roman) ". ";
      }
      #page-contrato #contrato-texto ol.ol-clear-nesting {
        padding-left: 0;
      }
      #page-contrato #contrato-texto ol.ol-remove-listing {
        list-style-type: none;
        padding-left: 0;
      }
      #page-contrato #contrato-texto ol.ol-remove-listing ol, #page-contrato #contrato-texto ol.ol-remove-listing ul, #page-contrato #contrato-texto ol.ol-remove-listing li {
        list-style-type: none;
        counter-increment: none;
      }
      #page-contrato #contrato-texto ol.ol-remove-listing li:before {
        content: '' !important;
      }
      #page-contrato #contrato-texto ul.ul-signatures li {
        display: inline-block;
        margin: 0 8px;
      }


      `;

      const element = this.$refs.contract;
      p.print(element, css);
      this.$nuxt.$emit("destroyElementPrint", false);
    },
  },
};
</script>

<style lang="less" scoped>
@import "~assets/vars.less";
@import "~assets/variables.less";


</style>
