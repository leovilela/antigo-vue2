<template>
  <main class="main-page">
    <Base-Loading />
  <aside />
  <section id="new-password">
    <nuxt />
  </section>
  </main>
</template>

<script>
export default {

};
</script>

<style lang="less" scoped>
  * {
    margin: 0;
    padding: 0;
  }
  .main-page {
    display: flex;
  }
  aside {
    background-color: #000;
    width: 273px;
    height: 100vh;
  }

  #new-password {
    background-color: #F5F5F5;
    width: 100%;
    margin-top: 50px;
  }
</style>
