<template>
  <div
    class="base-progress-bar"
    :class="progressBarClass"
    ref="progressbar"
    v-resize:throttle.100="onProgressBarResize"
  >
    <div class="credit-limit__parameter credit-limit__min" v-if="type == 'creditLimit'">
      <span class="credit-limit__parameter-value">{{ this.formatNumberToCurrency(creditLimitMin) }}</span>
    </div>
    <span class="base-progress-bar__progress" :style="barSize" ref="progress"></span>

    <div
      class="credit-limit__parameter credit-limit__limit"
      :style="creditLimitPosition"
      v-if="type == 'creditLimit'"
      ref="limit"
    >
      <span
        class="credit-limit__parameter-label"
      >{{$t("progressBar.creditLimitLabels.availableLimit")}}</span>
      <span class="credit-limit__parameter-value">{{this.formatNumberToCurrency(creditLimit) }}</span>
    </div>

    <div class="credit-limit__parameter credit-limit__max" v-if="type == 'creditLimit'">
      <span
        class="credit-limit__parameter-label"
      >{{$t("progressBar.creditLimitLabels.totalAvailable")}}</span>
      <span class="credit-limit__parameter-value">{{ this.formatNumberToCurrency(creditLimitMax) }}</span>
    </div>
  </div>
</template>
<script>
import resize from "vue-resize-directive";

export default {
  props: {
    progress: {
      type: Number,
      default: 0
    },
    creditLimit: {
      type: Number,
      default: 0
    },
    creditLimitMin: {
      type: Number,
      default: 20000
    },
    creditLimitMax: {
      type: Number,
      default: 20000
    },
    type: {
      type: String,
      default: "default"
    }
  },
  directives: {
    resize
  },
  mounted() {
    if (this.creditLimit) {
      this.$nextTick(() => {
        const progressBarElementWidth = this.$refs.progressbar.clientWidth;
        const limitElementWidth = this.$refs.limit.clientWidth;
        const progressElementWidth = this.$refs.progress.clientWidth;

        this.progressBarElementWidth = progressBarElementWidth;
        this.limitElementWidth = limitElementWidth;
        this.progressElementWidth = progressElementWidth;
      });
    }
  },
  data() {
    return {
      progressBarElementWidth: "",
      limitElementWidth: "",
      progressElementWidth: ""
    };
  },
  computed: {
    barSize() {
      if (!this.creditLimit) {
        return `width: ${this.progress}%;`;
      }

      return `width: ${this.creditLimitInPercentage}%`;
    },
    creditLimitPosition() {
      let creditLimitPosition = 0;
      const progressBarElementWidthInPercentage = this.percentage(
        Math.round(this.progressBarElementWidth),
        Math.round(this.progressBarElementWidth)
      );
      const limitElementWidthInPercentage = this.percentage(
        Math.round(this.limitElementWidth),
        Math.round(this.progressBarElementWidth)
      );

      if (!this.creditLimit) {
        return;
      }
      if (
        this.creditLimitInPercentage > limitElementWidthInPercentage ||
        this.creditLimitInPercentage < progressBarElementWidthInPercentage
      ) {
        creditLimitPosition = `left: ${Math.round(
          this.creditLimitInPercentage - limitElementWidthInPercentage
        )}%;`;
      }
      if (this.creditLimitInPercentage >= progressBarElementWidthInPercentage) {
        creditLimitPosition = `left: ${progressBarElementWidthInPercentage -
          limitElementWidthInPercentage}%;`;
      }
      if (this.creditLimitInPercentage < limitElementWidthInPercentage) {
        creditLimitPosition = "left: 0%;";
      }
      return creditLimitPosition;
    },
    progressBarClass() {
      if (this.type == "creditLimit") {
        return "credit-limit";
      }
    },
    creditLimitInPercentage() {
      if (!this.creditLimit) {
        return false;
      }
      const creditLimit = Math.round(parseInt(this.creditLimit));
      const creditLimitMax = Math.round(parseInt(this.creditLimitMax));
      return this.percentage(creditLimit, creditLimitMax);
    },
    limitValue() {
      return this.creditLimit;
    },
    dynamicWidthOfProgressBarElement() {
      return this.progressBarElementWidth;
    }
  },
  methods: {
    percentage: function(baseValue, total) {
      return (parseInt(baseValue) / parseInt(total)) * 100;
    },
    formatNumberToCurrency: function(number) {
      const numberToTranform = parseInt(number);
      return numberToTranform.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
      });
    },
    onProgressBarResize() {
      if (this.creditLimit) {
        this.progressBarElementWidth = this.$refs.progressbar.clientWidth;
      }
    }
  }
};
</script>
<style lang="less">
@import "./style.less";
</style>