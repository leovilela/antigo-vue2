<template>
    <div class="alert" :class="alertType" id="notice" v-html="alertText"></div>
</template>

<script>
export default {
  props: ["alertType", "alertText"],
};
</script>
