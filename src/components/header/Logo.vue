<template>
  <div class="global-header__logo">
    <img id="header-logo" alt="wisely logo" :src="images.logo" height="18" />
  </div>
</template>

<script>
export default {
  name: "Logo",
  data() {
    return {
      images: {
        logo: require("@/assets/images/logo.png")
      }
    };
  }
};
</script>

<style scoped>
#header-logo {
  vertical-align: middle;
}
</style>
